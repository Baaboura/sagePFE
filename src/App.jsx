import React, { useState, useEffect, useRef } from "react";
import { formatData } from "./utils";
import CustomRoutes from "./routes";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useAuth } from "./hooks/auth";
import LoadingPage from "./pages/loading";

import "./styles.css";

import Home from "./pages/home/home";

export const App = () => {
  const { isLoaded } = useAuth();
  const [currencies, setCurrencies] = useState([]);
  const [pair, setPair] = useState("");
  const [price, setPrice] = useState("0.00");
  const [pastData, setPastData] = useState({});
  const ws = useRef(null);
  const first = useRef(false);
  const url = "https://api.pro.coinbase.com";

  useEffect(() => {
    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");

    const fetchData = async () => {
      try {
        const response = await fetch(url + "/products");
        const data = await response.json();
        let pairs = data.filter(pair => pair.quote_currency === "USD");
        pairs = pairs.sort((a, b) => a.base_currency.localeCompare(b.base_currency));
        setCurrencies(pairs);
        first.current = true;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!first.current || !pair) return;

    const msg = {
      type: "subscribe",
      product_ids: [pair],
      channels: ["ticker"]
    };
    const jsonMsg = JSON.stringify(msg);
    ws.current.send(jsonMsg);

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
  }, [pair]);

  const handleSelect = (e) => {
    const selectedPair = e.target.value;
    if (pair !== selectedPair) {
      const unsubMsg = {
        type: "unsubscribe",
        product_ids: [pair],
        channels: ["ticker"]
      };
      const unsub = JSON.stringify(unsubMsg);
      ws.current.send(unsub);
      setPair(selectedPair);
    }
  };

  if (!isLoaded) return <LoadingPage />;

  const router = createBrowserRouter(CustomRoutes());
  return (
    <RouterProvider router={router}>
      <div className="container">
        <select name="currency" value={pair} onChange={handleSelect}>
          {currencies.map((cur) => (
            <option key={cur.id} value={cur.id}>
              {cur.display_name}
            </option>
          ))}
        </select>
        
      </div>
    </RouterProvider>
  );
};
