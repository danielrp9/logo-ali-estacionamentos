/**
 * Logo Ali Estacionamentos - Sign Up Page
 * Author: Daniel Rodrigues Pereira | Year: 2026
 * Estética: Deep Olive Glass / Kinetic Minimalism
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserPlus, Car, ShieldCheck, ArrowLeft, Mail, Lock, User } from 'lucide-react';

const Cadastro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  // --- CONFIGURAÇÕES DE ATIVOS ---
  const assets = {
    logo: "/logo.png",
    background: "/background/background1.jpg",
    structureColor: "#21261f", 
    borderColor: "rgba(255, 255, 255, 0.08)",
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      // Endpoint sugerido para criação de conta
      await axios.post('http://127.0.0.1:8000/api/register/', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      // Redireciona para o login após sucesso
      window.location.href = '/login';
    } catch (err) {
      setError(err.response?.data?.erro || 'Erro ao criar conta. Tente outro usuário.');
    }
  };

  return (
    <div style={{...styles.container, backgroundImage: `url(${assets.background})`}}>
      <div style={styles.backgroundOverlay}></div>

      <div style={{...styles.card, backgroundColor: assets.structureColor, border: `1px solid ${assets.borderColor}`}}>
        <div style={styles.header}>
          <div style={styles.logoWrapper} onClick={() => navigate('/')}>
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
          <p style={styles.subtitle}>Crie sua conta tecnológica</p>
        </div>
        
        <form onSubmit={handleCadastro} style={styles.form}>
          <div style={styles.inputRow}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Usuário</label>
              <div style={styles.inputWrapper}>
                <User size={16} style={styles.icon} />
                <input 
                  name="username"
                  type="text" 
                  placeholder="Seu ID"
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
                  placeholder="contato@exemplo.com"
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
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
                  placeholder="••••••••"
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Confirmar</label>
              <div style={styles.inputWrapper}>
                <Lock size={16} style={styles.icon} />
                <input 
                  name="confirmPassword"
                  type="password" 
                  placeholder="••••••••"
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
            </div>
          </div>

          {error && (
            <div style={styles.errorBox}>
               <ShieldCheck size={14} color="#ef4444" />
               <span>{error}</span>
            </div>
          )}

          <button type="submit" style={styles.button}>
            <span>Cadastrar Agora</span>
            <UserPlus size={18} />
          </button>

          <button type="button" onClick={() => navigate('/login')} style={styles.btnLink}>
            <ArrowLeft size={14} /> Já tenho uma conta
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', position: 'relative', backgroundSize: 'cover', backgroundPosition: 'center', overflow: 'hidden' },
  backgroundOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(17, 19, 16, 0.85)', zIndex: 1 },
  card: { position: 'relative', zIndex: 2, backdropFilter: 'blur(20px)', padding: '2rem', borderRadius: '35px', boxShadow: '0 40px 100px rgba(0,0,0,0.6)', width: '90%', maxWidth: '450px' },
  header: { textAlign: 'center', marginBottom: '1.5rem' },
  logoWrapper: { display: 'flex', justifyContent: 'center', marginBottom: '8px', cursor: 'pointer' },
  mainLogo: { height: '45px', width: 'auto' },
  titleFallback: { fontSize: '1.2rem', fontWeight: '900', color: '#fff', margin: '5px 0 0' },
  subtitle: { fontSize: '0.65rem', color: '#8d948a', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' },
  form: { display: 'flex', flexDirection: 'column' },
  inputRow: { display: 'flex', gap: '15px', marginBottom: '1rem' },
  inputGroup: { flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  label: { fontSize: '0.65rem', fontWeight: '900', color: '#fff', textTransform: 'uppercase', opacity: 0.8 },
  inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  icon: { position: 'absolute', left: '12px', color: '#4a5248' },
  input: { width: '100%', padding: '0.8rem 0.8rem 0.8rem 2.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.9rem', outline: 'none', backgroundColor: 'rgba(0,0,0,0.3)', color: '#fff' },
  button: { width: '100%', padding: '1rem', backgroundColor: '#00b247', color: '#fff', border: 'none', borderRadius: '14px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', fontWeight: '900', fontSize: '0.95rem', boxShadow: '0 12px 24px rgba(0, 178, 71, 0.3)', marginTop: '0.5rem' },
  btnLink: { background: 'none', border: 'none', color: '#8d948a', fontSize: '0.75rem', fontWeight: '700', marginTop: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' },
  errorBox: { display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontSize: '0.75rem', justifyContent: 'center', marginBottom: '1rem', fontWeight: '700' },
};

export default Cadastro;