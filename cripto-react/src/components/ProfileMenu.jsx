import React, { useState, useEffect } from "react";
import styles from "./ProfileMenu.module.css";
import perfil from "../assets/icons/user.png";
import axios from "axios"; // Biblioteca para requisições HTTP

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null); // Estado para armazenar os dados do usuário
  const [usuario, setUsuario] = useState(null);
  const userLevel = "Intermediário"; // Você pode deixar fixo ou gerar baseado em algum dado depois

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

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/perfil", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Erro HTTP! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => setUsuario(data))
        .catch((error) => {
          console.error("Erro ao buscar perfil:", error);
          setUsuario({ erro: "Erro ao carregar dados." });
        });
    }
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
      {isOpen && (
        <div className={styles.profileContainer}>
          {userData ? (
            <>
              <h2 className={styles.name}>{userData.name}</h2>
              <p className={styles.bio}>{userData.bio}</p>
              <div className={styles.levelSection}>
                <h3 className={styles.levelTitle}>Nível: {userData.level}</h3>
                <br />
                <a className={styles.btnEdit} href={"/perfil"}>
                  Editar
                </a>
              </div>
            </>
          ) : (
            <p>Carregando dados do usuário...</p>
          )}

          {usuario ? (
            usuario.erro ? (
              <p>{usuario.erro}</p>
            ) : (
              <>
                <h2 className={styles.name}>{usuario.nome}</h2>
                <p className={styles.bio}>Bem-vindo(a), {usuario.nome}!</p>

                <div className={styles.levelSection}>
                  <h3 className={styles.levelTitle}>Nível: {userLevel}</h3>
                  <br />
                  <a className={styles.btnEdit} href={"/perfil"}>
                    Editar Perfil
                  </a>
                </div>
              </>
            )
          ) : (
            <p>Carregando perfil...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;

