import React, { useState, useEffect } from 'react';
import styles from './ProfilePage.module.css'; // Corrigindo a importação

function Perfil() {
  const LOCAL_STORAGE_KEY = 'perfilUsuario';

  const [perfil, setPerfil] = useState(() => {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return localData ? JSON.parse(localData) : {
      nome: 'João da Silva',
      email: 'joao.silva@email.com',
      bio: 'Um desenvolvedor React apaixonado por tecnologia.',
      userLevel: 'Básico'
    };
  });

  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({
    nome: perfil.nome,
    email: perfil.email,
    bio: perfil.bio
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(perfil));
  }, [perfil]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditar = () => {
    setEditando(true);
    setFormData({
      nome: perfil.nome,
      email: perfil.email,
      bio: perfil.bio
    });
  };

  const handleSalvar = () => {
    const { nome, email, bio } = formData;
    setPerfil({ ...perfil, nome, email, bio });
    setEditando(false);
    alert('Perfil atualizado com sucesso!');
  };

  const handleCancelar = () => {
    setEditando(false);
  };

  const handleTrocarSenha = () => {
    alert('Funcionalidade de troca de senha ainda não implementada.');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Perfil de Usuário</h1>

      {!editando ? (
        <div className={styles.perfilContainer}>
          <p><strong>Nome:</strong> {perfil.nome}</p>
          <p><strong>Email:</strong> {perfil.email}</p>
          <p><strong>Bio:</strong> {perfil.bio}</p>
          <p><strong>Nível de Usuário:</strong> {perfil.userLevel}</p>
          <div className={styles.buttonGroup}>
            <button className={styles.button} onClick={handleEditar}>Editar Perfil</button>
            <a className={styles.link} href="/ForgotPassword" onClick={handleTrocarSenha}>Trocar Senha</a>
          </div>
        </div>
      ) : (
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.formGroup}>
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className={styles.textarea}
            />
          </div>
          <p><strong>Nível de Usuário:</strong> {perfil.userLevel}</p>
          <button type="button" className={styles.button} onClick={handleSalvar}>Salvar</button>
          <button type="button" className={`${styles.button} ${styles.cancelButton}`} onClick={handleCancelar}>Cancelar</button>
        </form>
      )}
    </div>
  );
}

export default Perfil;
