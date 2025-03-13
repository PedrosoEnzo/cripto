import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./Components/NavBar";
import Login from "./pages/Login";
//  <Route path="/Cadastro" element={<About />} />

function AppRoutes() {
    return (
        <BrowserRouter> {/* Use apenas BrowserRouter */}
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} /> {/* Corrigido */}
              
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes
