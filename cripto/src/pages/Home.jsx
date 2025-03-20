import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faChartLine, faDesktop } from "@fortawesome/free-solid-svg-icons";
import imagemMoeda from "../assets/imagemMoeda.png";
import "./Home.css";

function Home() {
  return (
    <>
      <div className="texto-inicial1">
        <div className="all-texto-inicial">
          <h1>Simule, aprenda e invista<br /> no seu futuro!</h1>
          <h2>Transforme seu conhecimento em resultados reais.</h2>
        </div>
        <div className="imgMoeda">
          <img src={imagemMoeda} alt="Imagem de uma moeda de Bitcoin rosa" />
        </div>
      </div>

      <div className="frase1-container">
        <div className="frase1">
          <h1>" O verdadeiro investidor não é aquele que tenta prever o futuro, mas aquele que se prepara para ele. "</h1>
        </div>
        <div className="fraseAutor">
          <h1>- Benjamin Graham -</h1>
        </div>
      </div>

      <div className="frase2-container">
        <div className="frase2">
          <h1>A ChainX é uma plataforma de <span className="frase2-gradiente">educação financeira</span> onde você tem acesso a:</h1>
        </div>

      </div>

      <div className="container-card">

      <div className="card">
          <div className="icon">
            <FontAwesomeIcon icon={faWallet} size="3x" style={{ color: "#791475" }} />
          </div>
          <p>Aulas para você começar a investir e cuidar do seu dinheiro.</p>
        </div>

        <div className="card">
          <div className="icon">
            <FontAwesomeIcon icon={faChartLine} size="3x" style={{ color: "#791475" }} />
          </div>
          <p>Cursos para você organizar suas finanças.</p>
        </div>

        <div className="card">
          <div className="icon">
            <FontAwesomeIcon icon={faDesktop} size="3x" style={{ color: "#791475" }} />
          </div>
          <p>Simule o quanto você ganharia com seus investimentos.</p>
        </div>

      </div>

    </>
  );
}

export default Home;
