import React from 'react';
import './Home.css';
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
    </>
  );
}
