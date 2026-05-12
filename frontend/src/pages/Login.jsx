/**
 * Logo Ali Estacionamentos - Terminal de Acesso (Security Edition)
 * Author: Daniel Rodrigues Pereira | Year: 2026
 * Finalidade: Autenticação e Persistência de Perfil (Norma N08.6)
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LogIn, Car, ShieldCheck, UserPlus, AlertOctagon, Lock } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const isLocalhostDev = window.location.port === '3000' || window.location.port === '5173';
    if (window.location.protocol === 'http:' && !isLocalhostDev) {
      window.location.replace(window.location.href.replace("http://", "https://"));
    }
  }, []);

  const assets = {
    background: "/background/background1.jpg",
    structureColor: "#21261f", 
    borderColor: "rgba(255, 255, 255, 0.08)",
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLocked(false);
    
    try {
      const response = await axios.post('/api/login/', {
        username,
        password
      });

      // ============================================================
      // PERSISTÊNCIA CRÍTICA (CORREÇÃO DO ERRO 'NULL')
      // ============================================================
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('tipo_usuario', response.data.tipo_usuario); // FU, AD ou CL
      localStorage.setItem('is_staff', response.data.is_staff);
      localStorage.setItem('nome_usuario', response.data.nome);

      window.location.href = '/dashboard/';

    } catch (err) {
      const status = err.response?.status;
      const apiMessage = err.response?.data?.detail || err.response?.data?.erro;

      if (status === 403 || apiMessage?.includes("blocked") || apiMessage?.includes("tentativas")) {
        setIsLocked(true);
        setError('ACESSO BLOQUEADO: 5 tentativas malsucedidas. Contate o Administrador (N02.4).');
      } else {
        setError('Credenciais incorretas ou operador não identificado.');
      }
    }
  };

  return (
    <div style={{...styles.container, backgroundImage: `url(${assets.background})`}}>
      <div style={styles.backgroundOverlay}></div>

      <div style={{...styles.card, backgroundColor: assets.structureColor, border: `1px solid ${assets.borderColor}`}}>
        <div style={styles.header}>
          <div style={styles.logoWrapper} onClick={() => window.location.href = '/'}>
            <Car size={32} color="#00b247" />
            <h2 style={styles.titleFallback}>Logo Ali</h2>
          </div>
          <p style={styles.subtitle}>Terminal de Acesso Seguro</p>
          <div style={styles.securityStatus}>
             <ShieldCheck size={12} color="#00b247" />
             <span>CRIPTOGRAFIA TLS ATIVA</span>
          </div>
        </div>
        
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>ID do Operador / Cliente</label>
            <input 
              type="text" 
              placeholder="Usuário"
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              style={styles.input}
              disabled={isLocked}
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Senha de Segurança</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={styles.input}
              disabled={isLocked}
              required
            />
          </div>

          {error && (
            <div style={isLocked ? styles.lockBox : styles.errorBox}>
               {isLocked ? <Lock size={14} /> : <AlertOctagon size={14} />}
               <span>{error}</span>
            </div>
          )}

          <button 
            type="submit" 
            style={{...styles.button, opacity: isLocked ? 0.5 : 1}}
            disabled={isLocked}
          >
            <span>{isLocked ? 'CONTA BLOQUEADA' : 'AUTENTICAR'}</span>
            <LogIn size={18} />
          </button>

          <button 
            type="button" 
            onClick={() => window.location.href = '/cadastro/'} 
            style={styles.signupLink}
          >
            <UserPlus size={14} />
            <span>Novo usuário? Solicitar Registro</span>
          </button>
        </form>
      </div>
    </div> 
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', position: 'relative', backgroundSize: 'cover', backgroundPosition: 'center', overflow: 'hidden' },
  backgroundOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(10, 12, 10, 0.92)', zIndex: 1 },
  card: { position: 'relative', zIndex: 2, backdropFilter: 'blur(30px)', padding: '2.5rem', borderRadius: '40px', boxShadow: '0 50px 100px rgba(0,0,0,0.8)', width: '90%', maxWidth: '400px' },
  header: { textAlign: 'center', marginBottom: '2rem' },
  logoWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px', cursor: 'pointer' },
  titleFallback: { fontSize: '1.4rem', fontWeight: '900', color: '#fff', margin: '5px 0 0', textTransform: 'uppercase' },
  subtitle: { fontSize: '0.65rem', color: '#8d948a', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase' },
  securityStatus: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#00b247', fontSize: '0.55rem', fontWeight: '900', marginTop: '8px' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  label: { fontSize: '0.6rem', fontWeight: '900', color: '#8d948a', textTransform: 'uppercase' },
  input: { width: '100%', padding: '1rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff' },
  button: { width: '100%', padding: '1.1rem', backgroundColor: '#00b247', color: '#fff', border: 'none', borderRadius: '18px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', fontWeight: '900', fontSize: '0.9rem', boxShadow: '0 15px 30px rgba(0, 178, 71, 0.2)', marginTop: '1rem' },
  signupLink: { background: 'none', border: 'none', color: '#4a5248', fontSize: '0.7rem', fontWeight: '800', marginTop: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textTransform: 'uppercase' },
  errorBox: { display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontSize: '0.7rem', justifyContent: 'center', fontWeight: '800', padding: '12px', backgroundColor: 'rgba(239, 68, 68, 0.05)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)' },
  lockBox: { display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', backgroundColor: '#ef4444', fontSize: '0.7rem', justifyContent: 'center', fontWeight: '800', padding: '12px', borderRadius: '12px' }
};

export default Login;