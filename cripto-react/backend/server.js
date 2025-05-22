import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o banco de dados
const db = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'cripto'
});

console.log('Conectado ao banco de dados MySQL!');

// Chave secreta para JWT
const JWT_SECRET = process.env.JWT_SECRET || 'divandoComAsDivasSupremas!';

// Middleware para verificar token
function verificarToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ alert: 'Token não fornecido' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ alert: 'Token inválido ou expirado' });
    }
    req.user = decoded;
    next();
  });
}

// 🔐 Cadastro
app.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const [result] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (result.length > 0) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    await db.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, hashedPassword]
    );

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
});

// 🔑 Login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [result] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (result.length === 0) {
      return res.status(401).json({ alert: 'Usuário não encontrado' });
    }

    const user = result[0];
    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return res.status(401).json({ alert: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const userData = { id: user.id, nome: user.nome, email: user.email };

    res.status(200).json({
      alert: 'Login bem-sucedido',
      token,
      user: userData
    });
  } catch (error) {
    res.status(500).json({ alert: 'Erro no servidor', error: error.message });
  }
});

// 🔒 Rota protegida - Perfil
app.get('/perfil', verificarToken, async (req, res) => {
  try {
    const [result] = await db.query(
      'SELECT id, nome, email FROM usuarios WHERE id = ?',
      [req.user.id]
    );

    if (result.length === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ erro: 'Erro no servidor', details: error.message });
  }
});

// 🔒 Rota protegida - Curso
app.get('/curso', verificarToken, (req, res) => {
  res.json({
    message: 'Acesso autorizado ao curso',
    user: req.user
  });
});

// 🔒 Rota protegida - Simulador
app.get('/simulador', verificarToken, (req, res) => {
  res.json({
    message: 'Acesso autorizado ao simulador',
    user: req.user
  });
});

// 🔥 Encerrar conexão ao fechar
process.on('SIGINT', async () => {
  await db.end();
  console.log('Conexão encerrada');
  process.exit();
});

// 🚀 Start servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
