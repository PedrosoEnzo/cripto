import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importe o useNavigate
import "./NewPassword.module.css";

function NewPassword() {
  const [formData, setFormData] = useState({
    novaSenha: "",
    confirmarNovaSenha: "",
  });
  const [mensagem, setMensagem] = useState(null);
  const navigate = useNavigate(); // Inicialize o hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensagem("Senha redefinida com sucesso!");
    
    // Redireciona após 2 segundos (2000 milissegundos)
    setTimeout(() => {
      navigate("/login"); // Redireciona para a rota de login
    }, 2000);
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <div className="reset-password-header">
          <h1>Redefinir Senha</h1>
          <p>Digite e confirme sua nova senha</p>
        </div>

        <form onSubmit={handleSubmit} className="reset-password-form">
          {mensagem && <div className="message success">{mensagem}</div>}

          <div className="form-group">
            <label htmlFor="novaSenha">Nova Senha</label>
            <input
              type="password"
              id="novaSenha"
              name="novaSenha"
              value={formData.novaSenha}
              onChange={handleChange}
              placeholder="Digite sua nova senha"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmarNovaSenha">Confirmar Nova Senha</label>
            <input
              type="password"
              id="confirmarNovaSenha"
              name="confirmarNovaSenha"
              value={formData.confirmarNovaSenha}
              onChange={handleChange}
              placeholder="Confirme sua nova senha"
            />
          </div>

          <button
            type="submit"
            className="submit-button"
          >
            Redefinir Senha
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewPassword;