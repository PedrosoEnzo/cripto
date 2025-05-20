import express from 'express';
import mysql from 'mysql2/promise'; // Usando mysql2 com Promises
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente

const app = express();

// Configurações do middleware
app.use(cors());
app.use(express.json());

// Conexão com o MySQL (usando variáveis de ambiente)
const db = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'cripto'
});

// Verifica a conexão com o banco de dados
try {
  await db.connect();
  console.log('Conectado ao banco de dados MySQL!');
} catch (err) {
  console.error('Erro na conexão com o MySQL:', err);
  process.exit(1); // Encerra o servidor se não conectar
}

// Chave secreta para JWT (usando variável de ambiente)
const JWT_SECRET = process.env.JWT_SECRET || 'divandoComAsDivasSupremas!';

// Middleware para verificar token JWT
const verificarToken = (req, res, next) => {
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
};

// Rota de Cadastro
app.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Verifica se o email já existe
    const [results] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    
    if (results.length > 0) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Insere o novo usuário
    await db.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, hashedPassword]
    );

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
});

// Rota de Login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Busca o usuário pelo email
    const [results] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (results.length === 0) {
      return res.status(401).json({ alert: 'Usuário não encontrado' });
    }

    // Compara a senha com bcrypt
    const senhaValida = await bcrypt.compare(senha, results[0].senha);
    if (!senhaValida) {
      return res.status(401).json({ alert: 'Credenciais inválidas' });
    }

    // Gera o token JWT (válido por 1 hora)
    const token = jwt.sign(
      { 
        id: results[0].id,
        email: results[0].email 
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Retorna o token e dados do usuário (sem a senha)
    const userData = { ...results[0] };
    delete userData.senha;

    res.status(200).json({ 
      alert: 'Login bem-sucedido',
      token,
      user: userData
    });
  } catch (err) {
    res.status(500).json({ alert: 'Erro no servidor', error: err.message });
  }
});

// Rota protegida de perfil
app.get("/perfil", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ erro: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1]; // Extraindo o token
    const usuario = verificarToken(token); // Função fictícia para validar o token
    
    if (!usuario) {
        return res.status(401).json({ erro: "Token inválido ou expirado" });
    }

    res.json(usuario);
});




// Rota protegida de curso
app.get('/curso', verificarToken, (req, res) => {
  res.json({ 
    message: 'Acesso autorizado ao curso',
    user: req.user 
  });
});

// Rota protegida de simulador
app.get('/simulador', verificarToken, (req, res) => {
  res.json({ 
    message: 'Acesso autorizado ao simulador',
    user: req.user 
  });
});

// Encerra a conexão com o MySQL ao fechar o servidor
process.on('SIGINT', async () => {
  try {
    await db.end();
    console.log('Conexão com o MySQL encerrada.');
    process.exit();
  } catch (err) {
    console.error('Erro ao encerrar conexão:', err);
    process.exit(1);
  }
});

// Inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

