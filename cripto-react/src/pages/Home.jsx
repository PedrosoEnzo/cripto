import React from 'react';
import './Home.css';
import moeda from '../assets/moeda.png';

export default function Home() {
  return ( <>
     <div class="container">
    <div>
      <div class="content">
        <h1>Simule, aprenda, <br /> invista no seu futuro!</h1>
        <p>Se prepare para o futuro agora!</p>
      </div>
    </div>
    <Image src={moeda} alt="Imagem de moeda" className="moeda" />
  </div>

  <div class="frase">
    <h2> " O verdadeiro investidor não é aquele<br /> que tenta prever o futuro, mas aquele<br /> que se prepara para
      ele. "</h2>
    <p>- Benjamin Graham -</p>
  </div>

  <section class="container-card">
    <h1>A <span class="highlight">ChainX</span> é uma plataforma de <span class="highlight">educação<br/> financeira</span>
      onde você tem acesso a:</h1>
    <div class="cards">
      <div class="card">
        <Image src={aulas} alt="Ícone de aulas" className="aulas" />
        <p>Aulas para você<br/> começar a investir e<br/> cuidar do seu dinheiro.</p>
      </div>
      <div class="card">
      <Image src={cursos} alt="Ícone de cursos" className="cursos" />
        <p>Cursos para você<br/> organizar suas<br/> finanças.</p>
      </div>
      <div class="card">
      <Image src={simulador} alt="Ícone de simulador" className="simulador" />
        <p>Simulador de<br/> investimentos para<br/> você aprender na<br/> prática.</p>

      </div>
    </div>
  </section>

  <section class="simulador">
  </section>

  
  </>

  );
}
