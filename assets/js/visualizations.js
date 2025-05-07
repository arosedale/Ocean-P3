// Add this error-checking version
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded'); // Check console for this message
  
  // 1. Verify libraries loaded
  if (!window.L || !window.Chart || !window.d3) {
    showError('Required libraries failed to load. Try refreshing.');
    return;
  }

  // 2. Load data with multiple fallback paths
  const dataPaths = [
    '{{ site.baseurl }}/_data/microplastics.csv',
    '/Ocean-P3/_data/microplastics.csv',
    '_data/microplastics.csv'
  ];

  loadDataWithFallbacks(dataPaths)
    .then(renderVisualizations)
    .catch(showError);
});

async function loadDataWithFallbacks(paths) {
  for (const path of paths) {
    try {
      const response = await fetch(path);
      if (response.ok) return await response.text();
    } catch (e) {
      console.warn(`Failed path: ${path}`, e);
    }
  }
  throw new Error('All data paths failed');
}

function renderVisualizations(csvData) {
  console.log('Data loaded:', csvData.substring(0, 100)); // Verify in console
  const data = d3.csvParse(csvData);
  
  // Render Leaflet map
  const map = L.map('map').setView([20, 0], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  
  // Add your visualization code here
  console.log('Map rendered'); // Verify in console
}

function showError(error) {
  console.error(error);
  const errorDiv = document.createElement('div');
  errorDiv.className = 'visualization-error';
  errorDiv.innerHTML = `
    <h3>⚠️ Visualization Error</h3>
    <p>${error.message || error}</p>
    <p>Try: 
      <button onclick="window.location.reload()">Refresh Page</button>
      or check console for details
    </p>
  `;
  document.getElementById('map').appendChild(errorDiv);
}
