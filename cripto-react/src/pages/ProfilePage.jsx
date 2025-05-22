import { useEffect, useState } from "react";
import styles from "./ProfilePage.module.css";

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
  });

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
      .then((data) => {
        setUsuario(data);
        setFormData({ nome: data.nome, email: data.email });
      })
      .catch((error) => {
        console.error("Erro ao buscar perfil:", error);
        setUsuario({ erro: "Não foi possível carregar os dados." });
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const token = sessionStorage.getItem("token");

    fetch("http://localhost:5000/atualizarperfil", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao atualizar perfil.");
        }
        return res.json();
      })
      .then((data) => {
        setUsuario(data);
        setEditMode(false);
        
      })
      .catch((error) => {
        console.error(error);
        
      });
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <h1 className={styles.title}>Perfil do Usuário</h1>
        {usuario ? (
          usuario.erro ? (
            <p>{usuario.erro}</p>
          ) : (
            <>
              {editMode ? (
                <>
                  <label>
                    <strong>Nome:</strong>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </label>
                  <label>
                    <strong>Email:</strong>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </label>

                  <div className={styles.buttonGroup}>
                    <button
                      className={`${styles.button} ${styles.saveButton}`}
                      onClick={handleSave}
                    >
                      Salvar
                    </button>
                    <button
                      className={`${styles.button} ${styles.cancelButton}`}
                      onClick={() => setEditMode(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className={styles.name}>
                    <strong>Nome:</strong> {usuario.nome}
                  </p>
                  <p className={styles.bio}>
                    <strong>Email:</strong> {usuario.email}
                  </p>

                  <div className={styles.buttonGroup}>
                    <button
                      className={`${styles.button} ${styles.editButton}`}
                      onClick={() => setEditMode(true)}
                    >
                      Editar
                    </button>
                    <button
                      className={`${styles.button} ${styles.cancelButton}`}
                      onClick={handleLogout}
                    >
                      Sair
                    </button>
                  </div>
                </>
              )}
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
