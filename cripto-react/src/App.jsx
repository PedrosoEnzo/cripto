import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login'; // Importando a página de login
import Cadastro from './pages/Cadastro'; // Importando a página de cadastro

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Página inicial */}
        <Route path="/login" element={<Login />} />  {/* Página de login */}
        <Route path="/cadastro" element={<Cadastro />} />  {/* Página de cadastro */}
      </Routes>
    </div>
  );
}

export default App;
