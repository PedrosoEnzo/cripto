import React from 'react';
import './Home.css';
import moeda from '../assets/moeda.png';

export default function Home() {
  return (

    <div className="home">
      <div className="home-conteiner">
        <div className="text1">
      <h1>Simule, aprenda, <br /> invista no seu futuro!</h1>
      <p>!!!!!</p>
        </div>
        <div className="imgMoeda">
          <img src={moeda} alt="Moeda de bitcoin" />
        </div>
      </div>

    </div>
  );
}
