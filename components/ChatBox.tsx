import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/styles.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const ChatBox: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{ user: string, text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('API_URL:', API_URL); 
    console.log('Environment Variable:', process.env.NEXT_PUBLIC_API_URL); 
  }, []);

  const sendMessage = async (messageToSend: string) => {
    setIsLoading(true);
    setChat(prevChat => [
      ...prevChat,
      { user: 'You', text: messageToSend },
      { user: 'Answer', text: 'Loading...', style: { color: 'white' } }
    ]);
    try {
      console.log('Sending message:', messageToSend);
      const response = await axios.post(`${API_URL}/api/chat`, { message: messageToSend }, { timeout: 120000 });
      console.log('Received response:', response.data);
      if (response.data && response.data.response) {
        setChat(prevChat => [
          ...prevChat.slice(0, -1),
          { user: 'Answer', text: response.data.response, style: { color: 'white' } }
        ]);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      let errorMessage = 'Sorry, an error occurred. The model might be taking too long to respond.';
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.error || errorMessage;
      }
      setChat(prevChat => [
        ...prevChat.slice(0, -1),
        { user: 'Answer', text: errorMessage, style: { color: 'white' } }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const messageToSend = message.trim();
      if (messageToSend !== '') {
        setMessage('');
        sendMessage(messageToSend);
      }
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div id="chatbox" className={styles.chatbox}>
        {chat.map((msg, index) => (
          <p key={index} className={styles.chatMessage}><strong>{msg.user}:</strong> {msg.text}</p>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask something about Jordan vs LeBron"
          className={styles.chatInput}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default ChatBox;