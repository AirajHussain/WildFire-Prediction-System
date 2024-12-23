import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Navbar from '../components/Navbar'; // Assuming you have a Navbar component

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

import {chart as chartjs} from 'chart.js/auto'

function Reports() {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(1); // Track selected batch
  const [allData, setAllData] = useState([]); // Store all batches data

  useEffect(() => {
    axios.get('http://localhost:5000/api/data')
      .then(response => {
        const data = response.data;
        setAllData(data); // Store all data for later filtering

        // Filter data to only include the selected batch
        const filteredData = data.filter(item => item.batch_id === selectedBatch);

        // Extract data for the chart
        const labels = filteredData.map(item => new Date(item.received_at).toLocaleString());
        const airTempData = filteredData.map(item => item.air_temp);
        const airHumidityData = filteredData.map(item => item.air_humidity);
        const soilMoistureData = filteredData.map(item => item.soil_moisture);
        const airPressureData = filteredData.map(item => item.air_pressure);

        // Calculate the Fire Index based on a formula (this is just an example formula)
        const fireIndexData = airTempData.map((temp, index) => {
          const humidity = airHumidityData[index];
          const moisture = soilMoistureData[index];
          const pressure = airPressureData[index];

          // Example formula for Fire Index (adjust as needed)
          const fireIndex = ((temp - 32) / 2) + (humidity / 100) + (moisture / 100) + (pressure / 1000);
          return fireIndex;
        });

        // Update state with filtered chart data
        setChartData({
          airTempData,
          airHumidityData,
          soilMoistureData,
          airPressureData,
          fireIndexData,
          labels
        });
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError('Failed to load chart data. Please try again later.');
      });
  }, [selectedBatch]); // Refetch data whenever the batch changes

  // Create a line chart dataset for each metric
  const createChartData = (label, data, color) => ({
    labels: chartData.labels,
    datasets: [
      {
        label: label,
        data: data,
        borderColor: color,
        fill: false,
        tension: 0.1,
      }
    ]
  });

  // Handle batch selection change
  const handleBatchChange = (event) => {
    setSelectedBatch(Number(event.target.value)); // Update selected batch based on dropdown
  };

  return (
    <div>
      <Navbar />
      {error ? (
        <p>{error}</p>
      ) : chartData ? (
        <div style={{ width: '80%', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {/* Dropdown for selecting batch */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="batchSelect">Select Batch: </label>
            <select id="batchSelect" value={selectedBatch} onChange={handleBatchChange}>
              {/* Dynamically generate batch options from the data */}
              {[...new Set(allData.map(item => item.batch_id))].map(batch => (
                <option key={batch} value={batch}>
                  Batch {batch}
                </option>
              ))}
            </select>
          </div>

          {/* Fire Index Line Chart (Moved up) */}
          <div style={{ marginBottom: '30px', flex: '1 1 45%' }}>
            <h3>Fire Index</h3>
            <Line data={createChartData('Fire Index', chartData.fireIndexData, 'rgb(255, 159, 64)')} />
          </div>

          {/* Air Temperature Line Chart (Moved down) */}
          <div style={{ marginBottom: '30px', flex: '1 1 45%' }}>
            <h3>Air Temperature (°C)</h3>
            <Line data={createChartData('Air Temperature (°C)', chartData.airTempData, 'rgb(255, 99, 132)')} />
          </div>

          {/* Air Humidity Line Chart */}
          <div style={{ marginBottom: '30px', flex: '1 1 45%' }}>
            <h3>Air Humidity (%)</h3>
            <Line data={createChartData('Air Humidity (%)', chartData.airHumidityData, 'rgb(54, 162, 235)')} />
          </div>

          {/* Soil Moisture Line Chart */}
          <div style={{ marginBottom: '30px', flex: '1 1 45%' }}>
            <h3>Soil Moisture (%)</h3>
            <Line data={createChartData('Soil Moisture (%)', chartData.soilMoistureData, 'rgb(75, 192, 192)')} />
          </div>

          {/* Air Pressure Line Chart */}
          <div style={{ marginBottom: '30px', flex: '1 1 45%' }}>
            <h3>Air Pressure (hPa)</h3>
            <Line data={createChartData('Air Pressure (hPa)', chartData.airPressureData, 'rgb(153, 102, 255)')} />
          </div>
        </div>
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
}

export default Reports;
