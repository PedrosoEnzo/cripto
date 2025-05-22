import express from 'express';
<<<<<<< HEAD
import mysql from 'mysql2/promise'; // Usando Promises para conexão com MySQL
=======
import mysql from 'mysql2/promise';
>>>>>>> 5310ec80c6e91c1be8eb42b42c44802826ca92cd
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';

<<<<<<< HEAD
dotenv.config(); // Carrega variáveis de ambiente

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com o MySQL
=======
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o banco de dados
>>>>>>> 5310ec80c6e91c1be8eb42b42c44802826ca92cd
const db = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'cripto'
});

<<<<<<< HEAD
// Chave secreta do JWT
const JWT_SECRET = process.env.JWT_SECRET || 'chaveSecretaSuperSegura';

// Middleware para verificar token JWT
const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization; // Sem "?.", para capturar undefined corretamente
=======
console.log('Conectado ao banco de dados MySQL!');

// Chave secreta para JWT
const JWT_SECRET = process.env.JWT_SECRET || 'divandoComAsDivasSupremas!';

// Middleware para verificar token
function verificarToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ alert: 'Token não fornecido' });
  }
>>>>>>> 5310ec80c6e91c1be8eb42b42c44802826ca92cd

    console.log('Token recebido:', authHeader); // Log para verificar o valor real

    if (!authHeader) {
        return res.status(403).json({ alert: 'Token não fornecido' });
    }
<<<<<<< HEAD

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
=======
    req.user = decoded;
    next();
  });
}
>>>>>>> 5310ec80c6e91c1be8eb42b42c44802826ca92cd

// 🔐 Cadastro
app.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
<<<<<<< HEAD
    const [results] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (results.length > 0) {
=======
    const [result] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (result.length > 0) {
>>>>>>> 5310ec80c6e91c1be8eb42b42c44802826ca92cd
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
<<<<<<< HEAD
    await db.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hashedPassword]);

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (err) {
    console.error('Erro no cadastro:', err);
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
=======

    await db.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, hashedPassword]
    );

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
>>>>>>> 5310ec80c6e91c1be8eb42b42c44802826ca92cd
  }
});

// 🔑 Login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
<<<<<<< HEAD
    const [results] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
=======
    const [result] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
>>>>>>> 5310ec80c6e91c1be8eb42b42c44802826ca92cd

    if (result.length === 0) {
      return res.status(401).json({ alert: 'Usuário não encontrado' });
    }

<<<<<<< HEAD
    const senhaValida = await bcrypt.compare(senha, results[0].senha);
=======
    const user = result[0];
    const senhaValida = await bcrypt.compare(senha, user.senha);

>>>>>>> 5310ec80c6e91c1be8eb42b42c44802826ca92cd
    if (!senhaValida) {
      return res.status(401).json({ alert: 'Credenciais inválidas' });
    }

<<<<<<< HEAD
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
=======
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
>>>>>>> 5310ec80c6e91c1be8eb42b42c44802826ca92cd
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

<<<<<<< HEAD
// Middleware global para captura de erros
app.use((err, req, res, next) => {
  console.error('Erro no servidor:', err);
  res.status(500).json({ error: 'Erro interno no servidor', details: err.message });
});

// Inicia o servidor
=======
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
>>>>>>> 5310ec80c6e91c1be8eb42b42c44802826ca92cd
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
