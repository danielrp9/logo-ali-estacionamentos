/**
 * Logo Ali Estacionamentos - Sign Up Page (Future-Core v4.5 - Layout Correction)
 * Author: Daniel Rodrigues Pereira | Year: 2026
 * Finalidade: Registro de Operadores e Clientes (Architecture Compliant)
 */
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { 
  UserPlus, Car, ShieldCheck, ArrowLeft, Mail, 
  Lock, User, AlertCircle, Phone, Hash, Sparkles 
} from 'lucide-react';

interface ApiError {
  detail?: string;
  cpf?: string | string[];
  username?: string | string[];
  password?: string | string[];
}

const Cadastro: React.FC = () => {
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
  
  const [error, setError] = useState<ApiError | null>(null);

  const assets = {
    accent: "#00f061", 
    structureColor: "rgba(255, 255, 255, 0.02)", 
    borderColor: "rgba(255, 255, 255, 0.08)",
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCadastro = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validação de formato básico de CPF antes de enviar à API
    const cpfApenasNumeros = formData.cpf.replace(/\D/g, '');
    if (cpfApenasNumeros.length !== 11) {
      setError({ detail: 'Formato inválido: O CPF deve conter exatamente 11 dígitos numéricos.' });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError({ detail: 'As senhas não coincidem.' });
      return;
    }

    try {
      await axios.post('/api/register/', {
        cpf: cpfApenasNumeros, // Envia o CPF normalizado limpo
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

  // Função auxiliar para processar e extrair mensagens de erro textuais amigáveis
  const renderErrorMessage = (): string => {
    if (!error) return '';
    if (error.detail) return error.detail;
    
    const mensagens: string[] = [];
    
    if (error.cpf) {
      mensagens.push(`CPF: ${Array.isArray(error.cpf) ? error.cpf.join(' ') : error.cpf}`);
    }
    if (error.username) {
      mensagens.push(`Usuário: ${Array.isArray(error.username) ? error.username.join(' ') : error.username}`);
    }
    if (error.password) {
      mensagens.push(`Senha: ${Array.isArray(error.password) ? error.password.join(' ') : error.password}`);
    }

    return mensagens.length > 0 ? mensagens.join(' | ') : 'Falha na validação dos dados.';
  };

  return (
    <div style={styles.container} className="main-viewport">
      <CadastroStyle assets={assets} />
      
      <div className="liquid-orb orb-1"></div>
      <div className="liquid-orb orb-2"></div>
      <div className="backgroundGrid"></div>

      {/* Wrapper para garantir a centralização real sem vazamentos */}
      <main style={styles.centerWrapper}>
        <div style={styles.card} className="glassCard">
          <div style={styles.header}>
            <div style={styles.logoWrapper} onClick={() => window.location.href = '/'}>
              <div className="logoIcon"><Car size={28} color={assets.accent} /></div>
              <h2 style={styles.titleFallback}>LOGO ALI <span style={{fontWeight: 300, opacity: 0.4}}>| Estacionamentos</span></h2>
            </div>
            <div style={styles.badge}>
              <ShieldCheck size={12} color={assets.accent} />
              <span>SOLICITAR REGISTRO DE ACESSO</span>
            </div>
          </div>
          
          <form onSubmit={handleCadastro} style={styles.form}>
            <div className="form-row">
              <div className="input-field">
                <label style={styles.label}>CPF (NUMÉRICOS)</label>
                <div style={styles.inputWrapper}>
                  <Hash size={14} className="inputIcon" />
                  <input name="cpf" maxLength={14} placeholder="000.000.000-00" onChange={handleChange} style={styles.input} required />
                </div>
              </div>
              <div className="input-field">
                <label style={styles.label}>ID DE USUÁRIO</label>
                <div style={styles.inputWrapper}>
                  <User size={14} className="inputIcon" />
                  <input name="username" placeholder="ex: daniel_ufvjm" onChange={handleChange} style={styles.input} required />
                </div>
              </div>
            </div>

            <div className="input-field full-width">
              <label style={styles.label}>NOME COMPLETO DO OPERADOR</label>
              <div style={styles.inputWrapper}>
                <User size={14} className="inputIcon" />
                <input name="nome_completo" placeholder="Nome para identificação no sistema" onChange={handleChange} style={styles.input} required />
              </div>
            </div>

            <div className="form-row">
              <div className="input-field">
                <label style={styles.label}>E-MAIL INSTITUCIONAL</label>
                <div style={styles.inputWrapper}>
                  <Mail size={14} className="inputIcon" />
                  <input name="email" type="email" placeholder="usuario@dominio.com" onChange={handleChange} style={styles.input} required />
                </div>
              </div>
              <div className="input-field">
                <label style={styles.label}>CONTATO TELEFÔNICO</label>
                <div style={styles.inputWrapper}>
                  <Phone size={14} className="inputIcon" />
                  <input name="telefone" placeholder="(38) 9..." onChange={handleChange} style={styles.input} required />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="input-field" style={{ flex: 3 }}>
                <label style={styles.label}>LOGRADOURO (RUA / AV)</label>
                <input name="rua" placeholder="Nome da rua" onChange={handleChange} style={styles.inputSimple} required />
              </div>
              <div className="input-field" style={{ flex: 1 }}>
                <label style={styles.label}>Nº</label>
                <input name="numero" placeholder="123" onChange={handleChange} style={styles.inputSimple} required />
              </div>
            </div>

            <div className="form-row">
              <div className="input-field">
                <label style={styles.label}>BAIRRO</label>
                <input name="bairro" placeholder="Nome do bairro" onChange={handleChange} style={styles.inputSimple} required />
              </div>
              <div className="input-field">
                <label style={styles.label}>CIDADE BASE</label>
                <input name="cidade" value={formData.cidade} style={styles.inputSimple} readOnly />
              </div>
            </div>

            <div className="form-row">
              <div className="input-field">
                <label style={styles.label}>SENHA DE SEGURANÇA</label>
                <div style={styles.inputWrapper}>
                  <Lock size={14} className="inputIcon" />
                  <input name="password" type="password" placeholder="Mín. 8 dígitos" onChange={handleChange} style={styles.input} required />
                </div>
              </div>
              <div className="input-field">
                <label style={styles.label}>CONFIRMAÇÃO</label>
                <div style={styles.inputWrapper}>
                  <Lock size={14} className="inputIcon" />
                  <input name="confirmPassword" type="password" placeholder="Repita a senha" onChange={handleChange} style={styles.input} required />
                </div>
              </div>
            </div>

            {error && (
              <div style={styles.errorBox} className="shakeEffect">
                 <AlertCircle size={14} style={{ minWidth: '14px' }} />
                 <span style={{ textAlign: 'left' }}>{renderErrorMessage()}</span>
              </div>
            )}

            <button type="submit" className="btn-glow" style={styles.button}>
              <span>EFETUAR CADASTRO</span>
              <UserPlus size={18} />
            </button>

            <button type="button" onClick={() => window.location.href = '/login'} style={styles.btnLink} className="linkHover">
              <ArrowLeft size={14} /> JÁ TENHO CONTA
            </button>
          </form>
        </div>

        <div style={styles.footer}>
          <div className="footerBadge">
              <Sparkles size={10} color={assets.accent} />
              <span>SISTEMA ATIVO: DIAMANTINA v2.6</span>
          </div>
        </div>
      </main>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '100vh', 
    width: '100vw', 
    position: 'relative', 
    backgroundColor: '#020502', 
    overflowX: 'hidden',
    margin: 0,
    padding: 0
  },
  centerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    zIndex: 2,
    padding: '40px 20px'
  },
  card: { 
    position: 'relative', 
    padding: '2.5rem', 
    borderRadius: '40px', 
    width: '100%', 
    maxWidth: '600px', 
    textAlign: 'center' 
  },
  header: { marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  logoWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '15px' },
  titleFallback: { fontSize: '1rem', fontWeight: '900', color: '#fff', margin: 0, letterSpacing: '1px' },
  badge: { display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,240,97,0.1)', padding: '6px 14px', borderRadius: '100px', fontSize: '0.6rem', fontWeight: '800', color: '#00f061', border: '1px solid rgba(0,240,97,0.2)' },
  form: { display: 'flex', flexDirection: 'column', gap: '1.2rem' },
  label: { fontSize: '0.6rem', fontWeight: '900', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px', display: 'block' },
  inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center', width: '100%' },
  input: { width: '100%', padding: '0.9rem 1rem 0.9rem 2.8rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.85rem', outline: 'none', backgroundColor: 'rgba(0,0,0,0.3)', color: '#fff' },
  inputSimple: { width: '100%', padding: '0.9rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.85rem', outline: 'none', backgroundColor: 'rgba(0,0,0,0.3)', color: '#fff' },
  button: { width: '100%', padding: '1.1rem', backgroundColor: '#00f061', color: '#000', border: 'none', borderRadius: '18px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', fontWeight: '900', fontSize: '0.9rem', marginTop: '1rem' },
  btnLink: { background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: '0.65rem', fontWeight: '800', marginTop: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textTransform: 'uppercase' },
  errorBox: { display: 'flex', alignItems: 'center', gap: '10px', color: '#ff4d4d', fontSize: '0.75rem', justifyContent: 'center', fontWeight: '700', padding: '12px', backgroundColor: 'rgba(255, 77, 77, 0.05)', borderRadius: '12px', border: '1px solid rgba(255, 77, 77, 0.2)' },
  footer: { marginTop: '30px', position: 'relative' }
};

const CadastroStyle = ({ assets }: { assets: any }) => (
  <style>{`
    * { box-sizing: border-box; }
    body, html { margin: 0; padding: 0; }
    
    .glassCard {
        background: rgba(255, 255, 255, 0.02);
        backdrop-filter: blur(40px);
        border: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .logoIcon {
        background: linear-gradient(135deg, rgba(0,240,97,0.2), transparent);
        padding: 10px;
        border-radius: 50%;
        border: 1px solid rgba(0,240,97,0.2);
    }

    .inputIcon { position: absolute; left: 16px; color: ${assets.accent}; opacity: 0.6; }

    .liquid-orb { position: fixed; border-radius: 50%; filter: blur(120px); z-index: 1; pointer-events: none; opacity: 0.1; }
    .orb-1 { width: 600px; height: 600px; background: ${assets.accent}; top: -200px; right: -150px; }
    .orb-2 { width: 500px; height: 500px; background: #0080ff; bottom: -100px; left: -150px; opacity: 0.08; }

    .backgroundGrid {
        position: absolute; inset: 0; 
        background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
        background-size: 50px 50px; z-index: 1;
        mask-image: radial-gradient(circle at 50% 50%, black, transparent 90%);
    }

    .form-row { display: flex; gap: 15px; width: 100%; }
    .input-field { flex: 1; display: flex; flex-direction: column; text-align: left; }

    input:focus { border-color: ${assets.accent}44 !important; background-color: rgba(0,0,0,0.5) !important; }

    .btn-glow:hover {
        background-color: #fff !important;
        box-shadow: 0 0 30px ${assets.accent}66;
        transform: translateY(-2px);
    }

    .linkHover:hover { color: #fff !important; letter-spacing: 0.5px; transition: 0.3s; }

    .footerBadge { display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.2); font-size: 0.6rem; font-weight: 800; letter-spacing: 1px; }

    @media (max-width: 600px) {
        .form-row { flex-direction: column; gap: 1.2rem; }
    }
  `}</style>
);

export default Cadastro;