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

/**
 * Componente de Proteção de Rota (Guard)
 * Garante que apenas usuários autenticados acessem áreas administrativas.
 */
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // Redireciona para o login caso não haja sessão ativa
    return <Navigate to="/login/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* ZONA PÚBLICA (HTTP POR PADRÃO)
            ✅ FIX #5a: Rotas sempre com barra final "/" para evitar conflitos 
            com o redirecionamento do Middleware do Django.
        */}
        <Route path="/" element={<Home />} />
        
        {/* ZONA SENSÍVEL (GATILHOS PARA HTTPS)
            O redirecionamento de protocolo é feito via Middleware no Backend
            ou via Hard Redirect no componente Login.jsx.
        */}
        <Route path="/login/" element={<Login />} />
        <Route path="/cadastro/" element={<Cadastro />} />

        {/* ZONA PRIVADA (ÁREAS LOGADAS)
            Todas as rotas abaixo são protegidas pelo PrivateRoute e devem
            ser acessadas sob o protocolo HTTPS para garantir a segurança.
        */}
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

        {/* ZONA DE TRANSAÇÃO (STRIPE)
            Garante que o retorno do gateway de pagamento seja processado em ambiente seguro.
        */}
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