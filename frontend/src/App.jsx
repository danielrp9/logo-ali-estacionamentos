/**
 * Logo Ali Estacionamentos - Main Application Component
 * Author: Daniel Rodrigues | Year: 2026
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro'; 
import Dashboard from './pages/Dashboard';
import AdicionarVeiculo from './pages/AdicionarVeiculo';
import Historico from './pages/Historico';
import PagamentoSucesso from './pages/PagamentoSucesso';

// Componente de Proteção de Rota mais robusto
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  // Se não houver token, redireciona para o login
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota Pública */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Rotas Protegidas */}
        <Route 
          path="/dashboard" 
          element={<PrivateRoute><Dashboard /></PrivateRoute>} 
        />

        <Route 
          path="/adicionar" 
          element={<PrivateRoute><AdicionarVeiculo /></PrivateRoute>} 
        />

        <Route 
          path="/historico" 
          element={<PrivateRoute><Historico /></PrivateRoute>} 
        />

        {/* Rota de Sucesso (Onde o redirecionamento do Stripe cai) */}
        {/* Usamos a PrivateRoute aqui também, mas o segredo está no componente interno carregar o token corretamente */}
        <Route 
          path="/sucesso" 
          element={
            <PrivateRoute>
              <PagamentoSucesso />
            </PrivateRoute>
          } 
        />

        {/* Fallback Global */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;