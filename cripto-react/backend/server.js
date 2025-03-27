import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar ao MySQL
const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'cripto',
});

console.log('🟢 Conectado ao MySQL!');

// Middleware para aceitar JSON
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.send('🚀 Backend está rodando!');
});

// Pega todos os usuários
app.get('/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error });
  }
});

// Criar um usuário
app.post('/users', async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    await db.query('INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha]);
    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário', error });
  }
});

// Iniciar servidor
app.listen(PORT, () => console.log(`🟢 Servidor rodando na porta ${PORT}`));
