import React from "react";
import "./style.css"; 
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
    <header> 
      <img src="" alt="" />
      <div className="navbar">
       
        <Link to="/login" className="link">
          Pagina de login 
        </Link>
        <Link to="About" />
        <button className="buttonGradient">Cadastre-se
        <Link to="/Cadastro" />
        </button>
      </div>
    </header>
    </>
  );
};

export default Navbar;
