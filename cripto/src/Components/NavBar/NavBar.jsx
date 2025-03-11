import React from "react";
import "./style.css"; 
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
    <header> 
      <img src="" alt="" />
      <div className="navbar">
       
        <h2>Entrar</h2>
        <Link to="/login">
          Pagina de login 
        </Link>
        <h2>Cadastre-se</h2>
      </div>
    </header>
    </>
  );
};

export default Navbar;
