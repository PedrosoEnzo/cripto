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