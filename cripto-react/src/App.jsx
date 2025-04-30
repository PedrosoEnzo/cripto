import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login'; 
import Cadastro from './pages/Cadastro'; 
import CoursePage from './components/CoursePage'
import LessonPage from './components/LessonPage';
import Simulador from './components/SimulatorPage';
import ProfilePage from './components/ProfilePage';
import About from './components/About';



function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Página inicial */}
        <Route path="/login" element={<Login />} />  {/* Página de login */}
        <Route path="/cadastro" element={<Cadastro />} />  {/* Página de cadastro */}
        <Route path="/curso" element={<CoursePage />} />
        <Route path="/lesson/:id" element={<LessonPage />} />
        <Route path="/simulador" element={<Simulador />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/about" element={<About />} />
    
      </Routes>
    </div>
  );
}

export default App;
