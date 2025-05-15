import React, { useState, useEffect } from 'react';

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
    bio: perfil.bio // Removendo userLevel do formData inicial
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
    // Garante que o formData esteja atualizado com os valores atuais do perfil ao editar
    setFormData({
      nome: perfil.nome,
      email: perfil.email,
      bio: perfil.bio
    });
  };

  const handleSalvar = () => {
    const { nome, email, bio } = formData;
    setPerfil({ ...perfil, nome, email, bio }); // Mantém o userLevel original
    setEditando(false);
    alert('Perfil atualizado com sucesso!');
  };

  const handleCancelar = () => {
    setEditando(false);
  };

  const handleTrocarSenha = () => {
    alert('Funcionalidade de troca de senha ainda não implementada.');
    // Aqui você implementaria a lógica para redirecionar para a página de troca de senha
  };

  return (
    <div>
      <h1>Página de Perfil</h1>

      {!editando ? (
        <div>
          <p><strong>Nome:</strong> {perfil.nome}</p>
          <p><strong>Email:</strong> {perfil.email}</p>
          <p><strong>Bio:</strong> {perfil.bio}</p>
          <p><strong>Nível de Usuário:</strong> {perfil.userLevel}</p>
          <button onClick={handleEditar}>Editar Perfil</button>
          <a href="/ForgotPassword" onClick={handleTrocarSenha}>
            Trocar Senha
          </a>
        </div>
      ) : (
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>
          {/* O userLevel não é mais um campo de edição */}
          <p><strong>Nível de Usuário:</strong> {perfil.userLevel}</p>
          <button type="button" onClick={handleSalvar}>Salvar</button>
          <button type="button" onClick={handleCancelar}>Cancelar</button>
        </form>
      )}
    </div>
  );
}

export default Perfil;