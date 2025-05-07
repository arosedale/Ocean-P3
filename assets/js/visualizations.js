// Use the raw.githubusercontent URL directly
const DATA_URL = 'https://raw.githubusercontent.com/arosedale/Ocean-P3/refs/heads/main/_data/microplastics.csv';

fetch(DATA_URL)
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.text();
  })
  .then(data => {
    console.log("Data loaded successfully!");
    // Process your data here
    const parsedData = d3.csvParse(data);
    renderVisualizations(parsedData);
  })
  .catch(error => {
    console.error("Data loading failed:", error);
    document.getElementById('map').innerHTML = `
      <div class="error">
        <h3>Data Loading Failed</h3>
        <p>We couldn't load the microplastics data.</p>
        <p>Technical details: ${error.message}</p>
        <p>Attempted URL: ${DATA_URL}</p>
      </div>
    `;
  });
