import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { weight, volume } = req.body;
    try {
      const response = await axios.post('http://localhost:5000/predict/material', {
        weight:weight,
        volume:volume
      });
      res.status(200).json({ predicted_material_type: response.data.predicted_material_type });
    } catch (error) {
      console.error('Prediction failed:', error);
      res.status(500).json({ error: 'Prediction failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

