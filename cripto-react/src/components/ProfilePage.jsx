import React from 'react';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
    const userLevel = "Intermediário";
  
    return (


      <div className={styles.container}>
        <div className={styles.profileContainer}>
          <h1 className={styles.name}>João Silva</h1>
          <p className={styles.bio}>
            Apaixonado por tecnologia e investimentos.
          </p>
  
          <div className={styles.levelSection}>
            <h2 className={styles.levelTitle}>Nível: {userLevel}</h2>
          </div>

        </div>
      </div>

    );
  };

export default ProfilePage;
