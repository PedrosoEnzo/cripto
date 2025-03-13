import React from "react";
import "./style.css"; 
import { Link } from "react-router-dom";
// VERIFICAR !!! import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <>
    <header> 
      <img src="" alt="" />
      <div className="navbar">

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
