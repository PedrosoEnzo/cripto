import React, { useState } from 'react';
//import styles from "../components/";
import Zykx from "../assets/mascote/Assistent.png";


const Assistant = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3001/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages }),
            });

            const data = await response.json();
            const assistantMessage = data.choices[0].message;
            setMessages([...newMessages, assistantMessage]);
        } catch (error) {
            console.error('Erro ao conversar com o assistente:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="assistant-container">
                    <div className='assistent-title'>
                <img src={Zykx} alt="" className={styles.AssitentImg}/>
                  <h2 className='highligh'>Zynx Assistant</h2>
              
            </div>
            <div className="chat-box">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`message ${msg.role}`}>
                        <strong>{msg.role === 'user' ? 'Você' : 'Assistente'}:</strong> {msg.content}
                    </div>
                ))}
                {loading && <div className="message assistant">Digitando...</div>}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Digite sua dúvida"
                />
                <button onClick={handleSend}>Enviar</button>
            </div>
        </div>
    );
};

export default Assistant;

