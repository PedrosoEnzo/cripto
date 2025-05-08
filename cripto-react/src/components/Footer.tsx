import React from "react";

import "./Footer.css";
import instagram from "../assets/icons/instagram.png";
import facebook from "../assets/icons/facebook.png";
import twitter from "../assets/icons/twitter.png";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footerInfo">
          <img className="logo" src={logo} alt="Logo" width={90}></img>
          <div className="detalhes">
            <a href="/about">Sobre</a>
            <a href="/perfil">Perfil</a>
            <a href="/simulador">Simulador</a>
            <a href="/curso">ChainX Education</a>
          </div>

          <hr />

          <div className="redesSociais">
            <a href="#">
              <img src={instagram} alt="Instagram" width={30} />
            </a>
            <a href="#">
              <img src={facebook} alt="Facebook" width={30} />
            </a>
            <a href="#">
              <img src={twitter} alt="Twitter" width={30} />
            </a>
          </div>
        </div>

        <div className="copy">
          <p className="copyT">
            &copy; Todos os direitos reservados a ChainX 2025
          </p>
        </div>
      </div>
    </>
  );
}
