import React from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Importando a página Home corretamente
import Teste from "./pages/Teste";
import Navbar from "./Components/NavBar/NavBar";
import Login from "./pages/Login";

function AppRoutes() {
    return (
        <Router>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={Login} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
