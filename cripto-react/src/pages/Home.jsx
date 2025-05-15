import React from 'react';

import './Home.css';
import logo from '../assets/logo.png';
import moeda from '../assets/imgMoeda.png';
import cursos from '../assets/cursos.png';
import cursos1 from '../assets/cursos1.png';
import cursos2 from '../assets/cursos2.png';
import simulador2 from '../assets/mascote/ZynxSimulador.png';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';

export default function Home() {
  return (
    <>
      <Navbar2 />

      {/* Seção Moeda e Título */}
      <div className="navbar-img-moeda">
        <div className="content">
          <h1 className="text">Simule, Aprenda, <br />Invista no seu futuro!</h1>
          <p>Se prepare para o futuro agora!</p>
        </div>
        <img src={moeda} alt="imgmoeda" className="moeda-image" />
      </div>

      {/* Frase Inspiradora */}
      <div className="frase">
        <h2>
          " O verdadeiro investidor não é aquele<br />
          que tenta prever o futuro, mas aquele<br />
          que se prepara para ele. "
        </h2>
        <p>- Benjamin Graham -</p>
      </div>

      {/* Seção Plataforma de Cursos */}
      <div className="plataformaCursos">
        <h2>
          A ChainX é uma plataforma de
          <span className="highlight"> educação <br /> financeira </span>
          onde você tem acesso a:
        </h2>

        <div className="plataformaCursosContent">
          {/* Card 1 */}
          <div className="plataformaCursosCard">
            <div className="plataformaCursosCardIcon">
              <img src={cursos1} alt="Simulador de Investimentos" />
              <h3>Simulador de Investimentos</h3>
              <p>Aprenda a investir com segurança e confiança.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="plataformaCursosCard">
            <div className="plataformaCursosCardIcon">
              <img src={cursos} alt="Conteúdo Exclusivo" />
              <h3>Conteúdo Exclusivo</h3>
              <p>Acesse cursos e materiais de alta qualidade.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="plataformaCursosCard">
            <div className="plataformaCursosCardIcon">
              <img src={cursos2} alt="Comunidade Ativa" />
              <h3>Comunidade Ativa</h3>
              <p>Participe de discussões e trocas de experiências.</p>
            </div>
          </div>
        </div>
      </div>
      

      {/* Seção Simulador */}
      <div className="simulador">
        <img src={simulador2} alt="Simulador" className="simuladorImage" />
        <div className="simuladorTexto">
          <h2>
            Simulador de <br />
            <span className="hightLight">Investimentos</span>
          </h2>
          <p>Aprenda a investir com segurança e confiança.</p>
          <a href="/simulador">
            <button className="simuladorButton">Acessar</button>
          </a>
        </div>
      </div>

      {/* Rodapé */}
      <Footer />
    </>
  );
}
