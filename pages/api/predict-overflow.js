import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { ultrasonicReading } = req.body;
    try {
      const response = await axios.post('http://localhost:5000/predict/overflow', {
        ultrasonic_reading: ultrasonicReading,
      });
      res.status(200).json({ overflow_prediction: response.data.overflow_prediction });
    } catch (error) {
      console.error('Prediction failed:', error);
      res.status(500).json({ error: 'Prediction failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

