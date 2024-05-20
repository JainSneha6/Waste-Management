import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { temperature_reading } = req.body;
    try {
      const response = await axios.post('http://localhost:5000/predict/temperature', {
        temperature_reading: temperature_reading,
      });
      res.status(200).json({ temp_alert: response.data.temp_alert });
    } catch (error) {
      console.error('Prediction failed:', error.message);
      res.status(500).json({ error: 'Prediction failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
