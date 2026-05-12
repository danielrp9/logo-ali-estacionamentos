/**
 * Logo Ali Estacionamentos - Sign Up Page (Security & Architecture Compliant)
 * Author: Daniel Rodrigues Pereira | Year: 2026
 */
import React, { useState } from 'react';
import axios from 'axios';
import { 
  UserPlus, Car, ShieldCheck, ArrowLeft, Mail, 
  Lock, User, AlertCircle, Phone, MapPin, Hash 
} from 'lucide-react';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    cpf: '',
    username: '',
    nome_completo: '',
    email: '',
    telefone: '',
    cidade: 'Diamantina',
    bairro: '',
    rua: '',
    numero: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState<any>(null);

  const assets = {
    logo: "/logo.png",
    background: "/background/background1.jpg",
    structureColor: "#21261f", 
    borderColor: "rgba(255, 255, 255, 0.08)",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError({ detail: 'As senhas não coincidem.' });
      return;
    }

    try {
      await axios.post('/api/register/', {
        cpf: formData.cpf,
        username: formData.username,
        nome_completo: formData.nome_completo,
        email: formData.email,
        telefone: formData.telefone,
        cidade: formData.cidade,
        bairro: formData.bairro,
        rua: formData.rua,
        numero: formData.numero,
        password: formData.password
      });

      window.location.href = '/login';
    } catch (err: any) {
      setError(err.response?.data || { detail: 'Erro ao criar conta.' });
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
          <p style={styles.subtitle}>Cadastro</p>
          <div style={styles.securityBadge}>
            <ShieldCheck size={12} color="#00b247" />
            <span>Segurança Ativa</span>
          </div>
        </div>
        
        <form onSubmit={handleCadastro} style={styles.form}>
          {/* IDENTIFICAÇÃO BÁSICA */}
          <div style={styles.inputRow}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>CPF (Apenas números)</label>
              <div style={styles.inputWrapper}>
                <Hash size={16} style={styles.icon} />
                <input name="cpf" maxLength={11} placeholder="000.000.000-00" onChange={handleChange} style={styles.input} required />
              </div>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Usuário (Login)</label>
              <div style={styles.inputWrapper}>
                <User size={16} style={styles.icon} />
                <input name="username" placeholder="ex: daniel_ufvjm" onChange={handleChange} style={styles.input} required />
              </div>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Nome Completo</label>
            <div style={styles.inputWrapper}>
              <User size={16} style={styles.icon} />
              <input name="nome_completo" placeholder="Seu nome completo" onChange={handleChange} style={styles.input} required />
            </div>
          </div>

          <div style={styles.inputRow}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>E-mail</label>
              <div style={styles.inputWrapper}>
                <Mail size={16} style={styles.icon} />
                <input name="email" type="email" placeholder="email@dominio.com" onChange={handleChange} style={styles.input} required />
              </div>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Telefone</label>
              <div style={styles.inputWrapper}>
                <Phone size={16} style={styles.icon} />
                <input name="telefone" placeholder="(38) 9..." onChange={handleChange} style={styles.input} required />
              </div>
            </div>
          </div>

          {/* ENDEREÇO SEPARADO (EXIGÊNCIA ARQUITETURAL) */}
          <div style={styles.inputRow}>
            <div style={styles.inputGroup} style={{flex: 2}}>
              <label style={styles.label}>Rua</label>
              <input name="rua" placeholder="Rua / Av" onChange={handleChange} style={styles.inputSimple} required />
            </div>
            <div style={styles.inputGroup} style={{flex: 1}}>
              <label style={styles.label}>Nº</label>
              <input name="numero" placeholder="123" onChange={handleChange} style={styles.inputSimple} required />
            </div>
          </div>

          <div style={styles.inputRow}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Bairro</label>
              <input name="bairro" placeholder="Bairro" onChange={handleChange} style={styles.inputSimple} required />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Cidade</label>
              <input name="cidade" value={formData.cidade} onChange={handleChange} style={styles.inputSimple} required />
            </div>
          </div>

          {/* SENHAS */}
          <div style={styles.inputRow}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Senha</label>
              <div style={styles.inputWrapper}>
                <Lock size={16} style={styles.icon} />
                <input name="password" type="password" placeholder="Min. 8 char" onChange={handleChange} style={styles.input} required />
              </div>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Confirmação</label>
              <div style={styles.inputWrapper}>
                <Lock size={16} style={styles.icon} />
                <input name="confirmPassword" type="password" placeholder="Repita" onChange={handleChange} style={styles.input} required />
              </div>
            </div>
          </div>

          {error && (
            <div style={styles.errorBox}>
               <AlertCircle size={14} color="#ef4444" />
               <span>{error.detail || error.cpf || error.username || "Verifique os dados."}</span>
            </div>
          )}

          <button type="submit" style={styles.button}>
            <span>EFETUAR CADASTRO</span>
            <UserPlus size={18} />
          </button>

          <button type="button" onClick={() => window.location.href = '/login'} style={styles.btnLink}>
            <ArrowLeft size={14} /> JÁ TENHO CONTA
          </button>
        </form>
      </div>
    </div>
  );
};

const styles: any = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100vw', position: 'relative', backgroundSize: 'cover', backgroundPosition: 'center', padding: '40px 0' },
  backgroundOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(17, 19, 16, 0.95)', zIndex: 1 },
  card: { position: 'relative', zIndex: 2, backdropFilter: 'blur(25px)', padding: '2rem', borderRadius: '30px', boxShadow: '0 40px 100px rgba(0,0,0,0.7)', width: '95%', maxWidth: '550px' },
  header: { textAlign: 'center', marginBottom: '1.5rem' },
  logoWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '8px', cursor: 'pointer' },
  titleFallback: { fontSize: '1.2rem', fontWeight: '900', color: '#fff', margin: '5px 0 0', textTransform: 'uppercase' },
  subtitle: { fontSize: '0.65rem', color: '#8d948a', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' },
  securityBadge: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', marginTop: '10px', fontSize: '0.55rem', color: '#00b247', fontWeight: '900' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  inputRow: { display: 'flex', gap: '12px' },
  inputGroup: { flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  label: { fontSize: '0.55rem', fontWeight: '900', color: '#8d948a', textTransform: 'uppercase' },
  inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  icon: { position: 'absolute', left: '12px', color: '#00b247', opacity: 0.7 },
  input: { width: '100%', padding: '0.7rem 0.7rem 0.7rem 2.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.8rem', outline: 'none', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff' },
  inputSimple: { width: '100%', padding: '0.7rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.8rem', outline: 'none', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff' },
  button: { width: '100%', padding: '1rem', backgroundColor: '#00b247', color: '#fff', border: 'none', borderRadius: '14px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', fontWeight: '900', fontSize: '0.85rem', boxShadow: '0 10px 30px rgba(0, 178, 71, 0.2)', marginTop: '0.5rem' },
  btnLink: { background: 'none', border: 'none', color: '#4a5248', fontSize: '0.65rem', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', textTransform: 'uppercase' },
  errorBox: { display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontSize: '0.65rem', justifyContent: 'center', fontWeight: '800', backgroundColor: 'rgba(239, 68, 68, 0.05)', padding: '8px', borderRadius: '10px', border: '1px solid rgba(239, 68, 68, 0.2)' },
};

export default Cadastro;