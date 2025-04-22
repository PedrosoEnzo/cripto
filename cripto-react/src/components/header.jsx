import React from "react";
//import "./Header.css";

const Header = () => {
  return (
    <nav className="header">
      <div className="logo">ChainXEducation</div>
      <ul className="nav-links">
        <li><a href="#">Sobre</a></li>
        <li><a href="#">Entrar</a></li>
        <li><a href="#">Cadastre-se</a></li>
      </ul>
    </nav>
  );
};

export default Header;
