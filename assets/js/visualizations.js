// Wait for all libraries to load
window.addEventListener('DOMContentLoaded', function() {
  // Verify libraries
  if (!window.d3 || !window.L || !window.Chart) {
    showError("Required libraries not loaded");
    return;
  }

  // Load data
  const DATA_URL = 'https://raw.githubusercontent.com/arosedale/Ocean-P3/main/_data/microplastics.csv';
  
  fetch(DATA_URL)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.text();
    })
    .then(csvText => {
      try {
        const data = d3.csvParse(csvText);
        if (!data.length) throw new Error("No data found in CSV");
        renderMap(data);
        renderCharts(data);
      } catch (parseError) {
        showError(`Data parsing failed: ${parseError.message}`);
      }
    })
    .catch(error => {
      showError(`Data loading failed: ${error.message}\nTried URL: ${DATA_URL}`);
    });

  function renderMap(data) {
    const map = L.map('map').setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    
    // Add your visualization code here
    console.log("Map rendered with", data.length, "data points");
  }

  function renderCharts(data) {
    // Your chart rendering code
  }

  function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.innerHTML = `
      <h3>⚠️ Error</h3>
      <p>${message}</p>
      <button onclick="window.location.reload()">Reload Page</button>
    `;
    document.getElementById('map-container').appendChild(errorDiv);
    console.error(message);
  }
});
