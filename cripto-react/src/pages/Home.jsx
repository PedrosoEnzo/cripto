import React from 'react';
import './Home.css';
import logo from '../assets/logo.png';
import moeda from '../assets/imgMoeda.png';
import instagram from '../assets/icons/instagram.png';
import facebook from '../assets/icons/facebook.png';
import twitter from '../assets/icons/twitter.png';

export default function Home() {
  return (
    <>
      <header>
        <a href="/"><img src={logo} alt="logo" className="logo" height="70px" width="110px" /></a>
        <nav>
          <a href="/chainxEduc" className="nav">ChainXEducation</a>
          <a href="/about" className="nav">Sobre</a>
          <a href="/login" className="nav">Entrar</a>
          <a href="/cadastro"><button className="cadastro">Cadastre-se</button></a>
        </nav>
      </header>

      {/* Seção Navbar + Moeda */}
      <div className="section-navbar-img">
        <div className="content">
          <h1>Simule, aprenda, <br /> invista no seu futuro!</h1>
          <p>Se prepare para o futuro agora!</p>
        </div>
        <img src={moeda} alt="imgmoeda" className="moeda-image" />
      </div>

      {/* Seção Frase Inspiradora */}
      <div className="frase">
        <h2>" O verdadeiro investidor não é aquele<br /> que tenta prever o futuro, mas aquele<br /> que se prepara para ele. "</h2>
        <p>- Benjamin Graham -</p>
      </div>

      <footer>
        <div className="footerInfo">
          <div className="footerLink">
            <a href="/chainxEduc">Chain Education</a>
            <a href="/about">Sobre nós</a>
            <a href="#">Suporte</a>
          </div>

          <div className="redesSociais">
            <a href="#"><img src={instagram} alt="Instagram" /></a>
            <a href="#"><img src={facebook} alt="Facebook" /></a>
            <a href="#"><img src={twitter} alt="Twitter" /></a>
          </div>
        </div>

        <div className="copy">
          <p>&copy; Todos os direitos reservados a ChainX 2025</p>
        </div>
      </footer>
    </>
  );
}
