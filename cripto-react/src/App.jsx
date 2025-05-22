import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Navbar2 from "./components/Navbar2";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import CoursePage from "./pages/CoursePage";
import LessonPage from "./pages/LessonPage";
import ProfilePage from "./pages/ProfilePage";
import About from "./pages/About";
import QuizPage from "./pages/QuizPage";
import SimulatorPage from "./pages/SimulatorPage";
import Assistent from "./components/Assistent";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import Privacidade from "./components/privacidade";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem("token"));
  const location = useLocation();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  // Mostrar Navbar apenas na página Home
  const showNavbar = location.pathname === "/";

  return (
    <div className="app">
      {showNavbar && (isLoggedIn ? <Navbar2 onLogout={handleLogout} /> : <Navbar />)}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/curso" element={<CoursePage />} />
        <Route path="/lesson/:id" element={<LessonPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/simulador" element={<SimulatorPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/privacidade" element={<Privacidade />} />
      </Routes>

      <Assistent apiKey={import.meta.env.VITE_GEMINI_API_KEY} />
    </div>
  );
}

export default App;
