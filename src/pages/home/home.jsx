import React, { useState, useEffect, useRef } from "react";
import { Line, Bar } from "react-chartjs-2";
import { formatData } from "../../utils";
import Layout from "../layout";
import 'tailwindcss/tailwind.css'; // Assurez-vous d'importer TailwindCSS

function Home() {
  const [interestRatesData, setInterestRatesData] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [pair, setPair] = useState(""); // Initialize with an empty string
  const [price, setPrice] = useState("0.00");
  const [pastData, setPastData] = useState({});
  const ws = useRef(null);
  const url = "https://api.pro.coinbase.com";

  // Fetch interest rates data once
  useEffect(() => {
    const fetchInterestRatesData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/scrape'); // Update the URL to match your Flask API endpoint
        const data = await response.json();
        setInterestRatesData(data);
      } catch (error) {
        console.error("Error fetching interest rates data:", error);
      }
    };

    fetchInterestRatesData();
  }, []);

  // Setup WebSocket connection
  useEffect(() => {
    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");

    ws.current.onopen = () => {
      console.log("WebSocket Connected");
    };

    ws.current.onclose = () => {
      console.log("WebSocket Disconnected");
    };

    return () => {
      ws.current.close();
    };
  }, []);

  // Fetch initial currency pairs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/products`);
        const data = await response.json();
        const pairs = data.filter(pair => pair.quote_currency === "USD")
                          .sort((a, b) => a.base_currency.localeCompare(b.base_currency));
        setCurrencies(pairs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle currency pair change
  useEffect(() => {
    if (!pair) return;

    // Subscribe to new pair
    const subscribe = {
      type: "subscribe",
      product_ids: [pair],
      channels: ["ticker"]
    };
    ws.current.send(JSON.stringify(subscribe));

    const historicalDataURL = `${url}/products/${pair}/candles?granularity=86400`;
    const fetchHistoricalData = async () => {
      try {
        const response = await fetch(historicalDataURL);
        const data = await response.json();
        const formattedData = formatData(data);
        setPastData(formattedData);
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };

    fetchHistoricalData();

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "ticker" && data.product_id === pair) {
        setPrice(data.price);
      }
    };

    return () => {
      // Unsubscribe from the old pair when the component unmounts or pair changes
      const unsubscribe = {
        type: "unsubscribe",
        product_ids: [pair],
        channels: ["ticker"]
      };
      ws.current.send(JSON.stringify(unsubscribe));
    };
  }, [pair]);

  const handleSelect = (e) => {
    setPair(e.target.value);
  };

  const dataOptions = {};
  const allDatas = [];

  interestRatesData.forEach((yearData, index) => {
    const year = yearData[0];
    const labels = yearData.slice(1).map(monthData => monthData[0]);
    const values = yearData.slice(1).map(monthData => monthData[1] === "" ? null : parseFloat(monthData[1].replace(",", ".")));
    
    dataOptions[`dataset${index + 1}`] = {
        labels: labels,
        datasets: [
            {
                label: year,
                backgroundColor: index % 2 === 0 ? 'rgba(75,192,192,0.4)' : 'rgba(153,102,255,0.4)',
                borderColor: index % 2 === 0 ? 'rgba(75,192,192,1)' : 'rgba(153,102,255,1)',
                borderWidth: 1,
                hoverBackgroundColor: index % 2 === 0 ? 'rgba(75,192,192,0.6)' : 'rgba(153,102,255,0.6)',
                hoverBorderColor: index % 2 === 0 ? 'rgba(75,192,192,1)' : 'rgba(153,102,255,1)',
                data: values
            }
        ]
    };

    allDatas.unshift({
        value: `dataset${index + 1}`,
        label: year
    });
  });

  const opts = {
    tooltips: { intersect: false, mode: "index" },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'll'
        },
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Price'
        }
      }
    }
  };

  const [selectedOption, setSelectedOption] = useState(allDatas.length > 0 ? allDatas[allDatas.length - 1] : null);

  const handleChange = (event) => {
    const value = event.target.value;
    const newSelectedOption = allDatas.find(option => option.value === value) || null;
    setSelectedOption(newSelectedOption);
  };

  return (
    <Layout>
      <div className="playground" style={{ display: "flex" }}>
        <div className="block-left" style={{ width: "50%", padding: "20px", borderRadius: "10px", display: "inline-block" }}>
          <div className="dashboard p-4 bg-white text-black rounded-lg shadow-lg">
            {price === "0.0" ? (
              <div>Loading...</div>
            ) : (
              <div className="flex flex-col items-start w-full">
                <h2 className="text-2xl font-bold mb-4">{`$${price}`}</h2>
                <select
                  onChange={handleSelect}
                  value={pair}
                  className="mb-4 p-2 bg-green-700 text-white rounded"
                >
                  <option value="" disabled>Select a pair</option> {/* Default option */}
                  {currencies.map(cur => (
                    <option key={cur.id} value={cur.id}>{cur.display_name}</option>
                  ))}
                </select>
                <div className="chart-container w-full h-[300px]">
                  <Line data={pastData} options={opts} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="block-right" style={{ width: "50%", padding: "20px", borderRadius: "10px", display: "inline-block" }}>
          <div className="dashboard p-4 bg-white text-black rounded-lg shadow-lg">
            <div className="flex flex-col items-start w-full">
              <h2 className="text-2xl font-bold mb-4">Taux du marché monétaire TMM</h2>
              <select
                value={selectedOption?.value || ""}
                onChange={handleChange}
                className="mb-4 p-2 bg-green-700 text-white rounded"
              >
                <option value="" disabled>Select a year</option> {/* Default option */}
                {allDatas.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <div className="chart-container w-full h-[300px]">
                <Bar
                  data={dataOptions[selectedOption?.value]}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
