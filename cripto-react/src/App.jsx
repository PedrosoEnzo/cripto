import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
<<<<<<< HEAD
import Login from './pages/Login'; // Importando a página de login
import Cadastro from './pages/Cadastro'; // Importando a página de cadastro
=======
import Login from './pages/Login'; 
import Cadastro from './pages/Cadastro'; 
import Navbar from './components/Navbar'; 


>>>>>>> ddda0b878cc6859faa92db367587e89f4eaf374a

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Página inicial */}
        <Route path="/login" element={<Login />} />  {/* Página de login */}
        <Route path="/cadastro" element={<Cadastro />} />  {/* Página de cadastro */}
      </Routes>
    </div>
  );
}

export default App;
