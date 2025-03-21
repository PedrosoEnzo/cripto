import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./Components/NavBar";
import Login from "./pages/Login";
import Cadastro from "./pages/cadastro";
//  <Route path="/Cadastro" element={<About />} />
// 

function AppRoutes() {
    return (
        <BrowserRouter> {/* Use apenas BrowserRouter */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} /> {/* Corrigido */}
                <Route path="/cadastro" element={<Cadastro />} /> {/* Corrigido */}
              
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes
