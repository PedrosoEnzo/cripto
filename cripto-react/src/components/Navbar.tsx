import React from "react";
import styles from "./Navbar.module.css";
import logo from "../assets/logo.png"; // Certifique-se de que esse caminho está certo

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <a href="/">
        <img
          src={logo}
          alt="logo"
          className={styles.logo}
          height="70"
          width="110"
        />
      </a>
      <nav className={styles.navLinks}>
        <a href="/curso" className={styles.nav}>
          ChainXEducation
        </a>
        <a href="/about" className={styles.nav}>
          Sobre
        </a>
        <a href="/login" className={styles.nav}>
          Entrar
        </a>
        <a href="/cadastro">
          <button className={styles.cadastroButton}>Cadastre-se</button>
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
