/**
 * Logo Ali Estacionamentos - Login Page (Unified Production Edition)
 * Author: Daniel Rodrigues | Year: 2026
 * Estética: Deep Olive Glass / Kinetic Minimalism
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogIn, Car, ShieldCheck, UserPlus } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // --- AUTO-REFRESH DE SEGURANÇA (HARD SYNC) ---
  useEffect(() => {
    /**
     * Se o componente montar em HTTP, forçamos o redirecionamento via JS.
     * Isso automatiza o 'F5' que o navegador às vezes exige no localhost.
     */
    if (window.location.protocol === 'http:' && !window.location.host.includes('8000')) {
      window.location.replace(window.location.href.replace("http://", "https://"));
    }
  }, []);

  const assets = {
    logo: "/logo.png",
    background: "/background/background1.jpg",
    structureColor: "#21261f", 
    borderColor: "rgba(255, 255, 255, 0.08)",
  };

  /**
   * TRUQUE DO "HARD REDIRECT":
   * Força o navegador a carregar a rota como uma nova requisição ao servidor.
   * Isso é vital para que o Middleware de Portaria valide a troca de protocolo.
   */
  const handleHardRedirect = (url) => {
    window.location.assign(url);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post('/api/login/', {
        username,
        password
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('is_staff', response.data.is_staff);

      // Redirecionamento após login bem-sucedido
      handleHardRedirect('/dashboard/');
    } catch (err) {
      setError(err.response ? 'Usuário ou senha incorretos.' : 'Erro de conexão com o servidor.');
    }
  };

  return (
    <div style={{...styles.container, backgroundImage: `url(${assets.background})`}}>
      <div style={styles.backgroundOverlay}></div>

      <div style={{...styles.card, backgroundColor: assets.structureColor, border: `1px solid ${assets.borderColor}`}}>
        <div style={styles.header}>
          {/* Volta para Home forçando o protocolo HTTP */}
          <div style={styles.logoWrapper} onClick={() => handleHardRedirect('/')} style={{cursor: 'pointer'}}>
            <img 
              src={assets.logo} 
              alt="Logo Ali" 
              style={styles.mainLogo}
              onError={(e) => { 
                e.target.style.display = 'none'; 
                document.getElementById('loginFallback').style.display = 'flex'; 
              }}
            />
            <div id="loginFallback" style={{display: 'none', flexDirection: 'column', alignItems: 'center'}}>
              <Car size={32} color="#00b247" />
              <h2 style={styles.titleFallback}>Logo Ali</h2>
            </div>
          </div>
          <p style={styles.subtitle}>Acesso Seguro • Diamantina</p>
        </div>
        
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Usuário</label>
            <input 
              type="text" 
              placeholder="Sua ID de acesso"
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              style={styles.input}
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Senha</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={styles.input}
              required
            />
          </div>

          {error && (
            <div style={styles.errorBox}>
               <ShieldCheck size={14} color="#ef4444" />
               <span>{error}</span>
            </div>
          )}

          <button type="submit" style={styles.button}>
            <span>Entrar</span>
            <LogIn size={18} />
          </button>

          <button 
            type="button" 
            onClick={() => handleHardRedirect('/cadastro/')} 
            style={styles.signupLink}
          >
            <UserPlus size={14} />
            <span>Não tem uma conta? Cadastre-se</span>
          </button>
        </form>

        <div style={styles.footer}>
           <span style={styles.footerText}>Tecnologia UFVJM</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', position: 'relative', backgroundSize: 'cover', backgroundPosition: 'center', overflow: 'hidden' },
  backgroundOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(17, 19, 16, 0.85)', zIndex: 1 },
  card: { position: 'relative', zIndex: 2, backdropFilter: 'blur(20px)', padding: '2.2rem', borderRadius: '35px', boxShadow: '0 40px 100px rgba(0,0,0,0.6)', width: '90%', maxWidth: '380px' },
  header: { textAlign: 'center', marginBottom: '1.5rem' },
  logoWrapper: { display: 'flex', justifyContent: 'center', marginBottom: '8px' },
  mainLogo: { height: '50px', width: 'auto', objectFit: 'contain' },
  titleFallback: { fontSize: '1.4rem', fontWeight: '900', color: '#fff', margin: '5px 0 0', letterSpacing: '-1px' },
  subtitle: { fontSize: '0.7rem', color: '#8d948a', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' },
  form: { display: 'flex', flexDirection: 'column' },
  inputGroup: { marginBottom: '1rem' },
  label: { fontSize: '0.7rem', fontWeight: '900', color: '#fff', marginBottom: '0.5rem', display: 'block', textTransform: 'uppercase', opacity: 0.9 },
  input: { width: '100%', padding: '0.9rem 1.1rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', backgroundColor: 'rgba(0,0,0,0.3)', color: '#fff' },
  button: { width: '100%', padding: '1rem', backgroundColor: '#00b247', color: '#fff', border: 'none', borderRadius: '14px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', fontWeight: '900', fontSize: '0.95rem', boxShadow: '0 12px 24px rgba(0, 178, 71, 0.3)', marginTop: '0.5rem' },
  signupLink: { background: 'none', border: 'none', color: '#8d948a', fontSize: '0.75rem', fontWeight: '700', marginTop: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
  errorBox: { display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontSize: '0.8rem', justifyContent: 'center', marginBottom: '1rem', fontWeight: '700' },
  footer: { marginTop: '1.5rem', textAlign: 'center' },
  footerText: { fontSize: '0.65rem', fontWeight: '900', color: '#4a5248', letterSpacing: '2px', textTransform: 'uppercase' }
};

export default Login;