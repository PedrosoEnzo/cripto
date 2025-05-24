import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import logo from '../assets/icons/logo.png';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    if (!email || !senha) {
      setMessage({ text: "Preencha todos os campos", type: "error" });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        senha,
      });

      // Armazena o token na sessão
      sessionStorage.setItem("token", response.data.token);

      setMessage({ text: "Login realizado com sucesso!", type: "success" });

      // Se a função onLogin foi passada como prop, chama ela
      if (typeof onLogin === "function") {
        onLogin();
      }

      // Navega para a página do curso após meio segundo
      setTimeout(() => {
        navigate("/curso");
      }, 500);
    } catch (error) {
      let errorMessage = "Erro ao fazer login";

      if (error.response && error.response.data) {
        errorMessage = error.response.data.alert || errorMessage;
      }

      setMessage({ text: errorMessage, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

 return (
    <div className="tudo">
      <div className="background-blur-effect" />
      <div className="voltarHome">
        <a href="/"><img src={logo} alt="Logo Chain-X" /></a>
      </div>
      <div className="box">
        <form onSubmit={handleSubmit} className="form">
          <div className="paragrafo">
            <h2>Bem-vindo de volta!</h2>
            <br />
            <h4>Entre com seu e-mail e senha para acessar sua conta.</h4>
          </div>

          <div className="campos">
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
              disabled={isLoading}
            />
          </div>

          <div>
            <input
              placeholder="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="input"
              disabled={isLoading}
            />
          </div>

          <p>Esqueceu a senha? <a href="/forgotPassword">Redefinir</a></p>
          <br />

          <button id="button" type="submit" disabled={isLoading}>
            {isLoading ? "Carregando..." : "Entrar"}
          </button>

          <p>Não tem conta? <a href="/cadastro">Cadastre-se</a></p>

          {message.text && (
            <p
              style={{
                color: message.type === "error" ? "red" : "green",
                marginTop: "15px",
              }}
            >
              {message.text}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
