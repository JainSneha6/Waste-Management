import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { day } = req.body;
    try {
      const response = await axios.post('http://localhost:5000/predict/waste-generation', {
        day,
      });
      res.status(200).json({ predicted_waste_generation: response.data.predicted_waste_generation });
    } catch (error) {
      console.error('Prediction failed:', error);
      res.status(500).json({ error: 'Prediction failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
