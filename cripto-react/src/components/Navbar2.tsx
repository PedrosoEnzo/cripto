import React, { Profiler } from "react";
import styles from "./Navbar2.module.css";
// Importando o CSS para estilização
import logo from "../assets/logo.png"; // Certifique-se de que esse caminho está certo
import ProfileMenu from "./ProfileMenu";

const Navbar2 = () => {
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
        <a className={styles.nav}>
          <ProfileMenu/>
        </a>
      </nav>
    </header>
  );
};

export default Navbar2;
