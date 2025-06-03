import { useState } from "react";
import NavBar2 from "../components/Navbar2";
import "./NewPassword.module.css";

function newPassword() {
  const [formData, setFormData] = useState({
    novaSenha: "",
    confirmarNovaSenha: "",
  });
  const [mensagem, setMensagem] = useState(null);
  const [erro, setErro] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensagem(null);
    setErro(null);
    setIsLoading(true);

    // Validação básica
    if (formData.novaSenha !== formData.confirmarNovaSenha) {
      setErro("As senhas não coincidem.");
      setIsLoading(false);
      return;
    }

    if (formData.novaSenha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      setIsLoading(false);
      return;
    }

    const token = sessionStorage.getItem("token");

    fetch("http://localhost:5000/redefinirsenha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        novaSenha: formData.novaSenha,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.message || "Erro ao redefinir senha.");
          });
        }
        return res.json();
      })
      .then((data) => {
        setMensagem("Senha alterada com sucesso!");
        setFormData({
          novaSenha: "",
          confirmarNovaSenha: "",
        });
      })
      .catch((error) => {
        console.error(error);
        setErro(error.message || "Erro ao redefinir senha. Tente novamente.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="reset-password-container">
      <NavBar2 />
      <div className="reset-password-box">
        <div className="reset-password-header">
          <h1>Redefinir Senha</h1>
          <p>Digite e confirme sua nova senha</p>
        </div>

        <form onSubmit={handleSubmit} className="reset-password-form">
          {erro && <div className="message error">{erro}</div>}
          {mensagem && <div className="message success">{mensagem}</div>}

          <div className="form-group">
            <label htmlFor="novaSenha">Nova Senha</label>
            <input
              type="password"
              id="novaSenha"
              name="novaSenha"
              value={formData.novaSenha}
              onChange={handleChange}
              required
              minLength="6"
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
              required
              minLength="6"
              placeholder="Confirme sua nova senha"
            />
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Processando...
              </>
            ) : (
              "Redefinir Senha"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default newPassword;