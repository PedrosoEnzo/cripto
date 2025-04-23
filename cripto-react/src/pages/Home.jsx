import React from 'react';
import './Home.css';
<<<<<<< HEAD
//import moeda from './assets/moeda.svg';
//import aulas from './assets/icons/aulas.svg';
//import cursos from '/assets/icons/cursos.svg';
//import simulador from '..//assets/icons/simulador.svg';

const Card = ({ image, alt, text, className }) => (
  <div className="card">
    <img src={image} alt={alt} className={className} />
    <p dangerouslySetInnerHTML={{ __html: text }} />  
  </div>
);
=======
import logo from '../assets/logo.png';
import moeda from '../assets/imgMoeda.png';
import aulas from '../assets/aulas.png';
import cursos from '../assets/cursos.png';
import simulacoes from '../assets/simulacoes.png';
import instagram from '../assets/instagram.png';
import facebook from '../assets/facebook.png';
import twitter from '../assets/twitter.png';
>>>>>>> e602a494093978c84f4698492500088e8f2db194

export default function Home() {
  return (
    <>
      <main className="container">
        <section className="intro">
          <div className="content">
            <h1>Simule, aprenda, <br /> invista no seu futuro!</h1>
            <p>Se prepare para o futuro agora!</p>
          </div>
          <img src={moeda} alt="Imagem de moeda" className="moeda" />
        </section>

<<<<<<< HEAD
        <section className="frase">
          <h2>
            " O verdadeiro investidor não é aquele <br />
            que tenta prever o futuro, mas aquele <br />
            que se prepara para ele. "
          </h2>
          <p>- Benjamin Graham -</p>
        </section>

        <section className="container-card">
          <h1>
            A <span className="highlight">ChainX</span> é uma plataforma de <span className="highlight">educação<br /> financeira</span>
            onde você tem acesso a:
          </h1>
          <div className="cards">
            <Card
              image={aulas}
              alt="Ícone de aulas"
              className="aulas"
              text={`Aulas para você<br/> começar a investir e<br/> cuidar do seu dinheiro.`}
            />
            <Card
              image={cursos}
              alt="Ícone de cursos"
              className="cursos"
              text={`Cursos para você<br/> organizar suas<br/> finanças.`}
            />
            <Card
              image={simulador}
              alt="Ícone de simulador"
              className="simulador"
              text={`Simulador de<br/> investimentos para<br/> você aprender na<br/> prática.`}
            />
          </div>
        </section>

        <section className="simulador">
          {/* Futuro conteúdo do simulador */}
        </section>
      </main>
=======
<>

  {/* <Navbar /> */}
      <header>
        <a href="/"><img src={logo} alt="logo" className="logo" height="70px" width="110px" /></a>
        <nav>
          <a href="/chainxEduc" className="nav">ChainXEducation</a>
          <a href="/about" className="nav">Sobre</a>
          <a href="/login" className="nav">Entrar</a>
          <a href="/cadastro"><button className="cadastro">Cadastre-se</button></a>
        </nav>
      </header>

      <div className="container">
        <div className="content">
          <h1>Simule, aprenda, <br /> invista no seu futuro!</h1>
          <p>Se prepare para o futuro agora!</p>
        </div>
        <img src={moeda} alt="imgmoeda" className="moeda-image" />
      </div>

      <div className="frase">
        <h2>" O verdadeiro investidor não é aquele<br /> que tenta prever o futuro, mas aquele<br /> que se prepara para ele. "</h2>
        <p>- Benjamin Graham -</p>
      </div>

      <section className="container-card">
        <h1>A <span className="highlight">ChainX</span> é uma plataforma de <span className="highlight">educação<br /> financeira</span> onde você tem acesso a:</h1>
        <div className="cards">
          <div className="card">
            <img src={aulas} alt="Ícone de aulas" />
            <p>Aulas para você<br /> começar a investir e<br /> cuidar do seu dinheiro.</p>
          </div>
          <div className="card">
            <img src={cursos} alt="Ícone de cursos" className="cursos" />
            <p>Cursos para você<br /> organizar suas<br /> finanças.</p>
          </div>
          <div className="card">
            <img src={simulacoes} alt="Ícone de simulação" />
            <p>Simule o quanto você<br /> ganharia com seus<br /> investimentos.</p>
          </div>
        </div>
      </section>

      <section className="simulador"></section>

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
>>>>>>> e602a494093978c84f4698492500088e8f2db194
    </>
  );
}
