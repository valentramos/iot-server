const ctx1 = document.getElementById('sensorChart1').getContext('2d');
const sensorChart1 = new Chart(ctx1, {
  type: 'line',
  data: {
    labels: [], // Etiquetas para el eje X
    datasets: [
      {
        label: 'Temperature (°C)',
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
        data: [], // Datos de temperatura del sensor 1
      },
      {
        label: 'Humidity (%)',
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
        data: [], // Datos de humedad del sensor 1
      },
    ],
  },
  options: {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
          tooltipFormat: 'PPpp'
        },
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Value'
        }
      }
    },
  },
});

const ctx2 = document.getElementById('sensorChart2').getContext('2d');
const sensorChart2 = new Chart(ctx2, {
  type: 'line',
  data: {
    labels: [], // Etiquetas para el eje X
    datasets: [
      {
        label: 'Temperature (°C)',
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        data: [], // Datos de temperatura del sensor 2
      },
      {
        label: 'Humidity (%)',
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: false,
        data: [], // Datos de humedad del sensor 2
      },
    ],
  },
  options: {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
          tooltipFormat: 'PPpp'
        },
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Value'
        }
      }
    },
  },
});

async function fetchSensorData() {
  const response = await fetch('/sensor-data');
  const data = await response.json();
  const now1 = new Date(data.sensor1.timestamp);
  const now2 = new Date(data.sensor2.timestamp);
  
  // Actualizar gráfico del sensor 1
  sensorChart1.data.labels.push(now1);
  sensorChart1.data.datasets[0].data.push(data.sensor1.temperature);
  sensorChart1.data.datasets[1].data.push(data.sensor1.humidity);

  if (sensorChart1.data.labels.length > 20) {
    sensorChart1.data.labels.shift();
    sensorChart1.data.datasets[0].data.shift();
    sensorChart1.data.datasets[1].data.shift();
  }

  // Actualizar gráfico del sensor 2
  sensorChart2.data.labels.push(now2);
  sensorChart2.data.datasets[0].data.push(data.sensor2.temperature);
  sensorChart2.data.datasets[1].data.push(data.sensor2.humidity);

  if (sensorChart2.data.labels.length > 20) {
    sensorChart2.data.labels.shift();
    sensorChart2.data.datasets[0].data.shift();
    sensorChart2.data.datasets[1].data.shift();
  }

  sensorChart1.update();
  sensorChart2.update();
}

// Actualiza los datos cada 5 segundos
setInterval(fetchSensorData, 5000);
