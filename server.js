const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let sensorData = { temperature: 0, humidity: 0 };

app.use(bodyParser.json());

app.post('/sensor-data', (req, res) => {
  const { temperature, humidity } = req.body;
  if (temperature === undefined || humidity === undefined) {
    return res.status(400).send('Bad Request');
  }
  sensorData = { temperature, humidity };
  console.log(`Received data: Temperature = ${temperature}, Humidity = ${humidity}`);
  res.sendStatus(200);
});

app.get('/sensor-data', (req, res) => {
  res.json(sensorData);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
