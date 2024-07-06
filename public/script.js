const temperatureCtx = document.getElementById('temperatureChart').getContext('2d');
const humidityCtx = document.getElementById('humidityChart').getContext('2d');

const temperatureChart = new Chart(temperatureCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Temperature (°C)',
            data: [],
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            fill: false
        }]
    },
    options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'second'
                }
            },
            y: {
                beginAtZero: true
            }
        }
    }
});

const humidityChart = new Chart(humidityCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Humidity (%)',
            data: [],
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            fill: false
        }]
    },
    options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'second'
                }
            },
            y: {
                beginAtZero: true
            }
        }
    }
});

async function fetchData() {
    const response = await fetch('/sensor-data');
    const data = await response.json();

    const now = new Date();

    if (temperatureChart.data.labels.length > 20) {
        temperatureChart.data.labels.shift();
        temperatureChart.data.datasets[0].data.shift();
    }

    if (humidityChart.data.labels.length > 20) {
        humidityChart.data.labels.shift();
        humidityChart.data.datasets[0].data.shift();
    }

    temperatureChart.data.labels.push(now);
    temperatureChart.data.datasets[0].data.push(data.temperature);
    temperatureChart.update();

    humidityChart.data.labels.push(now);
    humidityChart.data.datasets[0].data.push(data.humidity);
    humidityChart.update();
}

setInterval(fetchData, 5000);
