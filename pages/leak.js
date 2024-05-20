import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function LeakPage() {
  const [sensorReading, setSensorReading] = useState('');
  const [leakStatus, setLeakStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false); // State to track if voice control is active

  useEffect(() => {
    if (voiceActive) {
      startListening();
    }
  }, [voiceActive]);

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition(); // Initialize speech recognition
    recognition.lang = 'en-US'; // Set language to English
    recognition.onresult = handleSpeechResult; // Define event handler for speech recognition result
    recognition.start(); // Start speech recognition
  };

  const handleSpeechResult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();

    if (transcript === 'predict') {
      handleSubmit(); // Call handleSubmit without event object
    }
  };

  const toggleVoiceControl = () => {
    setVoiceActive(!voiceActive); // Toggle voice control
  };

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault(); // Prevent default form submission if event is present
    }
    setLoading(true);
    try {
      const response = await axios.post('/api/predict-leak', {
        sensorReading: parseFloat(sensorReading)
      });
      setLeakStatus(response.data.leak_status);
        speakResult(response.data.leak_status); // Speak the leak status
    } catch (error) {
      console.error('Prediction failed:', error);
    }
    setLoading(false);
  };

  const speakResult = (text) => {
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
          onClick={toggleVoiceControl}
        >
          {voiceActive ? 'Stop Voice Control' : 'Start Voice Control'}
        </button>
        <h1 style={{ fontSize: '24px', marginBottom: '30px', color: '#022019' }}>Leak Status Prediction</h1>
        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: '18px', marginBottom: '20px', display: 'block' }}>
            Sensor Reading:
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
              value={sensorReading}
              onChange={(e) => setSensorReading(e.target.value)}
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
            transition: 'background-color 0.3s',
            marginRight: '5px'
          }} type="submit" disabled={loading}>
            {loading ? 'Predicting...' : 'Predict'}
          </button>
        </form>
        {leakStatus && (
          <p style={{ marginTop: '30px', fontSize: '18px', textAlign: 'center', color: '#333' }}>
            Predicted leak status is: {leakStatus}
          </p>
        )}
      </div>
    </div>
  );
}
