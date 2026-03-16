/**
 * Logo Ali Estacionamentos - Main Application Component
 * Author: Daniel Rodrigues Pereira
 * Year: 2026
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


const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Lading Page: Apresentação da Marca Logo Ali */}
        <Route path="/" element={<Home />} />

        {/* 2. Fluxo de Autenticação */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* 3. Rotas Privadas (Operação Tática e Monitoramento) */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/adicionar" 
          element={
            <PrivateRoute>
              <AdicionarVeiculo />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/historico" 
          element={
            <PrivateRoute>
              <Historico />
            </PrivateRoute>
          } 
        />

        {/* 4. Confirmação de Saída (Sucesso Stripe/Sistema) */}
        <Route 
          path="/sucesso" 
          element={
            <PrivateRoute>
              <PagamentoSucesso />
            </PrivateRoute>
          } 
        />

        {/* 5. Fallback Global: Redireciona rotas inexistentes para a Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;