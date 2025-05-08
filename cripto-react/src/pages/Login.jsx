import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        senha,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage("Erro ao fazer login");
    }
  };

  return (
    <div className="tudo">
      <div className="box">
        <form onSubmit={handleSubmit}>
          <div className="paragrafo">
            <h2>Bem-vindo de volta!</h2>
            <h4>Entre com seu e-mail e senha para acessar sua conta.</h4>
          </div>
          <div>
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              placeholder="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button id="button" type="submit">
            Entrar
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Login;
