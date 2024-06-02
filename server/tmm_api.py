from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/scrape', methods=['GET'])
def scrape_data():
    # URL of the website
    url = "https://www.bct.gov.tn/bct/siteprod/tableau_statistique_a.jsp?params=PL203105"

    # Send a GET request
    response = requests.get(url)

    # Set the correct encoding
    response.encoding = response.apparent_encoding

    # Initialize the list to store the data
    data = []

    # Check if the request was successful
    if response.status_code == 200:
        # Parse the HTML content of the page with BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find all tables on the page
        tables = soup.find_all('table')

        # Check if there are at least two tables
        if len(tables) > 1:
            # Select the second table
            table = tables[1]

            # Extract rows from the table
            rows = table.find_all('tr')

            # Extract headers to get the years
            headers = [th.text.strip() for th in rows[0].find_all('td')]

            # Loop through the years (excluding the first column header)
            for year_idx in range(1, len(headers)):
                year = headers[year_idx]
                year_data = [year]

                # Loop through the rows and extract data for each month
                for row in rows[1:]:
                    columns = row.find_all('td')
                    if len(columns) > year_idx:  # Check if there are enough columns
                        month = columns[0].text.strip()
                        value = columns[year_idx].text.strip()
                        year_data.append([month, value])
                
                # Add the year data to the main data list
                data.append(year_data)

            # Return the data as JSON
            return jsonify(data)
        else:
            return jsonify({"error": "Less than two tables found in the HTML page."}), 404
    else:
        return jsonify({"error": "Failed to retrieve the webpage.", "status_code": response.status_code}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)
