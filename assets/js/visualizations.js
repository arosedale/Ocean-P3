// assets/js/visualizations.js

// Load required libraries
const leafletScript = document.createElement('script');
leafletScript.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
document.head.appendChild(leafletScript);

const hexbinScript = document.createElement('script');
hexbinScript.src = 'https://unpkg.com/leaflet-hexbin@1.0.0/leaflet-hexbin.min.js';
document.head.appendChild(hexbinScript);

// Main visualization function
function renderMap(data) {
    // Parse and prepare data
    const parsedData = data.map(d => ({
        lat: +d.Latitude,
        lng: +d.Longitude,
        density: +d.Normalized,
        count: +d.Total_Pieces_L,
        date: d.Date
    }));

    // Create map
    const map = L.map('main-visualization').setView([20, 0], 2);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Create hexbin layer
    const hexLayer = L.hexbinLayer({
        radius: 12,
        opacity: 0.7,
        duration: 200,
        colorRange: ['#fef0d9', '#fdcc8a', '#fc8d59', '#e34a33', '#b30000'],
        radiusRange: [5, 20]
    });

    hexLayer.data(parsedData)
        .colorValue(d => d.density)
        .radiusValue(d => d.count)
        .tooltipContent((d, hex) => {
            return `<b>${hex.length} samples</b><br>
                    Avg density: ${d3.mean(hex, h => h.density).toFixed(4)}<br>
                    Avg count: ${d3.mean(hex, h => h.count).toFixed(1)}`;
        })
        .addTo(map);

    // Add year filter
    const years = [...new Set(parsedData.map(d => new Date(d.date).getFullYear()))].sort();
    const yearFilter = L.control({position: 'topright'});
    
    yearFilter.onAdd = function() {
        const div = L.DomUtil.create('div', 'year-filter');
        div.innerHTML = `
            <h4>Year Range</h4>
            <input type="range" id="year-slider" min="${years[0]}" max="${years[years.length-1]}" 
                   value="${years[years.length-1]}" step="1">
            <output id="year-value">${years[years.length-1]}</output>
        `;
        return div;
    };
    yearFilter.addTo(map);

    // Add filter functionality
    document.getElementById('year-slider').addEventListener('input', function() {
        const year = +this.value;
        document.getElementById('year-value').textContent = year;
        const filtered = parsedData.filter(d => new Date(d.date).getFullYear() <= year);
        hexLayer.data(filtered);
    });
}
