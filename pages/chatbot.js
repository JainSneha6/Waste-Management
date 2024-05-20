import { useState, useEffect } from 'react';
import axios from 'axios';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState(null);

  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    setSpeechRecognition(recognition);
  }, []);

  const startListening = () => {
    if (speechRecognition) {
      speechRecognition.onstart = () => {
        setListening(true);
      };

      speechRecognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        sendMessage();
      };

      speechRecognition.onend = () => {
        setListening(false);
      };

      speechRecognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setListening(false);
      };

      speechRecognition.start();
    }
  };

  const stopListening = () => {
    if (speechRecognition) {
      speechRecognition.stop();
    }
  };

  const sendMessage = async () => {
    if (!input) return;

    // Add user message to the chat
    const userMessage = { text: input, sender: 'user' };

    // Fetch response from the chatbot API
    try {
      const response = await axios.post('/api/predict-chatbot', { question: input });
      const answer = response.data.predicted_answer;

      // Add chatbot response and user message to the chat
      setMessages([...messages, userMessage, { text: answer, sender: 'chatbot' }]);
      
      // Speak the answer
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(answer);
      synth.speak(utterance);
    } catch (error) {
      console.error('Error fetching response:', error);
    }

    setInput('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatContainer}>
        {messages.map((message, index) => (
          <div key={index} style={{ ...styles.message, alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ padding: '5px', borderRadius: '10px', backgroundColor: message.sender === 'user' ? '#36b02f' : '#f0f0f0', color: message.sender === 'user' ? '#fff' : '#000' }}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
  <input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="Type your message..."
    style={styles.input}
  />
  <button onClick={sendMessage} style={styles.button}>Send</button>
  <button onClick={listening ? stopListening : startListening} style={{ ...styles.button, ...styles.secondButton }}> {/* Apply styles for the second button */}
    {listening ? 'Stop Listening' : 'Start Listening'}
  </button>
</div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    boxSizing: 'border-box'
  },
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    overflowY: 'auto',
    marginBottom: '20px',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    flexGrow: 1,
  },
  message: {
    maxWidth: '70%',
    marginBottom: '10px',
  },
  inputContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: '10px',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#36b02f',
    color: '#fff',
    cursor: 'pointer',
    outline: 'none',
  },
  secondButton: {
    marginLeft: '10px', // Add margin between the two buttons
  }
};

export default ChatbotPage;
