import React, { useState } from 'react';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userLevel = "Intermediário";

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.dropdownHeader} onClick={toggleDropdown}>
      <h2 className={styles.name}>Perfil</h2>
        <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div className={styles.profileContainer}>
                  <h2 className={styles.name}>Cassia Pedrosa</h2>
          <p className={styles.email}>caca_jobs@gmail.com</p>
          <p className={styles.bio}>Apaixonado por tecnologia e investimentos.</p>
          <div className={styles.levelSection}>
            <h3 className={styles.levelTitle}>Nível: {userLevel}</h3>
            <button>editar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

