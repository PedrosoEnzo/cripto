import express from 'express';
import mysql from 'mysql2/promise'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Carrega variáveis de ambiente

const app = express();

// Middleware
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

// Chave secreta do JWT
const JWT_SECRET = process.env.JWT_SECRET || 'divandoComAsDivasSupremas!';

// Middleware para verificar token JWT
const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

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

// Cadastro
app.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const [result] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (result.length > 0) {
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

// Login
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

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    const userData = { id: user.id, nome: user.nome, email: user.email };

    res.status(200).json({
      token,
      user: userData
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ alert: 'Erro no servidor', error: error.message });
  }
});

//  Rota protegida - Perfil
app.get('/perfil', verificarToken, async (req, res) => {
  try {
    const [result] = await db.query('SELECT id, nome, email FROM usuarios WHERE id = ?', [req.user.id]);

    if (result.length === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    res.json(result[0]);
  } catch (error) {
    console.error('Erro na obtenção do perfil:', error);
    res.status(500).json({ erro: 'Erro interno', details: error.message });
  }
});

// Rotas protegidas - Curso e Simulador
app.get('/curso', verificarToken, (req, res) => {
  res.json({ message: 'Acesso autorizado ao curso', user: req.user });
});

app.get('/simulador', verificarToken, (req, res) => {
  res.json({ message: 'Acesso autorizado ao simulador', user: req.user });
});

app.put('/atualizarperfil', verificarToken, async (req, res) => {
  const userId = req.user.id;
  const { nome, email } = req.body;

  try {
    await db.query('UPDATE usuarios SET nome = ?, email = ? WHERE id = ?', [nome, email, userId]);
    const [updatedUser] = await db.query('SELECT id, nome, email FROM usuarios WHERE id = ?', [userId]);

    res.json(updatedUser[0]);
  } catch (err) {
    console.error('Erro ao atualizar perfil:', err);
    res.status(500).json({ erro: 'Erro ao atualizar perfil' });
  }
});

// Encerrar conexão ao fechar
process.on('SIGINT', async () => {
  await db.end();
  console.log('Conexão encerrada');
  process.exit();
});

// Start servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});




// Rotas para a validação e update das senhas

app.post('/newPassword', async (req, res) => {
  const { novaSenha, confirmarNovaSenha } = req.body;
  const {email } = req.body;
  console.log(email)

  try {
    // Validações
    if (novaSenha) {
      return res.status(400).json({ 
        alert: 'Por favor, preencha todos os campos.' 
      });
    }

    if (novaSenha !== confirmarNovaSenha) {
      return res.status(400).json({ 
        alert: 'As senhas não coincidem.' 
      });
    }

    if (novaSenha.length < 6) {
      return res.status(400).json({ 
        alert: 'A senha deve ter pelo menos 6 caracteres.' 
      });
    }

    // Verificar se a nova senha é diferente da atual
    const [user] = await db.query('SELECT senha FROM usuarios WHERE email = ?', [email]);
    
    const senhaIgual = await bcrypt.compare(novaSenha, user[0].senha);
    if (senhaIgual) {
      return res.status(400).json({ 
        alert: 'A nova senha não pode ser igual à senha atual.' 
      });
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(novaSenha, 10);

    // Atualiza a senha no banco de dados
    await db.query(
      'UPDATE usuarios SET senha = ? WHERE id = ?',
      [hashedPassword, userId]
    );

    // Resposta de sucesso
    res.status(200).json({ 
      message: 'Senha alterada com sucesso!' 
    });

  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    res.status(500).json({ 
      alert: 'Erro ao redefinir senha. Tente novamente.',
      error: error.message 
    });
  }
});


