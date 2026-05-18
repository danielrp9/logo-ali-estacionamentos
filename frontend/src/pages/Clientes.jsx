/**
 * Logo Ali Estacionamentos - Diretório de Clientes (Liquid Glass Edition)
 * Author: Daniel Rodrigues Pereira | Year: 2026
 * Finalidade: Visualização granular com máscara de CPF (Norma N07.1) e LGPD N03.1
 */
import React, { useEffect, useState } from 'react';
import api from '../api';
import Layout from '../components/Layout';
import { 
  User, Phone, MapPin, Search, Hash, 
  Car, Mail, Eye, EyeOff, ChevronDown, ChevronUp
} from 'lucide-react';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const [expandido, setExpandido] = useState(null);
  const [showCpf, setShowCpf] = useState({});

  const assets = {
    accent: "#00f061", // Verde neon oficial do ecossistema Logo Ali
    borderColor: "rgba(255, 255, 255, 0.06)",
    textMuted: "rgba(255, 255, 255, 0.4)"
  };

  useEffect(() => { fetchClientes(); }, []);

  const fetchClientes = async () => {
    try {
      const response = await api.get('/clientes/');
      setClientes(response.data);
    } catch (err) { 
      console.error("Erro ao carregar clientes"); 
    } finally { 
      setLoading(false); 
    }
  };

  const toggleCpf = (cpf) => setShowCpf(prev => ({ ...prev, [cpf]: !prev[cpf] }));
  const maskCpf = (cpf) => cpf ? `${cpf.substring(0, 3)}.***.***-${cpf.substring(9, 11)}` : "";

  // Filtro avançado: Nome, CPF ou Placas dos veículos vinculados
  const filtrados = clientes.filter(c => 
    c.nome_completo.toLowerCase().includes(busca.toLowerCase()) ||
    c.cpf.includes(busca) ||
    c.veiculos_ativos.some(v => v.placa.toLowerCase().includes(busca.toLowerCase()))
  );

  return (
    <Layout>
      <div style={styles.container}>
        <style>{`
          /* INTERFACES TRANSLÚCIDAS E REATIVIDADE */
          .clientGlassCard {
            background: rgba(255, 255, 255, 0.02) !important;
            backdrop-filter: blur(40px) !important;
            -webkit-backdrop-filter: blur(40px) !important;
            border: 1px solid ${assets.borderColor} !important;
            transition: border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
          .clientGlassCard:hover {
            border-color: rgba(0, 240, 97, 0.15) !important;
          }

          .searchBarSection {
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
          .searchBarSection:focus-within {
            border-color: ${assets.accent}44 !important;
            background-color: rgba(0,0,0,0.4) !important;
            box-shadow: 0 0 20px ${assets.accent}11 !important;
          }
          .searchBarSection:focus-within svg {
            color: ${assets.accent} !important;
          }

          .btnExpandAction {
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
          .btnExpandAction:hover {
            background-color: rgba(255, 255, 255, 0.05) !important;
            border-color: rgba(255, 255, 255, 0.15) !important;
            color: #ffffff !important;
          }

          .btnEyeGlow { transition: color 0.2s ease; }
          .btnEyeGlow:hover { color: ${assets.accent} !important; }

          .loaderSync {
            width: 28px; height: 28px;
            border: 2px solid rgba(255, 255, 255, 0.05);
            border-radius: 50%;
            border-top-color: ${assets.accent};
            animation: spinClient 0.8s linear infinite;
          }
          @keyframes spinClient { to { transform: rotate(360deg); } }

          @media (max-width: 768px) {
            .clientHeaderRow {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 1.5rem !important;
            }
            .searchBarSection {
              max-width: 100% !important;
            }
          }
        `}</style>

        {/* CABEÇALHO */}
        <div style={styles.header} className="clientHeaderRow">
          <div>
            <h2 style={styles.title}>Lista de Clientes</h2>
            <p style={{...styles.subtitle, color: assets.textMuted}}>Gerenciamento de Cadastros</p>
          </div>
          <div style={styles.searchBar} className="clientGlassCard searchBarSection">
            <Search size={16} color="rgba(255,255,255,0.2)" style={{ transition: 'color 0.25s ease' }} />
            <input 
              placeholder="Buscar Nome, CPF ou Placa..." 
              style={styles.searchInput} 
              onChange={(e) => setBusca(e.target.value)} 
            />
          </div>
        </div>

        {/* LISTAGEM OU AGUARDO DE SINCRONISMO */}
        {loading ? (
          <div style={styles.loaderContainer}>
            <div className="loaderSync"></div>
            <p style={{...styles.loaderText, color: assets.textMuted}}>Sincronizando registros estruturais...</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {filtrados.map((c) => (
              <div 
                key={c.cpf} 
                style={styles.card} 
                className="clientGlassCard"
              >
                <div style={styles.cardHeader}>
                  <div style={{...styles.avatarBox, border: `1px solid ${assets.borderColor}`, backgroundColor: 'rgba(0,0,0,0.15)'}}Custom>
                    <User size={16} color={assets.accent} />
                  </div>
                  {c.veiculos_ativos.length > 0 && (
                    <div style={{...styles.badgeAtivo, color: assets.accent, borderColor: 'rgba(0,240,97,0.2)', backgroundColor: 'rgba(0,240,97,0.02)'}}>
                      PÁTIO ATIVO
                    </div>
                  )}
                </div>

                <div style={styles.mainInfo}>
                  <h3 style={styles.nome}>{c.nome_completo}</h3>
                  <div style={{...styles.cpfRow, color: assets.textMuted}}>
                    <span style={{ letterSpacing: '0.5px' }}>{showCpf[c.cpf] ? c.cpf : maskCpf(c.cpf)}</span>
                    <button onClick={() => toggleCpf(c.cpf)} style={styles.btnIcon} className="btnEyeGlow">
                      {showCpf[c.cpf] ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                  </div>
                </div>

                <button 
                  onClick={() => setExpandido(expandido === c.cpf ? null : c.cpf)} 
                  style={{...styles.btnExpandir, color: assets.textMuted}}
                  className="btnExpandAction"
                >
                  {expandido === c.cpf ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  <span style={{ fontWeight: '800', fontSize: '0.65rem', letterSpacing: '0.5px' }}>
                    {expandido === c.cpf ? "RECOLHER REGISTRO" : "VER DADOS COMPLETOS"}
                  </span>
                </button>

                {/* CONTEÚDO EXPANSÍVEL GRANULAR */}
                {expandido === c.cpf && (
                  <div style={{...styles.expandArea, borderTop: `1px solid ${assets.borderColor}`}}>
                    <div style={styles.infoRow}>
                      <Phone size={13} color={assets.accent} style={{ opacity: 0.7 }} />
                      <span style={{ color: 'rgba(255,255,255,0.75)' }}>{c.telefone}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <Mail size={13} color={assets.accent} style={{ opacity: 0.7 }} />
                      <span style={{ color: 'rgba(255,255,255,0.75)' }}>{c.email}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <MapPin size={13} color={assets.accent} style={{ opacity: 0.7 }} />
                      <span style={{ color: 'rgba(255,255,255,0.75)', lineHeight: '1.4' }}>{c.rua}, {c.numero} — {c.bairro}</span>
                    </div>
                    
                    {c.veiculos_ativos.length > 0 && (
                      <div style={styles.veiculosList}>
                        <p style={{...styles.listLabel, color: assets.textMuted}}>Veículos Estacionados:</p>
                        {c.veiculos_ativos.map(v => (
                          <div key={v.id} style={{...styles.veiculoTag, border: `1px solid ${assets.borderColor}`, backgroundColor: 'rgba(0,0,0,0.1)'}}>
                            <Car size={12} color={assets.accent} /> 
                            <span><strong>{v.placa}</strong> • {v.modelo}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

const styles = {
  container: { padding: '0.5rem 0 4rem', width: '100%', boxSizing: 'border-box' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', gap: '20px' },
  title: { fontSize: '1.4rem', fontWeight: '900', color: '#fff', margin: 0, textTransform: 'uppercase', letterSpacing: '-0.3px' },
  subtitle: { fontSize: '0.75rem', fontWeight: '600', marginTop: '4px', letterSpacing: '0.5px' },
  searchBar: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', borderRadius: '14px', width: '100%', maxWidth: '380px', boxSizing: 'border-box', backgroundColor: 'rgba(0,0,0,0.1)' },
  searchInput: { background: 'none', border: 'none', outline: 'none', color: '#fff', fontSize: '0.85rem', width: '100%', fontWeight: '600' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', width: '100%' },
  card: { padding: '1.8rem', borderRadius: '24px', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' },
  avatarBox: { padding: '8px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  badgeAtivo: { fontSize: '0.6rem', fontWeight: '900', padding: '3px 10px', borderRadius: '100px', letterSpacing: '0.5px' },
  nome: { fontSize: '1.15rem', fontWeight: '900', color: '#fff', margin: '0 0 4px 0', letterSpacing: '-0.2px' },
  cpfRow: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: '700' },
  btnIcon: { background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', padding: '4px', display: 'flex', alignItems: 'center' },
  btnExpandir: { width: '100%', marginTop: '1.4rem', backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', padding: '12px', borderRadius: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', boxSizing: 'border-box' },
  expandArea: { marginTop: '1.4rem', paddingTop: '1.4rem', display: 'flex', flexDirection: 'column', gap: '12px' },
  infoRow: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', fontWeight: '600' },
  veiculosList: { marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '6px' },
  listLabel: { fontSize: '0.6rem', fontWeight: '900', marginBottom: '4px', letterSpacing: '1px' },
  veiculoTag: { color: '#fff', fontSize: '0.75rem', fontWeight: '600', padding: '10px 14px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', boxSizing: 'border-box' },
  loaderContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '6rem 0', gap: '14px' },
  loaderText: { fontSize: '0.85rem', fontWeight: '600', letterSpacing: '0.3px', margin: 0 }
};

export default Clientes;