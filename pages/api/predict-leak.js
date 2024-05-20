import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { sensorReading } = req.body;
    try {
      const response = await axios.post('http://localhost:5000/predict/leak', {
        sensor_reading: sensorReading,
      });
      res.status(200).json({ leak_status: response.data.leak_status });
    } catch (error) {
      console.error('Prediction failed:', error);
      res.status(500).json({ error: 'Prediction failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
