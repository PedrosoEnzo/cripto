import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" }); // type: "success" ou "error"
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    // Validação básica
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

      // Armazena o token no sessionStorage
      sessionStorage.setItem("token", response.data.token);
      
      // Redireciona para a página de curso após 1 segundo
      setMessage({ 
        text: "Login realizado com sucesso!", 
        type: "success" 
      });
      
      setTimeout(() => {
        navigate("/curso");
      }, 1000);

    } catch (error) {
      let errorMessage = "Erro ao fazer login";
      
      if (error.response) {
        // Se o backend retornar uma mensagem de erro
        errorMessage = error.response.data.alert || errorMessage;
      }
      
      setMessage({ 
        text: errorMessage, 
        type: "error" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="tudo">
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

          <p>
            Esqueceu a senha? <a href="/forgotPassword">Redefinir</a>
          </p>
          
          <button 
            id="button" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Carregando..." : "Entrar"}
          </button>
  
        </form>
        
        {message.text && (
          <p style={{ 
            color: message.type === "error" ? "red" : "green",
            textAlign: "center",
            marginTop: "15px" 
          }}>
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;