// First verify all required libraries are loaded
function checkRequirements() {
  const missing = [];
  if (!window.d3) missing.push('D3.js');
  if (!window.L) missing.push('Leaflet');
  if (!window.Chart) missing.push('Chart.js');
  
  if (missing.length > 0) {
    throw new Error(`Missing required libraries: ${missing.join(', ')}`);
  }
}

// Modern async/await data loader
async function loadVisualizations() {
  try {
    checkRequirements();
    
    const DATA_URL = 'https://raw.githubusercontent.com/arosedale/Ocean-P3/main/_data/microplastics.csv';
    const response = await fetch(DATA_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }

    const csvText = await response.text();
    const data = d3.csvParse(csvText);
    
    if (!data || data.length === 0) {
      throw new Error('Loaded data is empty');
    }

    renderMap(data);
    renderCharts(data);
    
  } catch (error) {
    showError(error);
    console.error('Visualization error:', error);
  }
}

// Initialize when everything is ready
document.addEventListener('DOMContentLoaded', loadVisualizations);
function showError(error) {
  const container = document.getElementById('map-container') || document.body;
  
  container.innerHTML = `
    <div class="error-alert">
      <h3>⚠️ Visualization Failed to Load</h3>
      <div class="error-details">
        <p><strong>Reason:</strong> ${error.message}</p>
        <p><strong>Data URL:</strong> ${DATA_URL}</p>
      </div>
      <div class="error-actions">
        <button onclick="window.location.reload()">Reload Page</button>
        <a href="https://github.com/arosedale/Ocean-P3/issues" target="_blank">Report Issue</a>
      </div>
    </div>
  `;
}
