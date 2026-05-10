/**
 * Logo Ali Estacionamentos - Sign Up Page (Security Compliant Edition)
 * Author: Daniel Rodrigues Pereira | Year: 2026
 * Estética: Deep Olive Glass / Kinetic Minimalism
 * Conformidade: N02.1 (Complexidade), N03.1 (LGPD/Privacidade)
 */
import React, { useState } from 'react';
import axios from 'axios';
import { UserPlus, Car, ShieldCheck, ArrowLeft, Mail, Lock, User, AlertCircle } from 'lucide-react';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const assets = {
    logo: "/logo.png",
    background: "/background/background1.jpg",
    structureColor: "#21261f", 
    borderColor: "rgba(255, 255, 255, 0.08)",
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- VALIDAÇÃO CONFORME NORMA N02.1 ---
  const validatePassword = (pass) => {
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasMinLen = pass.length >= 8;

    if (!hasMinLen) return "A senha deve ter no mínimo 8 caracteres.";
    if (!hasUpper || !hasLower || !hasNumber) return "A senha deve conter letras maiúsculas, minúsculas e números.";
    return null;
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    setError('');

    // 1. Validação de coincidência
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    // 2. Validação de complexidade (Frontend Enforcement - N02.1)
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      // Uso de caminho relativo para integração correta com o Nginx (Proxy Reverso)
      await axios.post('/api/register/', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      // Redirecionamento forçado para garantir limpeza de estado
      window.location.href = '/login';
    } catch (err) {
      // Captura o erro detalhado do Django ComplexityValidator ou Axes
      const apiError = err.response?.data?.erro || err.response?.data?.password?.[0] || 'Erro ao criar conta.';
      setError(apiError);
    }
  };

  return (
    <div style={{...styles.container, backgroundImage: `url(${assets.background})`}}>
      <div style={styles.backgroundOverlay}></div>

      <div style={{...styles.card, backgroundColor: assets.structureColor, border: `1px solid ${assets.borderColor}`}}>
        <div style={styles.header}>
          <div style={styles.logoWrapper} onClick={() => window.location.href = '/'}>
            <img 
              src={assets.logo} 
              alt="Logo Ali" 
              style={styles.mainLogo}
              onError={(e) => { e.target.style.display = 'none'; document.getElementById('regFallback').style.display = 'flex'; }}
            />
            <div id="regFallback" style={{display: 'none', flexDirection: 'column', alignItems: 'center'}}>
              <Car size={30} color="#00b247" />
              <h2 style={styles.titleFallback}>Logo Ali</h2>
            </div>
          </div>
          <p style={styles.subtitle}>Crie sua conta</p>
          <div style={styles.securityBadge}>
            <ShieldCheck size={12} color="#00b247" />
            <span>SSL ATIVO</span>
          </div>
        </div>
        
        <form onSubmit={handleCadastro} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Usuário</label>
            <div style={styles.inputWrapper}>
              <User size={16} style={styles.icon} />
              <input 
                name="username"
                type="text" 
                placeholder="Seu ID de Operador"
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>E-mail</label>
            <div style={styles.inputWrapper}>
              <Mail size={16} style={styles.icon} />
              <input 
                name="email"
                type="email" 
                placeholder="operador@logoali.com.br"
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.inputRow}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Senha</label>
              <div style={styles.inputWrapper}>
                <Lock size={16} style={styles.icon} />
                <input 
                  name="password"
                  type="password" 
                  placeholder="Min. 8 char"
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Confirmação</label>
              <div style={styles.inputWrapper}>
                <Lock size={16} style={styles.icon} />
                <input 
                  name="confirmPassword"
                  type="password" 
                  placeholder="Repita a senha" 
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
            </div>
          </div>

          {error && (
            <div style={styles.errorBox}>
               <AlertCircle size={14} color="#ef4444" />
               <span>{error}</span>
            </div>
          )}

          <button type="submit" style={styles.button}>
            <span>EFETUAR CADASTRO</span>
            <UserPlus size={18} />
          </button>

          <button type="button" onClick={() => window.location.href = '/login'} style={styles.btnLink}>
            <ArrowLeft size={14} /> Retornar para o Login
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', position: 'relative', backgroundSize: 'cover', backgroundPosition: 'center', overflow: 'hidden' },
  backgroundOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(17, 19, 16, 0.90)', zIndex: 1 },
  card: { position: 'relative', zIndex: 2, backdropFilter: 'blur(25px)', padding: '2.5rem', borderRadius: '35px', boxShadow: '0 40px 100px rgba(0,0,0,0.7)', width: '90%', maxWidth: '480px' },
  header: { textAlign: 'center', marginBottom: '1.8rem' },
  logoWrapper: { display: 'flex', justifyContent: 'center', marginBottom: '8px', cursor: 'pointer' },
  mainLogo: { height: '48px', width: 'auto' },
  titleFallback: { fontSize: '1.2rem', fontWeight: '900', color: '#fff', margin: '5px 0 0' },
  subtitle: { fontSize: '0.65rem', color: '#8d948a', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' },
  securityBadge: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', marginTop: '10px', fontSize: '0.55rem', color: '#00b247', fontWeight: '900' },
  form: { display: 'flex', flexDirection: 'column', gap: '1.2rem' },
  inputRow: { display: 'flex', gap: '15px' },
  inputGroup: { flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  label: { fontSize: '0.6rem', fontWeight: '900', color: '#8d948a', textTransform: 'uppercase', letterSpacing: '0.5px' },
  inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  icon: { position: 'absolute', left: '12px', color: '#00b247', opacity: 0.7 },
  input: { width: '100%', padding: '0.85rem 0.85rem 0.85rem 2.5rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.85rem', outline: 'none', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', transition: '0.3s focus' },
  button: { width: '100%', padding: '1.1rem', backgroundColor: '#00b247', color: '#fff', border: 'none', borderRadius: '16px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', fontWeight: '900', fontSize: '0.9rem', boxShadow: '0 10px 30px rgba(0, 178, 71, 0.2)', marginTop: '0.5rem', textTransform: 'uppercase' },
  btnLink: { background: 'none', border: 'none', color: '#4a5248', fontSize: '0.7rem', fontWeight: '800', marginTop: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', textTransform: 'uppercase' },
  errorBox: { display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontSize: '0.7rem', justifyContent: 'center', fontWeight: '800', backgroundColor: 'rgba(239, 68, 68, 0.05)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(239, 68, 68, 0.2)' },
};

export default Cadastro;