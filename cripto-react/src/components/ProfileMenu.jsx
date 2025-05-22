import React, { useEffect, useState } from 'react';
import styles from './ProfileMenu.module.css';
import perfil from "../assets/icons/user.png";

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [usuario, setUsuario] = useState(null);

  const userLevel = "Intermediário"; // Você pode deixar fixo ou gerar baseado em algum dado depois

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

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
                  <a className={styles.btnEdit} href={"/perfil"}>Editar Perfil</a>
                </div>
              </>
            )
          ) : (
            <p>Carregando...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
