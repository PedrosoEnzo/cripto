import React, { useState } from 'react';
import styles from './ProfilePage.module.css';

function ProfilePage ()  {
  const userName = "Cassia Pedrosa";
  const userBio = "Apaixonado por tecnologia e investimentos.";
  const userEmail = "pedrosaCassia@gmail.com";
  const userLevel = "Intermediário";
  return (
    <div className={styles.container}>
      <h2 className={styles.toggleh2}>Perfil</h2>
      <div className={styles.profileContainer}>
        <h2 className={styles.name}>{userName}</h2>
        <br/>
        <h3 className={styles.name}>{userEmail}</h3>
        <p className={styles.bio}>{userBio}</p>
        <div className={styles.levelSection}>
          <h3 className={styles.levelTitle}>Nível: {userLevel}</h3>
          <br />
          <button classname={styles.btnEdit}>editar</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

