---
layout: post
title: "The Plastic Tide: Tracking Microplastics in Our Oceans"
author: autumnr3 (Group of 1)
date: 2025-05-07
---

## The Hidden Crisis in Our Waters

Microplastics - plastic particles smaller than a sesame seed - have infiltrated every corner of our oceans. These tiny pollutants come from broken-down plastic bottles, synthetic clothing fibers, and even beauty products. Scientists estimate that 8 million metric tons of plastic enter our oceans each year, equivalent to dumping one garbage truck of plastic every minute.

Our investigation uses data from the National Oceanic and Atmospheric Administration (NOAA) to reveal where these microplastics accumulate and how concentrations have changed over time. The interactive visualizations below let you explore this environmental crisis firsthand.

The data shows microplastics are now found from surface waters to the deepest ocean trenches, threatening marine life and potentially human health through the food chain. While the problem is global, certain areas like the Great Pacific Garbage Patch show especially high concentrations due to ocean currents.

## Interactive Microplastics Map

<div id="map-container" class="visualization">
  <div id="map" style="height: 500px;"></div>
  <div class="map-controls">
    <label for="year-range">Filter by Year: <span id="year-value">1970-2023</span></label>
    <input type="range" id="year-range" min="1970" max="2023" value="2023" step="1">
    <button id="reset-map">Reset View</button>
  </div>
</div>

*Interactive: Zoom, pan, and use the slider to explore microplastic concentrations over time*

## Key Findings

1. **Pollution Hotspots**: Coastal regions near urban areas show microplastic concentrations 5-10 times higher than open ocean areas
2. **Time Trends**: Microplastic density has increased 40% since 2010 according to our analysis
3. **Current Effects**: Ocean gyres accumulate plastics, creating "garbage patches" like the Great Pacific Garbage Patch

<div class="visualization-grid">
  <div class="contextual-viz">
    <h3>Sources of Ocean Microplastics</h3>
    <canvas id="sources-chart"></canvas>
    <p class="caption">Source: Jambeck et al. (2015), Science</p>
  </div>
  
  <div class="contextual-viz">
    <h3>Microplastics in the Food Chain</h3>
    <img src="/assets/images/food-chain.png" alt="Microplastic transfer through marine food web">
    <p class="caption">Source: NOAA Marine Debris Program</p>
  </div>
</div>

## Understanding the Data

The microplastics data comes from NOAA's Marine Debris Monitoring Program, which collects water samples using fine mesh nets towed behind research vessels. Each sample is analyzed in laboratories to count and classify plastic particles.

We processed this raw data to calculate normalized concentrations (values from 0-1) that account for different sampling methods. The interactive map shows these normalized values, while tooltips display the actual particle counts per liter.

Our analysis notebook demonstrates the complete data cleaning process and statistical tests confirming the significant increase in microplastic concentrations over time (p < 0.01).

## Data and Methods

- **Primary Dataset**: [NOAA Marine Debris Program](https://marinedebris.noaa.gov)
- **Analysis Notebook**: [View on GitHub](https://github.com/yourusername/Ocean-P3/blob/main/notebooks/microplastics-analysis.ipynb)
- **Visualization Tools**: Leaflet.js, Chart.js

## How You Can Help

1. Reduce single-use plastics in daily life
2. Choose natural fiber clothing over synthetics
3. Support policies limiting plastic production
4. Participate in beach cleanups

<script src="/assets/js/visualizations.js"></script>
