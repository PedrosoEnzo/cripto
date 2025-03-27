// src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';  

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />  {/* Página Home */}
      
      </Routes>
    </div>
  );
}

export default App;
