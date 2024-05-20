import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function OverflowPage() {
  const [ultrasonicReading, setUltrasonicReading] = useState('');
  const [overflowPrediction, setOverflowPrediction] = useState('');
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
      const response = await axios.post('/api/predict-overflow', {
        ultrasonicReading: parseFloat(ultrasonicReading)
      });
      setOverflowPrediction(response.data.overflow_prediction);
        speakResult(response.data.overflow_prediction); // Speak the overflow prediction
    } catch (error) {
      console.error('Prediction failed:', error);
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
          onClick={() => {
            toggleVoiceControl();
            if (voiceActive) {
              handleSubmit();
            }
          }}
        >
          {voiceActive ? 'Stop Voice Control' : 'Start Voice Control'}
        </button>
        <h1 style={{ fontSize: '24px', marginBottom: '30px', color: '#022019' }}>Overflow Prediction</h1>
        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: '18px', marginBottom: '20px', display: 'block' }}>
            Ultrasonic Reading:
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
              type="text" // Change input type to 'text' to accept voice input
              value={ultrasonicReading}
              onChange={(e) => setUltrasonicReading(e.target.value)}
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
        {overflowPrediction && (
          <p style={{ marginTop: '30px', fontSize: '18px', textAlign: 'center', color: '#333' }}>
            Predicted overflow status is: {overflowPrediction}
          </p>
        )}
      </div>
    </div>
  );
}
