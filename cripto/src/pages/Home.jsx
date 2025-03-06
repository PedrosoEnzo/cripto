import React from "react";
import "./Home.css"
import Navbar from "../Components/NavBar/NavBar";
import imagemMoeda from "../assets/imagemMoeda.png"


function Home() {
  return (
    <>
      <Navbar /> 
      <div className="all-texto-inicial">
        <div className="texto-inicial1">  
          <h1>Simule, aprenda e invista<br /> no seu futuro!</h1>
        </div>
        
        <div className="imagem-fundo-inicial">
         
          <div className="imgMoeda">
            <img src={imagemMoeda} alt="Imagem de uma moeda de biticoin rosa" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;