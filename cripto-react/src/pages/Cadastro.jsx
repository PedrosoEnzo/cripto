import React, { useState } from 'react';
import axios from 'axios';
import './cadastro.css'

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [datadenascimento, setDatadenascimento] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/cadastro', {
        nome,
        email,
        senha,
        datadenascimento,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage('Erro ao cadastrar usuário');
    }
  };

  return (
    <div className='tudo'>
      <form onSubmit={handleSubmit}>
        <div className='inputs'>
          <input
            placeholder='Nome:'
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            placeholder='Email:'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            placeholder='Senha:'
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            placeholder='Confirmar Seha:'
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Cadastro;
