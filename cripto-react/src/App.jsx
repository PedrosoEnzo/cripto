import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login'; 
import Cadastro from './pages/Cadastro'; 
import CoursePage from './pages/CoursePage'
import LessonPage from './pages/LessonPage';
import ProfilePage from './pages/ProfilePage';
import About from './pages/About';
import QuizPage from './pages/QuizPage';
import SimulatorPage from './pages/SimulatorPage';
import { ForgotPassword } from '/src/pages/ForgotPassword.jsx';


function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Página inicial */}
        <Route path="/login" element={<Login />} />  {/* Página de login */}
        <Route path="/cadastro" element={<Cadastro />} />  {/* Página de cadastro */}
        <Route path="/curso" element={<CoursePage />} />
        <Route path="/lesson/:id" element={<LessonPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/simulador" element={<SimulatorPage />} />
        <Route path="/curso" element={<CoursePage />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
