import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MaterialPage() {
  const [weight, setWeight] = useState('');
  const [volume, setVolume] = useState('');
  const [predictedMaterialType, setPredictedMaterialType] = useState('');
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
    const transcript = event.results[0][0].transcript; // Get transcribed speech
    if (transcript === 'predict') {
      handleSubmit();
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
      const response = await axios.post('/api/predict-material', {
        weight: parseFloat(weight),
        volume: parseFloat(volume)
      });
      setPredictedMaterialType(response.data.predicted_material_type);
        speakResult(response.data.predicted_material_type); // Speak the result
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
          onClick={toggleVoiceControl}
        >
          {voiceActive ? 'Stop Voice Control' : 'Start Voice Control'}
        </button>
        <h1 style={{ fontSize: '24px', marginBottom: '30px', color: '#022019' }}>Material Type Prediction</h1>
        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: '18px', marginBottom: '20px', display: 'block' }}>
            Weight:
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
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </label>
          <label style={{ fontSize: '18px', marginBottom: '20px', display: 'block' }}>
            Volume:
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
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
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
        {predictedMaterialType && (
          <p style={{ marginTop: '30px', fontSize: '18px', textAlign: 'center', color: '#333' }}>
            Predicted material type is: {predictedMaterialType}
          </p>
        )}
      </div>
    </div>
  );
}
