/**
 * Logo Ali Estacionamentos - Diretório de Clientes (Auditoria Edition)
 * Author: Daniel Rodrigues Pereira | Year: 2026
 * Finalidade: Visualização granular com máscara de CPF (Norma N07.1)
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

  const theme = { structure: "#21261f", background: "#111310", border: "rgba(255, 255, 255, 0.08)", accent: "#00b247" };

  useEffect(() => { fetchClientes(); }, []);

  const fetchClientes = async () => {
    try {
      const response = await api.get('/clientes/');
      setClientes(response.data);
    } catch (err) { console.error("Erro ao carregar clientes"); } finally { setLoading(false); }
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
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>Diretório de Clientes</h2>
            <p style={styles.subtitle}>Auditoria Digital • LGPD N03.1</p>
          </div>
          <div style={{...styles.searchBar, backgroundColor: theme.structure, border: `1px solid ${theme.border}`}}>
            <Search size={18} color={theme.accent} />
            <input placeholder="Buscar Nome, CPF ou Placa..." style={styles.searchInput} onChange={(e) => setBusca(e.target.value)} />
          </div>
        </div>

        {loading ? <div style={styles.loader}>Sincronizando...</div> : (
          <div style={styles.grid}>
            {filtrados.map((c) => (
              <div key={c.cpf} style={{...styles.card, backgroundColor: theme.structure, border: `1px solid ${theme.border}`, height: expandido === c.cpf ? 'auto' : '220px'}}>
                <div style={styles.cardHeader}>
                  <div style={styles.avatarBox}><User size={20} color={theme.accent} /></div>
                  {c.veiculos_ativos.length > 0 && <div style={styles.badgeAtivo}>ATIVO</div>}
                </div>

                <div style={styles.mainInfo}>
                  <h3 style={styles.nome}>{c.nome_completo}</h3>
                  <div style={styles.cpfRow}>
                    <span>{showCpf[c.cpf] ? c.cpf : maskCpf(c.cpf)}</span>
                    <button onClick={() => toggleCpf(c.cpf)} style={styles.btnIcon}>
                      {showCpf[c.cpf] ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                <button onClick={() => setExpandido(expandido === c.cpf ? null : c.cpf)} style={styles.btnExpandir}>
                  {expandido === c.cpf ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  {expandido === c.cpf ? "RECOLHER" : "VER DADOS COMPLETOS"}
                </button>

                {expandido === c.cpf && (
                  <div style={styles.expandArea}>
                    <div style={styles.infoRow}><Phone size={14} color={theme.accent} /><span>{c.telefone}</span></div>
                    <div style={styles.infoRow}><Mail size={14} color={theme.accent} /><span>{c.email}</span></div>
                    <div style={styles.infoRow}><MapPin size={14} color={theme.accent} /><span>{c.rua}, {c.numero} - {c.bairro}</span></div>
                    {c.veiculos_ativos.length > 0 && (
                      <div style={styles.veiculosList}>
                        <p style={styles.listLabel}>PLACAS NO PÁTIO:</p>
                        {c.veiculos_ativos.map(v => <div key={v.id} style={styles.veiculoTag}><Car size={12} /> {v.placa} • {v.modelo}</div>)}
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
  container: { padding: '1rem 0 4rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' },
  title: { fontSize: '1.8rem', fontWeight: '900', color: '#fff', margin: 0 },
  subtitle: { fontSize: '0.8rem', color: '#8d948a', fontWeight: '700', textTransform: 'uppercase' },
  searchBar: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', borderRadius: '15px', width: '400px' },
  searchInput: { background: 'none', border: 'none', outline: 'none', color: '#fff', fontSize: '0.9rem', width: '100%' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' },
  card: { padding: '1.8rem', borderRadius: '30px', transition: 'all 0.3s ease', overflow: 'hidden', position: 'relative' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' },
  avatarBox: { padding: '10px', borderRadius: '12px', backgroundColor: 'rgba(0,0,0,0.3)' },
  badgeAtivo: { color: '#00b247', fontSize: '0.6rem', fontWeight: '900', border: '1px solid #00b247', padding: '2px 8px', borderRadius: '5px' },
  nome: { fontSize: '1.1rem', fontWeight: '800', color: '#fff', margin: '0 0 5px 0' },
  cpfRow: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.75rem', color: '#4a5248', fontWeight: '800' },
  btnIcon: { background: 'none', border: 'none', cursor: 'pointer', color: '#8d948a', padding: 0 },
  btnExpandir: { width: '100%', marginTop: '1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', color: '#8d948a', padding: '10px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
  expandArea: { marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '12px' },
  infoRow: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#8d948a' },
  veiculosList: { marginTop: '10px' },
  listLabel: { fontSize: '0.6rem', fontWeight: '900', color: '#4a5248', marginBottom: '8px' },
  veiculoTag: { color: '#fff', fontSize: '0.75rem', fontWeight: '700', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' },
  loader: { textAlign: 'center', padding: '5rem', color: '#8d948a' }
};

export default Clientes;