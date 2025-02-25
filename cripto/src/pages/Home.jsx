import React from "react";
import "./Home.css"; // Importação do CSS
import imagemFundoTeste from "../assets/imagem-fundo-teste.jpg"; // Caminho correto
import imagemMoeda from "../assets/img-moeda.png";

function Home() {
  return (
    
    <div className="all-texto-inicial">
      <div className="texto-inicial1">  
        <h1>O futuro dos<br /> investimentos é agora!</h1>
      </div>
      <div className="texto-inicial2">Simples, seguro e 100% cripto!</div>

      <div className="imagem-fundo-inicial">

      <div className="logo"></div>

<div className="imgMoeda"></div>

      </div>
    </div>
  );
}

export default Home;
