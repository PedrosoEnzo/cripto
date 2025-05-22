import { useState, useRef, useEffect } from 'react';
import { FaTimes, FaRobot } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import Zynx from '../assets/mascote/Assistent.png';
import styles from './Assistent.module.css';
import ReactMarkdown from 'react-markdown';

const Assistant = ({ apiKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Olá! 👋 Sou o Zynx, seu assistente virtual. Como posso te ajudar hoje?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: input }]
              }
            ]
          })
        }
      );

      const data = await response.json();
     
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Desculpe, não consegui entender. Poderia reformular sua pergunta?';

      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (error) {
      console.error('Erro ao conectar à API Gemini:', error);
      setMessages(prev => [
        ...prev,
        { 
          role: 'assistant', 
          content: '⚠️ Ocorreu um erro ao conectar com o servidor. Por favor, tente novamente mais tarde.' 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {isOpen ? (
        <div className={styles.chatWindow}>
          {/* Conteúdo do chat */}
        </div>
      ) : (
        <button 
          className={styles.floatingButton} 
          onClick={toggleChat}
          aria-label="Abrir chat"
        >
          <img src={Zynx} alt="Assistente Zynx" className={styles.buttonImage} />
        </button>
      )}
    </div>
  );
};

export default Assistant;
