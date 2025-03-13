import React from "react";
import "./style.css"; 
import { Link } from "react-router-dom";
import ImagemLogo from "../assets/logo.png";

const Navbar = () => {
  return (
    <>
    <header> 
      
      <div className="navbar">
      <img src={ImagemLogo} alt="Imagem da nossa logo em formatos de losangos" width={100}  className="imgLogo"/>
        <Link to="/ChainEducation" className="Link">
          ChainEducation
        </Link>
        <Link to="/login" className="Link">
          Login 
        </Link>
        <Link to="About" className="Link">
          About
        </Link>
        <button className="buttonGradient">Cadastre-se
        <Link to="/Cadastro"/>
        </button>
      </div>
    </header>
    </>
  );
};

export default Navbar;
