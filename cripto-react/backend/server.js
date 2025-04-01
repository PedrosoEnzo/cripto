import express from 'express';
import mysql from 'mysql2';
import bcrypt from 'bcryptjs';
import cors from 'cors';

const app = express();

// Middleware
app.use(express.json()); // Para ler dados em formato JSON
app.use(cors()); // Para permitir solicitações de diferentes origens

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Substitua pelo seu usuário
  password: 'root',  // Substitua pela sua senha
  database: 'cripto' // Nome do banco de dados
});

// Rota de Cadastro
app.post('/cadastro', (req, res) => {
  const { nome, email, senha, datadenascimento } = req.body;

  // Verificar se o email já existe
  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao verificar o email', error: err });
    }
    if (results.length > 0) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Criptografar a senha
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao criptografar a senha', error: err });
      }

      // Inserir novo usuário no banco de dados
      db.query(
        'INSERT INTO usuarios (nome, email, senha, datadenascimento) VALUES (?, ?, ?, ?)',
        [nome, email, hashedPassword, datadenascimento],
        (err, results) => {
          if (err) {
            return res.status(500).json({ message: 'Erro ao cadastrar o usuário', error: err });
          }
          res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
        }
      );
    });
  });
});

// Rota de Login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  // Buscar usuário pelo email
  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao verificar o usuário', error: err });
    }

    if (results.length > 0) {
      // Comparar a senha fornecida com a senha criptografada no banco de dados
      bcrypt.compare(senha, results[0].senha, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ message: 'Erro ao comparar as senhas' });
        }

        if (isMatch) {
          res.status(200).json({ message: 'Login bem-sucedido', user: results[0] });
        } else {
          res.status(401).json({ message: 'Credenciais inválidas' });
        }
      });
    } else {
      res.status(401).json({ message: 'Usuário não encontrado' });
    }
  });
});

// Iniciar o servidor na porta 5000
app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});
