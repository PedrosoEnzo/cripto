import React from "react";
import "./Home.css"; // Importação do CSS
import imagemFundoTeste from "../assets/imagem-fundo-teste.jpg"; // Caminho correto
import imagemMoeda from "../assets/img-moeda.png";
import Navbar from "../Components/NavBar";

function Home() {
  return (
    <>
      <Navbar /> 
      <div className="all-texto-inicial">
        <div className="texto-inicial1">  
          <h1>Simule, aprenda e invista<br /> no seu futuro!</h1>
        </div>
        
        <div className="imagem-fundo-inicial">
         
          <div className="imgMoeda"></div>
        </div>
      </div>
    </>
  );
}

export default Home;