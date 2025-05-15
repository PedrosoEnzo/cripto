import React, { useState } from 'react';
import styles from './ProfileMenu.module.css';

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userLevel = "Intermediário";

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <button onClick={handleClick} className={styles.toggleDropdown}>Perfil</button>
      {isOpen && (
        <div className={styles.profileContainer}>
          <h2 className={styles.name}>Cassia Pedrosa</h2>
          <p className={styles.bio}>Apaixonado por tecnologia e investimentos.</p>
          <div className={styles.levelSection}>
            <h3 className={styles.levelTitle}>Nível: {userLevel}</h3>
            <br />
            <button classname={styles.btnEdit}>editar</button>
          </div>
        </div>
      )}
    </div >
  );
};

export default ProfileMenu;

