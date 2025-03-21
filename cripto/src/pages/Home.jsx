import React from "react";
import Footer from "../Components/Footer";
import imagemMoeda from "../assets/imagemMoeda.png";
import Cadastro from "./cadastro";
import Navbar from "../Components/NavBar";
import "./Home.css";


function Home() {
  return (
    <>

      <Navbar />
      <div className="container">
        <div className="all-texto-inicial">
          <h1>
            Simule, aprenda e invista
            <br /> no seu futuro!
          </h1>
        </div>
        <div className="imgMoeda">
          <img src={imagemMoeda} alt="Imagem de uma moeda de Bitcoin rosa" />
        </div>
        <div className="frase">
          <h3>
            " O verdadeiro investidor não é aquele <br /> que tenta prever o
            futuro, mas aquele
            <br /> que se prepara para ele. " <br/><br/>
            - Benjamin Graham -
          </h3>
        </div>
      </div>
      <Cadastro />
      <Footer />
    </>
  );
}

export default Home;