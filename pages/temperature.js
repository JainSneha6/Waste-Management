import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TemperaturePredictionForm() {
  const [temperatureReading, setTemperatureReading] = useState('');
  const [tempAlert, setTempAlert] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false); // State to track if voice control is active
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
    setVoiceActive(!voiceActive); // Toggle voice control
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/predict-temperature', {
        temperature_reading: parseFloat(temperatureReading)
      });
      setTempAlert(response.data.temp_alert);
        speakResult(response.data.temp_alert); // Speak the temperature alert
    } catch (error) {
      console.error('Prediction failed:', error.message);
      setTempAlert('Prediction failed. Please try again.');
    }
    setLoading(false);
  };

  const speakResult = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
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
        background: 'linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%)',
        borderRadius: '8px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center' 
      }}>
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
          type="button"
          onClick={() => {
            toggleVoiceControl();
            if (voiceActive) {
              handleSubmit();
            }
          }}
        >
          {voiceActive ? 'Stop Voice Control' : 'Start Voice Control'}
        </button>
        <h1 style={{ fontSize: '24px', marginBottom: '30px', color: '#022019' }}>Temperature Prediction</h1>
        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: '18px', marginBottom: '20px', display: 'block' }}>
            Temperature Reading:
            <input
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
              type="number"
              value={temperatureReading}
              onChange={(e) => setTemperatureReading(e.target.value)}
              required
            />
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
        {tempAlert && <p style={{ marginTop: '20px', fontSize: '18px', color: '#333' }}>Temperature Alert: {tempAlert}</p>}
      </div>
    </div>
  );
}
