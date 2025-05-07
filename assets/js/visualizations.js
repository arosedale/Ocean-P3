// This will only run AFTER all libraries are loaded
function initApp() {
  // Verify all libraries are available
  if (!window.d3 || !window.L || !window.Chart) {
    throw new Error('Required libraries not loaded');
  }

  console.log('All libraries loaded:', {
    d3: d3.version,
    leaflet: L.version,
    chartjs: Chart.version
  });

  // Your data loading and visualization code here
  const DATA_URL = 'https://raw.githubusercontent.com/arosedale/Ocean-P3/main/_data/microplastics.csv';
  
  fetch(DATA_URL)
    .then(response => response.text())
    .then(csv => {
      const data = d3.csvParse(csv);
      console.log('Data loaded:', data.length, 'records');
      // Render your visualizations
    })
    .catch(err => {
      console.error('Data load failed:', err);
      document.getElementById('map-container').innerHTML = `
        <div class="error">
          <h3>Data Load Failed</h3>
          <p>${err.message}</p>
          <p>Tried URL: ${DATA_URL}</p>
          <button onclick="window.location.reload()">Retry</button>
        </div>
      `;
    });
}

// Start the app when everything is ready
document.addEventListener('DOMContentLoaded', initApp);
