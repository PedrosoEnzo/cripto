import './Navbar.css';
import React from 'react';
import logo from './logo.png';

 return Navbar () [
    <div className="App">
    <header className="App-header">
      <img src={logo} alt="Minha Logo" style={{ width: '150px', height: 'auto' }} />
      <h1>Bem-vindo ao Meu Projeto React!</h1>
    </header>
  </div>
 ]

import React, { useState } from "react";

const Header = () => {
  return (
    <header>
      <div className="navbar">
         <h1>ChainX</h1>
         <ul className="nav-links">
          <li><a href="#">ChainEduc</a></li>
          <li><a href="#">Sobre</a></li>
          <li><a href="Entrar"></a></li>
         </ul>
      </div>
    </header>
  );
};

export default Header;
// <button className="button-cadastro"><Link>Cadastre-se</Link></button>
