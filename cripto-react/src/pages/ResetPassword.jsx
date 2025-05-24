import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css';

export function ResetPassword() {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verifica se o código digitado é igual ao armazenado
    const storedCode = localStorage.getItem('resetCode');
    const storedEmail = localStorage.getItem('resetEmail');
    
    if (!storedCode || code !== storedCode) {
      setMessage('Código inválido ou expirado');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setMessage('As senhas não coincidem!');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulação de chamada API para atualizar a senha
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Limpa o localStorage após a redefinição
      localStorage.removeItem('resetCode');
      localStorage.removeItem('resetEmail');
      
      setMessage('Senha alterada com sucesso! Redirecionando...');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setMessage('Erro ao redefinir senha. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <div className="reset-password-container">

<div className="reset-password-box">
        <div className="reset-password-header">
          <h1>Redefinir Senha</h1>
          <p>Insira o código enviado para seu e-mail e sua nova senha.</p>
        </div>

        <form className="reset-password-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="code">Código de verificação</label>
            <input
              id="code"
              name="code"
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="123456"
              maxLength="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">Nova senha</label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar nova senha</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              minLength="6"
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
                Processando...
              </>
            ) : (
              'Redefinir Senha'
            )}
          </button>
        </form>
      </div>
    </div>
      
  );
}