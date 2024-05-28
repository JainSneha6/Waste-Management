import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import {BiBot, BiCalendar, BiMicrophone, BiMicrophoneOff, BiRecycle, BiTrash, BiTrashAlt} from 'react-icons/bi';
import {FaCubes, FaFire, FaTemperatureHigh} from 'react-icons/fa'
import { FiTrash } from 'react-icons/fi';
import { GiNuclearWaste } from 'react-icons/gi';
import { LiaShoppingBagSolid } from 'react-icons/lia';
import { IoMdTrash } from 'react-icons/io';

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
            width: '45px', 
            padding: '14px', 
            fontSize: '18px', 
            marginLeft:'470px',
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
          {isListening && 
          <><BiMicrophone style={{marginRight:'10px'}}/></>}
          {!isListening && <><BiMicrophoneOff style={{marginRight:'10px'}}/></>}
        </button>
      </div>
      <div className={styles.buttonContainer}>
        <a
  id="leak-button"
  href="/leak"
  className={styles.button}
>
  <span>Leak Status Prediction</span>
  <FaFire className={styles.icon} />
</a>
        <a
          id="disposal-button"
          href="/disposal"
          className={styles.button}
        >
          <span>Disposal Method Prediction</span>
          <BiTrash className={styles.icon} />
        </a>
        <a
          id="material-button"
          href="/material"
          className={styles.button}
        >
          <span>Material Type Prediction</span>
          <FaCubes className={styles.icon}/>
        </a>
        <a
          id="waste-type-button"
          href="/wastetype"
          className={styles.button}
        >
          <span>Waste Quality Prediction</span>
          <BiTrashAlt className={styles.icon}/>
        </a>
        <a
          id="waste-generation-button"
          href="/wastegeneration"
          className={styles.button}
        >
          <span>Waste Generation Prediction</span>
          <BiCalendar className={styles.icon}/>
        </a>
        <a
          id="overflow-button"
          href="/overflow"
          className={styles.button}
        >
          <span>Overflow Status Prediction</span>
          <IoMdTrash className={styles.icon}/>
        </a>
        <a
          id="temperature-button"
          href="/temperature"
          className={styles.button}
        >
          <span>High Temperature Alert Prediction</span>
          <FaTemperatureHigh className={styles.icon}/>
        </a>
        <a
          id="recycle-button"
          href="/recycle"
          className={styles.button}
        >
          <span>Recyclable and Non-Recyclable Prediction</span>
          <BiRecycle className={styles.icon}/>
        </a>
        <a
          id="type-of-waste-button"
          href="/typeofwaste"
          className={styles.button}
        >
          <span>Type of Waste Prediction</span>
          <GiNuclearWaste className={styles.icon}/>
        </a>
        <a
          id="bags-button"
          href="/bags"
          className={styles.button}
        >
          <span>Type of Bags Prediction</span>
          <LiaShoppingBagSolid className={styles.icon}/>

        </a>
        <a
          id="chatbot-button"
          href="/chatbot"
          className={styles.button}
        >
          <span>WasteBot</span>
          <BiBot className={styles.icon}/>
        </a>
      </div>
    </div>
  );
};

export default Home;
