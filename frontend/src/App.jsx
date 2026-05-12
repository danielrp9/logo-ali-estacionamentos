/**
 * Logo Ali Estacionamentos - Main Application Component
 * Author: Daniel Rodrigues | Year: 2026
 * Finalidade: Gerenciamento de rotas com sincronia de protocolo (FIX #5a).
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
import Clientes from './pages/Clientes'; // Importação da nova tela de auditoria

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* ZONA PÚBLICA (HTTP POR PADRÃO) */}
        <Route path="/" element={<Home />} />
        
        {/* ZONA SENSÍVEL (GATILHOS PARA HTTPS) */}
        <Route path="/login/" element={<Login />} />
        <Route path="/cadastro/" element={<Cadastro />} />

        {/* ZONA PRIVADA (ÁREAS LOGADAS) */}
        <Route 
          path="/dashboard/" 
          element={<PrivateRoute><Dashboard /></PrivateRoute>} 
        />

        <Route 
          path="/adicionar/" 
          element={<PrivateRoute><AdicionarVeiculo /></PrivateRoute>} 
        />

        <Route 
          path="/historico/" 
          element={<PrivateRoute><Historico /></PrivateRoute>} 
        />

        {/* ZONA DE AUDITORIA (EXCLUSIVA FUNCIONÁRIOS/ADMIN) */}
        <Route 
          path="/clientes/" 
          element={<PrivateRoute><Clientes /></PrivateRoute>} 
        />

        {/* ZONA DE TRANSAÇÃO (STRIPE) */}
        <Route 
          path="/sucesso/" 
          element={
            <PrivateRoute>
              <PagamentoSucesso />
            </PrivateRoute>
          } 
        />

        {/* Fallback Global: Redireciona qualquer rota inexistente para a Home Social */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;