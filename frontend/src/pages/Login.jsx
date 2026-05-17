/**
 * Logo Ali Estacionamentos - Terminal de Acesso (Liquid Glass Edition)
 * Author: Daniel Rodrigues Pereira | Year: 2026
 * Finalidade: Autenticação e Persistência de Perfil (Norma N08.6)
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LogIn, Car, ShieldCheck, UserPlus, AlertOctagon, Lock, Sparkles } from 'lucide-react';

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
    accent: "#00f061", // Verde neon padrão do sistema
    structureColor: "rgba(255, 255, 255, 0.02)", 
    borderColor: "rgba(255, 255, 255, 0.08)",
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLocked) return;
    setError('');
    
    // Marca o carimbo de data/hora do início exato da requisição
    const startTime = Date.now();

    try {
      const response = await axios.post('/api/login/', {
        username,
        password
      });

      // PERSISTÊNCIA CRÍTICA
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('tipo_usuario', response.data.tipo_usuario); 
      localStorage.setItem('is_staff', response.data.is_staff);
      localStorage.setItem('nome_usuario', response.data.nome);

      window.location.href = '/dashboard/';

    } catch (err) {
      const status = err.response?.status;
      
      // Calcula quanto tempo o servidor demorou para responder o erro (Assinatura de Performance)
      const duration = Date.now() - startTime;

      // SELETOR CRÍTICO: Se o status for 429/403 ou se o erro 400 voltou em tempo recorde (rejeição de portaria)
      // Significa que o Axes barrou antes de processar o hash da senha de forma ordinária.
      const isAxesLockout = status === 429 || status === 403 || (status === 400 && duration < 150);

      if (isAxesLockout) {
        setIsLocked(true);
        setError('ACESSO BLOQUEADO: 5 tentativas malsucedidas. Contate o Administrador (N02.4).');
      } else {
        setIsLocked(false); // Mantém a tela destrancada para as tentativas legítimas restantes
        setError('Credenciais incorretas ou operador não identificado.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <LoginStyle assets={assets} isLocked={isLocked} />
      
      {/* BACKGROUND ELEMENTS */}
      <div className="liquid-orb orb-1"></div>
      <div className="liquid-orb orb-2"></div>
      <div className="backgroundGrid"></div>

      <div style={styles.card} className="glassCard">
        <div style={styles.header}>
          <div style={styles.logoWrapper} onClick={() => window.location.href = '/'}>
            <div className="logoIcon"><Car size={28} color={assets.accent} /></div>
            <h2 style={styles.titleFallback}>LOGO ALI <span style={{fontWeight: 300, opacity: 0.4}}>| Estacionamentos</span></h2>
          </div>
          <div style={styles.badge}>
            <ShieldCheck size={12} color={assets.accent} />
            <span>TERMINAL DE ACESSO SEGURO</span>
          </div>
        </div>
        
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>ID DO OPERADOR / CLIENTE</label>
            <input 
              type="text" 
              placeholder="Digite seu usuário"
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              style={styles.input}
              disabled={isLocked}
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>SENHA DE SEGURANÇA</label>
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
            <div style={isLocked ? styles.lockBox : styles.errorBox} className="shakeEffect">
               {isLocked ? <Lock size={14} /> : <AlertOctagon size={14} />}
               <span>{error}</span>
            </div>
          )}

          <button 
            type="submit" 
            className="btn-glow"
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
            className="linkHover"
          >
            <UserPlus size={14} />
            <span>Novo usuário? Solicitar Registro</span>
          </button>
        </form>
      </div>

      <footer style={styles.footer}>
        <div className="footerBadge">
            <Sparkles size={10} color={assets.accent} />
            <span>CRIPTOGRAFIA TLS ATIVA EM DIAMANTINA</span>
        </div>
      </footer>
    </div> 
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', position: 'relative', backgroundColor: '#020502', overflow: 'hidden' },
  card: { position: 'relative', zIndex: 2, padding: '3rem 2.5rem', borderRadius: '40px', width: '90%', maxWidth: '420px', textAlign: 'center' },
  header: { marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  logoWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer', marginBottom: '20px' },
  titleFallback: { fontSize: '1rem', fontWeight: '900', color: '#fff', margin: 0, letterSpacing: '1px' },
  badge: { display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,240,97,0.1)', padding: '6px 14px', borderRadius: '100px', fontSize: '0.6rem', fontWeight: '800', color: '#00f061', border: '1px solid rgba(0,240,97,0.2)' },
  form: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.6rem', textAlign: 'left' },
  label: { fontSize: '0.65rem', fontWeight: '900', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' },
  input: { width: '100%', padding: '1.2rem', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', backgroundColor: 'rgba(0,0,0,0.3)', color: '#fff', transition: '0.3s' },
  button: { width: '100%', padding: '1.2rem', backgroundColor: '#00f061', color: '#000', border: 'none', borderRadius: '18px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', fontWeight: '900', fontSize: '0.9rem', marginTop: '1rem', transition: '0.3s' },
  signupLink: { background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', fontWeight: '800', marginTop: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textTransform: 'uppercase', transition: '0.3s' },
  errorBox: { display: 'flex', alignItems: 'center', gap: '10px', color: '#ff4d4d', fontSize: '0.75rem', justifyContent: 'center', fontWeight: '700', padding: '14px', backgroundColor: 'rgba(255, 77, 77, 0.05)', borderRadius: '15px', border: '1px solid rgba(255, 77, 77, 0.2)' },
  lockBox: { display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', backgroundColor: '#ef4444', fontSize: '0.75rem', justifyContent: 'center', fontWeight: '700', padding: '14px', borderRadius: '15px' },
  footer: { position: 'absolute', bottom: '30px', zIndex: 2 }
};

const LoginStyle = ({assets, isLocked}) => (
  <style>{`
    .glassCard {
        background: rgba(255, 255, 255, 0.02);
        backdrop-filter: blur(40px);
        border: 1px solid rgba(255, 255, 255, 0.05);
        box-shadow: 0 40px 100px rgba(0,0,0,0.6);
    }
    
    .logoIcon {
        background: linear-gradient(135deg, rgba(0,240,97,0.2), transparent);
        padding: 12px;
        border-radius: 50% !important;
        border: 1px solid rgba(0,240,97,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .liquid-orb { position: absolute; border-radius: 50%; filter: blur(120px); z-index: 1; pointer-events: none; opacity: 0.15; }
    .orb-1 { width: 450px; height: 450px; background: ${assets.accent}; top: -150px; right: -100px; }
    .orb-2 { width: 400px; height: 400px; background: #0080ff; bottom: -100px; left: -150px; opacity: 0.1; }

    .backgroundGrid {
        position: absolute; inset: 0; 
        background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
        background-size: 50px 50px; z-index: 1;
        mask-image: radial-gradient(circle at 50% 50%, black, transparent 90%);
    }

    input:focus {
        border-color: ${assets.accent}44 !important;
        background-color: rgba(0,0,0,0.5) !important;
        box-shadow: 0 0 20px ${assets.accent}11;
    }

    .btn-glow:hover {
        background-color: #fff !important;
        box-shadow: 0 0 30px ${assets.accent}66;
        transform: translateY(-2px);
    }

    .linkHover:hover {
        color: #fff !important;
        letter-spacing: 0.5px;
    }

    .footerBadge {
        display: flex;
        align-items: center;
        gap: 8px;
        color: rgba(255,255,255,0.2);
        font-size: 0.6rem;
        font-weight: 800;
        letter-spacing: 1px;
    }

    .shakeEffect {
        animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
    }

    @keyframes shake {
        10%, 90% { transform: translate3d(-1px, 0, 0); }
        20%, 80% { transform: translate3d(2px, 0, 0); }
        30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
        40%, 60% { transform: translate3d(4px, 0, 0); }
    }

    @media (max-width: 480px) {
        .glassCard { padding: 2rem 1.5rem !important; width: 95% !important; border-radius: 30px !important; }
        .mainTitle { font-size: 2.2rem !important; }
    }
  `}</style>
);

export default Login;