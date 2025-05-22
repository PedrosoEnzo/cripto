import express from 'express';
import mysql from 'mysql2/promise'; // Usando Promises para conexão com MySQL
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Carrega variáveis de ambiente

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com o MySQL
const db = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'cripto'
});

// Chave secreta do JWT
const JWT_SECRET = process.env.JWT_SECRET || 'chaveSecretaSuperSegura';

// Middleware para verificar token JWT
const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization; // Sem "?.", para capturar undefined corretamente

    console.log('Token recebido:', authHeader); // Log para verificar o valor real

    if (!authHeader) {
        return res.status(403).json({ alert: 'Token não fornecido' });
    }

    const partes = authHeader.split(' ');
    if (partes.length !== 2 || partes[0] !== 'Bearer') {
        return res.status(403).json({ alert: 'Formato do token inválido' });
    }

    const token = partes[1];

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Erro ao verificar token:', err);
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
    const [results] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (results.length > 0) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    await db.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hashedPassword]);

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (err) {
    console.error('Erro no cadastro:', err);
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
});

// Rota de Login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [results] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (results.length === 0) {
      return res.status(401).json({ alert: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, results[0].senha);
    if (!senhaValida) {
      return res.status(401).json({ alert: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: results[0].id, email: results[0].email }, JWT_SECRET, { expiresIn: '1h' });

    const userData = { ...results[0] };
    delete userData.senha;

    res.status(200).json({ alert: 'Login bem-sucedido', token, user: userData });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ alert: 'Erro no servidor', error: err.message });
  }
});

// Middleware para log de requisição (antes das rotas protegidas)
app.use((req, res, next) => {
    console.log('Headers recebidos:', req.headers);
    next();
});

// Rota de Debug para visualizar headers recebidos
app.get('/debug', (req, res) => {
    res.json({ headers: req.headers });
});

// Rota protegida de perfil
app.get('/perfil', verificarToken, async (req, res) => {
    try {
        const [results] = await db.query('SELECT id, nome, email FROM usuarios WHERE id = ?', [req.user.id]);

        if (results.length === 0) {
            return res.status(404).json({ alert: 'Usuário não encontrado' });
        }

        res.json({ user: results[0] });
    } catch (err) {
        console.error('Erro na obtenção do perfil:', err);
        res.status(500).json({ alert: 'Erro interno', error: err.message });
    }
});

// Rota protegida de curso
app.get('/curso', verificarToken, (req, res) => {
  res.json({ message: 'Acesso autorizado ao curso', user: req.user });
});

// Rota protegida de simulador
app.get('/simulador', verificarToken, (req, res) => {
  res.json({ message: 'Acesso autorizado ao simulador', user: req.user });
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

// Middleware global para captura de erros
app.use((err, req, res, next) => {
  console.error('Erro no servidor:', err);
  res.status(500).json({ error: 'Erro interno no servidor', details: err.message });
});

// Inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
