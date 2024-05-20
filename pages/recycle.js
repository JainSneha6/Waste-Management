import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [prediction, setPrediction] = useState(null);
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

    if (transcript === 'choose file') {
      document.getElementById('fileInput').click();
    } else if (transcript === 'upload and predict') {
      handleImageUpload();
    }
  };

  const toggleVoiceControl = () => {
    setVoiceActive(!voiceActive);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setImageUrl(URL.createObjectURL(file)); // Create URL for selected image
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await axios.post('http://localhost:5000/predict/classifier', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        setPrediction(response.data.prediction);
        speakPrediction(response.data.prediction);
      } else {
        console.error('Failed to receive prediction from server');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setLoading(false);
  };

  const speakPrediction = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const handleChooseFile = () => {
    document.getElementById('fileInput').click();
  };

  const handleUploadAndPredict = () => {
    handleImageUpload();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ maxWidth: '400px', padding: '30px', backgroundColor: '#f0f0f0', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '30px', color: '#022019' }}>Recyclable or Non Recyclable</h1>
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
          onClick={toggleVoiceControl}
        >
          {voiceActive ? 'Stop Voice Control' : 'Start Voice Control'}
        </button>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          id="fileInput"
        />
        {imageUrl && <img src={imageUrl} alt="Selected" style={{ maxWidth: '200px', marginBottom: '20px' }} />} {/* Adjusted max-width */}
        <label htmlFor="fileInput" style={{ display: 'block', marginBottom: '20px', width: '100%', cursor: 'pointer' }}>
          <button style={{ width: '100%', padding: '12px', fontSize: '16px', backgroundColor: '#36b02f', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', transition: 'background-color 0.3s' }} onClick={handleChooseFile}>Choose File</button>
        </label>
        <button
          onClick={handleUploadAndPredict}
          style={{ width: '100%', padding: '12px', fontSize: '16px', backgroundColor: '#36b02f', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', transition: 'background-color 0.3s' }}
          disabled={!selectedImage || loading}
        >
          {loading ? 'Predicting...' : 'Upload and Predict'}
        </button>
        {prediction && (
          <div style={{ marginTop: '30px' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '10px', color: '#333' }}>Prediction Result:</h2>
            <p style={{ fontSize: '16px', color: '#333' }}>{prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
}
