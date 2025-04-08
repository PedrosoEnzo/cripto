import React, { useState } from "react";
import axios from "axios";
import "./cadastro.css";
import Header from "../components/header-cad";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmsenha, setConfirmsenha] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/cadastro", {
        nome,
        email,
        senha,
        confirmsenha,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage("Erro ao cadastrar usuário");
    }
  };

  return (
    <div className="tudo">
      <Header />
      <div className="box">
        <form onSubmit={handleSubmit}>
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
          <div>
            <input
              placeholder="Senha:"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              placeholder="Confirmar Senha:"
              type="password"
              value={confirmsenha}
              onChange={(e) => setConfirmsenha(e.target.value)}
              required
            />
          </div>
          <p>
            Já possui uma conta? <a href="/login">Entrar</a>
          </p>
          <button type="submit">Cadastrar</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Cadastro;
