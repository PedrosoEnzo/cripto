import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login'; 
import Cadastro from './pages/Cadastro'; 
import CoursePage from './pages/CoursePage'
import LessonPage from './pages/LessonPage';
import ProfilePage from './pages/ProfilePage';
import About from './pages/About';
<<<<<<< HEAD
import QuizPage from './components/QuizPage';
import SimulatorPage from './components/SimulatorPage';
import Assistent from './components/Assistent';

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
<<<<<<< HEAD
        <Route path="/assistent" element={<Assistent/>} />
    
=======
        <Route path="/forgotPassword" element={<ForgotPassword />} />
>>>>>>> 8f288df7da8bc82780c5398ef1c43e282aa7c6fd
      </Routes>
    </div>
  );
}

export default App;
