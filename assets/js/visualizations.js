// Add this at the top
console.log("Script loaded"); // Verify this appears in console

// Update your data loading
const dataUrl = '{{ site.baseurl }}/_data/microplastics.csv';

fetch(dataUrl)
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.text();
  })
  .then(csvData => {
    console.log("Data loaded successfully");
    // Rest of your visualization code
  })
  .catch(error => {
    console.error('Data loading failed:', error);
    document.getElementById('map').innerHTML = `
      <div class="error">
        <p>Failed to load data. Technical details:</p>
        <pre>${error.message}</pre>
        <p>Try refreshing the page.</p>
      </div>
    `;
  });

document.addEventListener('DOMContentLoaded', function() {
    // Load data
    Promise.all([
        fetch('/Ocean-P3/_data/microplastics.csv').then(r => r.text()),
        fetch('https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/leaflet.js'),
        fetch('https://cdn.jsdelivr.net/npm/chart.js')
    ]).then(([csvData]) => {
        // Process data
        const data = d3.csvParse(csvData, d => ({
            date: new Date(d.Date),
            lat: +d.Latitude,
            lng: +d.Longitude,
            count: +d.Total_Pieces_L,
            density: +d.Normalized
        }));

        // Main map visualization
        const map = L.map('map').setView([20, 0], 2);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        // Hexbin layer
        const hexLayer = L.hexbinLayer({
            radius: 15,
            colorRange: ['#f1eef6', '#bdc9e1', '#74a9cf', '#2b8cbe', '#045a8d'],
            radiusRange: [5, 20]
        });

        // Year filter functionality
        const yearSlider = document.getElementById('year-range');
        const yearDisplay = document.getElementById('year-value');
        
        yearSlider.addEventListener('input', function() {
            const year = +this.value;
            yearDisplay.textContent = `1970-${year}`;
            updateMap(year);
        });

        function updateMap(year) {
            const filtered = data.filter(d => d.date.getFullYear() <= year);
            hexLayer.data(filtered).addTo(map);
        }

        // Sources chart
        new Chart(document.getElementById('sources-chart'), {
            type: 'doughnut',
            data: {
                labels: ['Packaging', 'Fishing Gear', 'Textiles', 'Cosmetics', 'Other'],
                datasets: [{
                    data: [36, 18, 16, 5, 25],
                    backgroundColor: [
                        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'right' },
                    tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.raw}%` } }
                }
            }
        });

        // Initial render
        updateMap(2023);
    });
});
