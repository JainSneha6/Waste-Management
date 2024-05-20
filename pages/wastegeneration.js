import { useState, useEffect } from 'react';
import axios from 'axios';

export default function WasteGenerationPage() {
  const [day, setDay] = useState('');
  const [predictedWasteGeneration, setPredictedWasteGeneration] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (voiceActive) {
      startListening();
    } else {
      stopListening();
    }

    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, [voiceActive]);

  const startListening = () => {
    const recognitionInstance = new window.webkitSpeechRecognition();
    recognitionInstance.lang = 'en-US';
    recognitionInstance.onresult = handleSpeechResult;
    recognitionInstance.start();
    setRecognition(recognitionInstance);
  };

  const stopListening = () => {
    if (recognition) {
      recognition.abort();
      setRecognition(null);
    }
  };

  const handleSpeechResult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();

    if (transcript === 'predict') {
      handleSubmit();
    }
  };

  const toggleVoiceControl = () => {
    setVoiceActive(!voiceActive);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/predict-wastegeneration', {
        day,
      });
      setPredictedWasteGeneration(response.data.predicted_waste_generation);
        speakPrediction(response.data.predicted_waste_generation);
    } catch (error) {
      console.error('Prediction failed:', error);
    }
    setLoading(false);
  };

  const speakPrediction = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}>
      <div style={{
        maxWidth: '400px',
        padding: '30px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '24px', marginBottom: '30px', color: '#022019' }}>Predict Waste Generation</h1>
        <button
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            backgroundColor: voiceActive ? '#dc3545' : '#36b02f',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            marginBottom: '20px'
          }}
          onClick={() => {
            toggleVoiceControl();
            if (voiceActive) {
              handleSubmit();
            }
          }}
        >
          {voiceActive ? 'Stop Voice Control' : 'Start Voice Control'}
        </button>
        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: '18px', marginBottom: '20px', display: 'block' }}>
            Day of the Week:
            <select
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                backgroundColor: '#fff',
                color: '#333',
                marginBottom: '20px',
                boxSizing: 'border-box'
              }}
              value={day}
              onChange={(e) => setDay(e.target.value)}
              required
            >
              <option value="">Select Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </label>
          <button style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            backgroundColor: '#36b02f',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }} type="submit" disabled={loading}>
            {loading ? 'Predicting...' : 'Predict'}
          </button>
        </form>
        {predictedWasteGeneration && (
          <p style={{ marginTop: '30px', fontSize: '18px', textAlign: 'center', color: '#333' }}>
            Predicted waste generation is: {predictedWasteGeneration}
          </p>
        )}
      </div>
    </div>
  );
}
