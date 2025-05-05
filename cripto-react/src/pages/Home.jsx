import React from 'react';

import './Home.css';
import logo from '../assets/logo.png';
import moeda from '../assets/imgMoeda.png';
import cursos from '../assets/cursos.png';
import instagram from '../assets/icons/instagram.png';
import facebook from '../assets/icons/facebook.png';
import twitter from '../assets/icons/twitter.png';
import simulador2 from '../assets/simulador2.png';

export default function Home() {
  return (
    <>
      <header>
        <a href="/">
          <img src={logo} alt="logo" className="logo" height="70px" width="110px" />
        </a>
        <nav>
          <a href="/curso" className="nav">ChainXEducation</a>
          <a href="/about" className="nav">Sobre</a>
          <a href="/login" className="nav">Entrar</a>
          <a href="/cadastro">
            <button className="cadastroButton">Cadastre-se</button>
          </a>
        </nav>
      </header>
      <div className="navbar-img-moeda">
        <div className="content">
          <h1 className="text">Simule, Aprenda, <br /> Invista no seu futuro!</h1>
          <p>Se prepare para o futuro agora!</p>
        </div>
        <img src={moeda} alt="imgmoeda" className="moeda-image" />
      </div>

      <div className="frase">
        <h2>" O verdadeiro investidor não é aquele<br /> que tenta prever o futuro, mas aquele<br /> que se prepara para ele. "</h2>
        <p>- Benjamin Graham -</p>
      </div>

      <div className='plataformaCursos'>
        <h2>A ChainX é uma plataforma de
          <span className='highlight'> educação <br />
            financeira </span>onde você tem acesso a:</h2>
        <div className='plataformaCursosContent'>
          <div className='plataformaCursosCard'>
            <div className='plataformaCursosCardIcon'>
              <img src={cursos} alt="cursos" />
              <br />
              <h3>Simulador de Investimentos</h3>
              <p>Aprenda a investir com segurança e confiança.</p>
            </div>
          </div>
          <div className='plataformaCursosCard'>
            <div className='plataformaCursosCardIcon'>
              <img src={cursos} alt="cursos" />
              <h3>Conteúdo Exclusivo</h3><br />
              <p>Acesse cursos e materiais de alta qualidade.</p>
            </div>
          </div>
          <div className='plataformaCursosCard'>
            <div className='plataformaCursosCardIcon'>
              <img src={cursos} alt="cursos" />
              <h3>Comunidade Ativa</h3>
              <br />
              <p>Participe de discussões e trocas de experiências.</p>
            </div>
          </div>
        </div>
      </div>

      <div className='simulador'>
        <img src={simulador2} alt="simulador" className='simuladorImage' />

        <div className="simuladorTexto">
          <h2>
            Simulador de <br />
            <span className='hightLight'>Investimentos</span>
          </h2>
          <p>Aprenda a investir com segurança e confiança.</p>
          <a href="/simulador">
            <button className='simuladorButton'>Acessar</button>
          </a>
        </div>
      </div>



      <footer>
        <div className="footerInfo">
          <div className="footerLink">
            <a href="/curso">Chain Education</a>
            <a href="/About">Sobre nós</a>
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
