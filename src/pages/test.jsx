import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Axios is a popular library for making HTTP requests in React

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // URL of the website
        const url = "https://www.bct.gov.tn/bct/siteprod/tableau_statistique_a.jsp?params=PL203105";
        // Send a GET request
        const response = await axios.get(url);

        // Initialize the list to store the data
        let newData = [];

        // Check if the request was successful
        if (response.status === 200) {
          // Parse the HTML content of the page with BeautifulSoup
          const html = response.data;
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');

          // Find all tables on the page
          const tables = doc.querySelectorAll('table');

          // Check if there are at least two tables
          if (tables.length > 1) {
            // Select the second table
            const table = tables[1];

            // Extract rows from the table
            const rows = table.querySelectorAll('tr');

            // Extract headers to get the years
            const headers = Array.from(rows[0].querySelectorAll('td')).map(td => td.textContent.trim());

            // Loop through the years (excluding the first column header)
            for (let year_idx = 1; year_idx < headers.length; year_idx++) {
              const year = headers[year_idx];
              const yearData = [{ month: 'Month', value: year }];

              // Loop through the rows and extract data for each month
              for (let i = 1; i < rows.length; i++) {
                const columns = rows[i].querySelectorAll('td');
                if (columns.length > year_idx) { // Check if there are enough columns
                  const month = columns[0].textContent.trim();
                  const value = columns[year_idx].textContent.trim();
                  yearData.push({ month, value });
                }
              }

              // Add the year data to the main data list
              newData.push(yearData);
            }

            // Update the state with new data
            setData(newData);

            // Save data to a JSON file
            // This part cannot be done in a React application due to security restrictions in browsers
            // Instead, you can save the data to localStorage or send it to a backend server for storage
          } else {
            console.log("Less than two tables found in the HTML page.");
          }
        } else {
          console.log("Failed to retrieve the webpage. Status code:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <div>
      <h1>Interest Rates</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
