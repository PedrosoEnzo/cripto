import React, { useState, useEffect } from "react";
import styles from "./ProfileMenu.module.css";
import perfil from "../assets/icons/user.png";
import axios from "axios"; // Biblioteca para requisições HTTP

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null); // Estado para armazenar os dados do usuário

  useEffect(() => {
    // Buscar os dados do usuário do backend ao montar o componente
    const fetchUserData = async () => {
      try {
        const response = await axios.get("https://seu-backend.com/api/user");
        setUserData(response.data); // Atualiza o estado com os dados recebidos
      } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <button onClick={handleClick} className={styles.toggleDropdown}>
        <img
          src={perfil}
          alt="icon perfil"
          className={styles.perfil}
          height="45"
          width="45"
        />
      </button>
      {isOpen && userData && (
        <div className={styles.profileContainer}>
          <h2 className={styles.name}>{userData.name}</h2>
          <p className={styles.bio}>{userData.bio}</p>
          <div className={styles.levelSection}>
            <h3 className={styles.levelTitle}>Nível: {userData.level}</h3>
            <br />
            <a className={styles.btnEdit} href={"/perfil"}>
              editar
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
