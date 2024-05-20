import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (isListening) {
      startListening();
    } else {
      stopListening();
    }

    return () => {
      stopListening();
    };
  }, [isListening]);

  const startListening = () => {
    if (!recognition) {
      const newRecognition = new window.webkitSpeechRecognition();
      newRecognition.continuous = true;
      newRecognition.interimResults = true;
  
      newRecognition.onresult = event => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setTranscript(transcript);
        // Execute action based on the transcript
        executeAction(transcript);
      };
  
      newRecognition.onend = () => {
        if (isListening) {
          startListening(); // Restart recognition if it's still enabled
        }
      };
  
      setRecognition(newRecognition);
      newRecognition.start();
    } else if (recognition.state === 'idle') {
      recognition.start();
    }
  };
  
  const stopListening = () => {
    if (recognition && recognition.state !== 'idle') {
      recognition.stop();
    }
  };
  
  

  const toggleVoiceControl = () => {
    setIsListening(prevState => {
      if (prevState) {
        stopListening();
      } else {
        startListening();
      }
      return !prevState;
    });
  };
  

  const executeAction = (command) => {
    // Define actions based on voice commands
    switch (command.toLowerCase()) {
      case 'league status prediction':
        document.getElementById('leak-button').click();
        break;
      case 'disposal method prediction':
        document.getElementById('disposal-button').click();
        break;
      case 'material type prediction':
        document.getElementById('material-button').click();
        break;
      case 'waste quality prediction':
        document.getElementById('waste-type-button').click();
        break;
      case 'waste generation prediction':
        document.getElementById('waste-generation-button').click();
        break;
      case 'overflow status prediction':
        document.getElementById('overflow-button').click();
        break;
      case 'high temperature alert prediction':
        document.getElementById('temperature-button').click();
        break;
      case 'recyclable and non recyclable prediction':
        document.getElementById('recycle-button').click();
        break;
      case 'type of waste prediction':
        document.getElementById('type-of-waste-button').click();
        break;
      case 'type of bags prediction':
        document.getElementById('bags-button').click();
        break;
      case 'wastepot': case 'waste pot': case 'waist pot': case 'waistpot': case 'waist boat': case 'waste boat':
          document.getElementById('chatbot-button').click();
          break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.typewriterContainer}>
        <h1 className={styles.heading}>Waste Management System</h1>
        <img src="https://i.pinimg.com/736x/45/2d/bf/452dbf1287d230fb37666a1e0510e161.jpg" alt="Waste Management" className={styles.image} />
        <button
          style={{ 
            width: '300px', 
            padding: '14px', 
            fontSize: '18px', 
            marginLeft:'350px',
            backgroundColor: isListening ? '#dc3545' : '#36b02f', 
            color: 'black', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: 'pointer',
            textAlign: 'center',
            transition: 'background-color 0.3s',
            marginTop: '20px'
          }}
          onClick={toggleVoiceControl}
        >
          {isListening ? 'Stop Voice Control' : 'Start Voice Control'}
        </button>
      </div>
      <div className={styles.buttonContainer}>
        <a
          id="leak-button"
          href="/leak"
          className={styles.button}
        >
          Leak Status Prediction
        </a>
        <a
          id="disposal-button"
          href="/disposal"
          className={styles.button}
        >
          Disposal Method Prediction
        </a>
        <a
          id="material-button"
          href="/material"
          className={styles.button}
        >
          Material Type Prediction
        </a>
        <a
          id="waste-type-button"
          href="/wastetype"
          className={styles.button}
        >
          Waste Quality Prediction
        </a>
        <a
          id="waste-generation-button"
          href="/wastegeneration"
          className={styles.button}
        >
          Waste Generation Prediction
        </a>
        <a
          id="overflow-button"
          href="/overflow"
          className={styles.button}
        >
          Overflow Status Prediction
        </a>
        <a
          id="temperature-button"
          href="/temperature"
          className={styles.button}
        >
          High Temperature Alert Prediction
        </a>
        <a
          id="recycle-button"
          href="/recycle"
          className={styles.button}
        >
          Recyclable and Non-Recyclable Prediction
        </a>
        <a
          id="type-of-waste-button"
          href="/typeofwaste"
          className={styles.button}
        >
          Type of Waste Prediction
        </a>
        <a
          id="bags-button"
          href="/bags"
          className={styles.button}
        >
          Type of Bags Prediction
        </a>
        <a
          id="chatbot-button"
          href="/chatbot"
          className={styles.button}
        >
          WasteBot
        </a>
      </div>
    </div>
  );
};

export default Home;
