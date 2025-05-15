import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import CoursePage from './pages/CoursePage';
import LessonPage from './pages/LessonPage';
import ProfilePage from './pages/ProfilePage';
import About from './pages/About';
import QuizPage from './pages/QuizPage';
import SimulatorPage from './pages/SimulatorPage';
import Assistent from './components/Assistent'; // Corrigido o nome do import (veja se está correto)
import { ForgotPassword } from './pages/ForgotPassword';

import { ResetPassword } from './pages/ResetPassword';


function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/curso" element={<CoursePage />} />
        <Route path="/lesson/:id" element={<LessonPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/simulador" element={<SimulatorPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
      </Routes>

      {/* Assistente fora do Routes, mas dentro do container principal */}
      <Assistent apiKey={import.meta.env.VITE_OPENAI_API_KEY} />

    </div>
  );
}

export default App;