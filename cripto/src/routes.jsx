import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Importando a página Home corretamente

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
