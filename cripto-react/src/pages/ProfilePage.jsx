import { useEffect, useState } from "react";
import styles from "./ProfilePage.module.css";

function Perfil() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

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
        setUsuario({ erro: "Não foi possível carregar os dados." });
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <h1 className={styles.title}>Perfil do Usuário</h1>
        {usuario ? (
          usuario.erro ? (
            <p>{usuario.erro}</p>
          ) : (
            <>
              <p className={styles.name}>
                <strong>Nome:</strong> {usuario.nome}
              </p>
              <p className={styles.bio}>
                <strong>Email:</strong> {usuario.email}
              </p>

              <div className={styles.buttonGroup}>
                <a
                  href="/"
                  className={`${styles.button} ${styles.cancelButton}`}
                  onClick={() => {
                    sessionStorage.removeItem("token");
                  }}
                >
                  Sair
                </a>
              </div>
            </>
          )
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
  );
}

export default Perfil;
