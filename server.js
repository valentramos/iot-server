const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let sensorData1 = { temperature: 0, humidity: 0, timestamp: new Date().toISOString() };
let sensorData2 = { temperature: 0, humidity: 0, timestamp: new Date().toISOString() };
let ledState = { status: 'off' };

app.use(bodyParser.json());
app.use(express.static('public')); // Servir archivos estáticos desde la carpeta 'public'

app.post('/sensor-data-1', (req, res) => {
  const { temperature, humidity } = req.body;
  if (temperature === undefined || humidity === undefined || isNaN(temperature) || isNaN(humidity)) {
    return res.status(400).send('Bad Request: Invalid data');
  }
  sensorData1 = { temperature, humidity, timestamp: new Date().toISOString() };
  console.log(`Received data from sensor 1: Temperature = ${temperature}, Humidity = ${humidity}`);
  res.sendStatus(200);
});

app.post('/sensor-data-2', (req, res) => {
  const { temperature, humidity } = req.body;
  if (temperature === undefined || humidity === undefined || isNaN(temperature) || isNaN(humidity)) {
    return res.status(400).send('Bad Request: Invalid data');
  }
  sensorData2 = { temperature, humidity, timestamp: new Date().toISOString() };
  console.log(`Received data from sensor 2: Temperature = ${temperature}, Humidity = ${humidity}`);
  res.sendStatus(200);
});

app.get('/sensor-data', (req, res) => {
  res.json({ sensor1: sensorData1, sensor2: sensorData2 });
});

app.post('/led', (req, res) => {
  const { status } = req.body;
  if (status !== 'on' && status !== 'off') {
    return res.status(400).send('Bad Request: Invalid status');
  }
  ledState = { status };
  console.log(`LED status: ${status}`);
  res.sendStatus(200);
});

app.get('/led', (req, res) => {
  res.json(ledState);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
