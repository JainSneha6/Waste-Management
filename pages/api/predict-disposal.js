import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { moistureReading } = req.body;
    try {
      const response = await axios.post('http://localhost:5000/predict/disposal', {
        moisture: moistureReading,
      });
      res.status(200).json({ predicted_disposal_method: response.data.predicted_disposal_method });
    } catch (error) {
      console.error('Prediction failed:', error);
      res.status(500).json({ error: 'Prediction failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
