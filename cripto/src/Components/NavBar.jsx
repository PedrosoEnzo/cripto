import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import ImagemLogo from "../assets/logo.png";

const Navbar = () => {
  return (
    <header>
      <nav className="navbar">
        <div className="navbar-logo">
          <img
            src={ImagemLogo}
            alt="Imagem da nossa logo em formatos de losangos"
            width={100}
            className="imgLogo"
          />
        </div>
        <div className="navbar-links">
          <Link to="/ChainEducation" className="Link">ChainEducation</Link>
          <Link to="/login" className="Link">Entrar</Link>
          <Link to="/About" className="Link">Sobre</Link>
        </div>
        <div className="navbar-button">
  <Link to="/cadastro" className="buttonGradient">Cadastre-se</Link> {/* Garante que o caminho está correto */}
</div>

      </nav>
    </header>
  );
};

export default Navbar;