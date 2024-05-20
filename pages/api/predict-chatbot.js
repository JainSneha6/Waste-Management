import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.post('http://localhost:5000/predict/chatbot', req.body);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}