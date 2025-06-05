import React from "react";
import "./Footer.css";
import instagram from "../assets/icons/instagram.png";
import discord from "../assets/icons/discord.png";
import twitter from "../assets/icons/twitter.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerContent">
        <div className="footerBrand">
          <h2>ChainX</h2>
          <p className="tagline">Educação financeira acessível e descomplicada para todos.</p>
          <div className="contact">
            <p><strong>Email:</strong> chainx.suporte@gmail.com</p>
            <p><strong>WhatsApp:</strong> (11) 91234-5678</p>
            <p><strong>CNPJ:</strong> 12.006.665/0002-72</p>
          </div>
        </div>

        <div className="footerSocial">
          <h3>Redes Sociais</h3>
          <div className="socialIcons">
            <a href="https://www.instagram.com/direct/t/100932788088526/"><img src={instagram} alt="Instagram" /></a>
            <a href="#"><img src={discord} alt="Discord" /></a>
            <a href="#"><img src={twitter} alt="Twitter" /></a>
          </div>
        </div>
      </div>

      <div className="footerBottom">
        <p>&copy; 2025 ChainX. Todos os direitos reservados.</p>
        <a href="/Privacidade">Termos e Política de Privacidade</a>
      </div>
    </footer>
  );
}
