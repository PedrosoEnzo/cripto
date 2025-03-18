import React from "react";
import "./Home.css";
import imagemMoeda from "../assets/imagemMoeda.png";
import "../Components/Footer"



function Home() {
  return (
    <>
      <div className="texto-inicial1">
       <div className="all-texto-inicial">
          <h1>Simule, aprenda e invista<br/> no seu futuro!</h1>
        </div>
        <div className="imgMoeda">
          <img src={imagemMoeda} alt="Imagem de uma moeda de Bitcoin rosa" />
        </div>
        </div>
    </>
  );
}

export default Home;
