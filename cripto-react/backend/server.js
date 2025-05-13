import express from 'express';
import mysql from 'mysql2';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Adicionado
import cors from 'cors';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());



// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'cripto'
});

// Chave secreta para JWT (em produção, use uma variável de ambiente)
const JWT_SECRET = 'divandoComAsDivasSupremas!';

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

// Rota de Cadastro (mantida igual)
app.post('/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao verificar o email', error: err });
    }
    if (results.length > 0) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    bcrypt.hash(senha, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao criptografar a senha', error: err });
      }

      db.query(
        'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
        [nome, email, hashedPassword],
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

// Rota de Login (atualizada com JWT)
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ alert: 'Erro ao verificar o usuário', error: err });
    }

    if (results.length > 0) {
      bcrypt.compare(senha, results[0].senha, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ alert: 'Erro ao comparar as senhas' });
        }

        if (isMatch) {
          // Gera token JWT válido por 1 hora
          const token = jwt.sign(
            { 
              id: results[0].id,
              email: results[0].email 
            },
            JWT_SECRET,
            { expiresIn: '1h' }
          );

          // Retorna token e dados do usuário (sem senha)
          const userData = { ...results[0] };
          delete userData.senha;
          
          res.status(200).json({ 
            alert: 'Login bem-sucedido',
            token,
            user: userData
          });
        } else {
          res.status(401).json({ alert: 'Credenciais inválidas' });
        }
      });
    } else {
      res.status(401).json({ alert: 'Usuário não encontrado' });
    }
  });
});

// Rota protegida de exemplo
app.get('/perfil', verificarToken, (req, res) => {
  // Acesso apenas com token válido
  db.query('SELECT id, nome, email FROM usuarios WHERE id = ?', [req.user.id], (err, results) => {
    if (err) {
      return res.status(500).json({ alert: 'Erro ao buscar usuário' });
    }
    res.json({ user: results[0] });
  });
});

// Rota de curso protegida
app.get('/curso', verificarToken, (req, res) => {
  res.json({ 
    message: 'Acesso autorizado ao curso',
    user: req.user 
  });
});

// Rota de simulador protegida
app.get('/simulador', verificarToken, (req, res) => {
  res.json({ 
    message: 'Acesso autorizado ao simulador',
    user: req.user 
  });
});

// Iniciar o servidor
app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});