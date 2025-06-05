import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './ForgotPassword.css';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const generateRandomCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.includes('@')) {
      setMessage('Por favor, insira um e-mail válido');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const verificationCode = generateRandomCode();
      console.log(222)
      // Envia o e-mail usando EmailJS
      await emailjs.send(
        'service_980ulrf', // ID do serviço no EmailJS
        'template_fesj2kk', // ID do template no EmailJS
        {
          email: email,
          code: verificationCode
        },
        'At4gNkNjjS5c6Lq74' // Chave pública do EmailJS
      );

      setMessage('Código enviado com sucesso! Verifique seu e-mail.');
      
      // Armazena o código no localStorage temporariamente
      localStorage.setItem('resetCode', verificationCode);
      localStorage.setItem('resetEmail', email);
      
      setTimeout(() => {
        navigate('/resetPassword', {
          state: {
            email: email
          }
        });
      }, 2000);
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      setMessage('Erro ao enviar código. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <div className="forgot-password-header">
          <h1>Esqueceu a senha?</h1>
          <p>Enviaremos um código ao seu E-mail, para recuperar a sua conta.</p>
        </div>

        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Digite o Email cadastrado, por favor.</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />
          </div>

          {message && (
            <div className={`message ${message.includes('sucesso') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <button type="submit" disabled={isLoading} className="submit-button">
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Enviando...
              </>
            ) : (
              'Enviar código'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}