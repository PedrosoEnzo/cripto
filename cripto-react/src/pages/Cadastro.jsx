import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./cadastro.css";
import logo from "../assets/icons/logo.png";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmsenha, setConfirmsenha] = useState("");
  const [message, setMessage] = useState("");
  const [showPasswords, setShowPasswords] = useState(false); // controla ambos
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== confirmsenha) {
      setError("As senhas não coincidem!");
      return;
    }

    setError("");

    try {
      const response = await axios.post("http://localhost:5000/cadastro", {
        nome,
        email,
        senha,
        confirmsenha,
      });

      setMessage(response.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage("Erro ao cadastrar usuário");
    }
  };

  return (
    <div className="tudo">
      <div className="background-blur-effect" />
      <div className="voltarHome">
        <a href="/">
          <img src={logo} alt="Logo Chain-X" />
        </a>
      </div>
      <div className="box">
        <form onSubmit={handleSubmit}>
          <div className="paragrafo">
            <h2>Bem-vindo!</h2>
            <h4>Crie sua conta.</h4>
          </div>

          <div className="inputs">
            <input
              placeholder="Nome:"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              placeholder="Email:"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Senha com botão visível */}
          <div style={{ position: "relative" }}>
            <input
              placeholder="Senha:"
              type={showPasswords ? "text" : "password"}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              style={{ width: "100%", paddingRight: "40px" }}
            />
            <button
              type="button"
              onClick={() => setShowPasswords(!showPasswords)}
              style={{
                position: "absolute",
                right: "-65px",

                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
                marginTop: "-5px",
                color: "#666",
              }}
              aria-label="Mostrar ou ocultar senha"
            >
              {showPasswords ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirmar senha sem botão */}
          <div>
            <input
              placeholder="Confirmar Senha:"
              type={showPasswords ? "text" : "password"}
              value={confirmsenha}
              onChange={(e) => setConfirmsenha(e.target.value)}
              required
              style={{ width: "100%" }}
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          <p>
            Já possui uma conta? <a href="/login">Entrar</a>
          </p>
          <br />

          <button id="button" type="submit">
            Cadastrar
          </button>
        </form>
        <div className="mensagem-sucesso">{message && <p>{message}</p>}</div>
      </div>
    </div>
  );
};

export default Cadastro;
