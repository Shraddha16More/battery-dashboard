const apiURL = 'https://batterydemoapi-521905205220.asia-south1.run.app/battery-data';

async function fetchBatteryData() {
  try {
    const response = await fetch(apiURL);
    const result = await response.json();

    console.log("API Response:", result);

    const data = result.data;

    // Verify data is structured as expected
    if (
      !Array.isArray(data.timestamp) ||
      !Array.isArray(data.soc) ||
      !Array.isArray(data.voltage) ||
      !Array.isArray(data.current)
    ) {
      throw new Error("One or more expected arrays are missing in the API response.");
    }

    const timestamps = data.timestamp;
    const soc = data.soc;
    const voltage = data.voltage;
    const current = data.current;

    // Chart 1: SOC and Voltage
    const ctx1 = document.getElementById('socVoltageChart').getContext('2d');
    new Chart(ctx1, {
      type: 'line',
      data: {
        labels: timestamps,
        datasets: [
          {
            label: 'SOC (%)',
            data: soc,
            borderColor: 'blue',
            yAxisID: 'y1',
            tension: 0.3
          },
          {
            label: 'Voltage (V)',
            data: voltage,
            borderColor: 'orange',
            yAxisID: 'y2',
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y1: {
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'SOC (%)'
            }
          },
          y2: {
            type: 'linear',
            position: 'right',
            title: {
              display: true,
              text: 'Voltage (V)'
            },
            grid: {
              drawOnChartArea: false
            }
          },
          x: {
            title: {
              display: true,
              text: 'Timestamp'
            }
          }
        },
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          title: {
            display: true,
            text: 'SOC and Voltage Over Time'
          }
        }
      }
    });

    // Chart 2: Current
    const ctx2 = document.getElementById('currentChart').getContext('2d');
    new Chart(ctx2, {
      type: 'line',
      data: {
        labels: timestamps,
        datasets: [
          {
            label: 'Current (A)',
            data: current,
            borderColor: 'green',
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            title: {
              display: true,
              text: 'Current (A)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Timestamp'
            }
          }
        },
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          title: {
            display: true,
            text: 'Current Over Time'
          }
        }
      }
    });

  } catch (error) {
    console.error('Error fetching or plotting data:', error);
  }
}

fetchBatteryData();
