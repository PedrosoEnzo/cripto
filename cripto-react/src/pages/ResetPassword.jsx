import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css';

export function ResetPassword() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Pega o código salvo no localStorage (enviado por email)
    const storedCode = localStorage.getItem('resetCode');

    // Verifica se o código digitado é igual ao armazenado
    if (code === storedCode) {
      // Código correto → redireciona para /perfil
      navigate('/perfil');
    } else {
      // Código errado → mostra erro
      setError('Código inválido!');
    }

    setIsLoading(false);
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h1>Redefinir Senha</h1>
        <p>Digite o código enviado para seu e-mail:</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Código de 6 dígitos"
            maxLength="6"
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Verificando...' : 'Confirmar'}
          </button>
        </form>
      </div>
    </div>
  );
}