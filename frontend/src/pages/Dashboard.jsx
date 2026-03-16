/**
 * Logo Ali Estacionamentos - Dashboard (Deep Earth Edition)
 * Author: Daniel Rodrigues Pereira | Year: 2026
 * Estética: Kinetic Monitoring / Automotive Tech
 */
import React, { useEffect, useState } from 'react';
import api from '../api';
import Layout from '../components/Layout';
import { 
  Car, Clock, AlertTriangle, CreditCard, 
  ShieldCheck, ChevronRight, Activity, Search
} from 'lucide-react';

const Dashboard = () => {
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- CONFIGURAÇÕES DE TEMA ---
  const theme = {
    structure: "#21261f", // Marrom esverdeado perceptível
    background: "#111310",
    border: "rgba(255, 255, 255, 0.08)", // Visibilidade em ambientes claros
    accent: "#00b247"
  };

  useEffect(() => {
    fetchVeiculos();
  }, []);

  const fetchVeiculos = async () => {
    try {
      const response = await api.get('/veiculos/');
      setVeiculos(response.data);
    } catch (err) {
      console.error("Erro ao buscar veículos", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePagamento = async (id) => {
    try {
      const response = await api.post(`/pagamento/checkout/${id}/`);
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (err) {
      const erroMsg = err.response?.data?.erro || "Erro ao processar pagamento.";
      alert(`Falha: ${erroMsg}`);
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        
        {/* HEADER TÁTICO */}
        <div style={styles.header}>
          <div style={styles.titleGroup}>
            <div style={{...styles.logoBox, backgroundColor: theme.structure, border: `1px solid ${theme.border}`}}>
              <Activity size={20} color={theme.accent} />
            </div>
            <div>
              <h2 style={styles.title}>Pátio em Tempo Real</h2>
              <p style={styles.subtitle}>Sincronizado com Diamantina • MG</p>
            </div>
          </div>
          
          <div style={{...styles.badge, backgroundColor: theme.structure, border: `1px solid ${theme.border}`}}>
            <div style={styles.pulse}></div>
            <span style={styles.badgeText}>{veiculos.length} VEÍCULOS NO PÁTIO</span>
          </div>
        </div>

        {loading ? (
          <div style={styles.loaderContainer}>
            <div className="spinner"></div>
            <p style={{marginTop: '1rem'}}>Sincronizando banco de dados...</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {veiculos.map((v) => (
              <div key={v.id} style={{...styles.card, backgroundColor: theme.structure, border: `1px solid ${theme.border}`}}>
                <div style={styles.cardHeader}>
                  <div style={styles.placaBadge}>{v.placa}</div>
                  <div style={styles.statusIndicator}>
                    <span style={styles.statusLabel}>MONITORADO</span>
                    <ShieldCheck size={16} color={theme.accent} />
                  </div>
                </div>

                <div style={styles.cardMain}>
                  <h3 style={styles.modeloText}>{v.modelo}</h3>
                  <div style={styles.corTag}>
                    <div style={{...styles.corDot, backgroundColor: v.cor_hex || '#555'}}></div>
                    <span style={styles.corText}>{v.cor}</span>
                  </div>
                </div>

                <div style={styles.detailsRow}>
                  <div style={styles.detailItem}>
                    <Clock size={14} color="#8d948a" />
                    <span style={styles.detailValue}>
                      {new Date(v.horario_entrada).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  <div style={styles.detailItem}>
                    <CreditCard size={14} color={theme.accent} />
                    <span style={styles.valorText}>R$ {v.valor_atual}</span>
                  </div>
                </div>

                {v.avarias && (
                  <div style={styles.avariaBox}>
                    <AlertTriangle size={14} color="#f59e0b" />
                    <p style={styles.avariaText}>{v.avarias}</p>
                  </div>
                )}

                <button 
                  onClick={() => handlePagamento(v.id)} 
                  style={styles.payButton}
                >
                  REGISTRAR SAÍDA <ChevronRight size={16} />
                </button>
              </div>
            ))}

            {veiculos.length === 0 && (
              <div style={styles.emptyState}>
                <div style={{...styles.emptyIconBox, border: `2px dashed ${theme.border}`}}>
                  <Car size={48} color={theme.structure} />
                </div>
                <h3 style={styles.emptyTitle}>Pátio Livre</h3>
                <p style={styles.emptyDesc}>Nenhum veículo ativo no sistema no momento.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .spinner {
          width: 30px;
          height: 30px;
          border: 3px solid rgba(0, 178, 71, 0.1);
          border-top: 3px solid #00b247;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </Layout>
  );
};

const styles = {
  container: { padding: '1rem 0 4rem' },
  header: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: '3rem',
    flexWrap: 'wrap',
    gap: '1.5rem'
  },
  titleGroup: { display: 'flex', alignItems: 'center', gap: '1.2rem' },
  logoBox: { padding: '12px', borderRadius: '15px', display: 'flex', alignItems: 'center' },
  title: { fontSize: '1.4rem', fontWeight: '900', color: '#fff', margin: 0, letterSpacing: '-1px', textTransform: 'uppercase' },
  subtitle: { fontSize: '0.8rem', color: '#8d948a', margin: '4px 0 0', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' },
  
  badge: { 
    display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 20px', borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
  },
  badgeText: { fontSize: '0.7rem', fontWeight: '900', color: '#fff', letterSpacing: '1px' },
  pulse: { width: '8px', height: '8px', backgroundColor: '#00b247', borderRadius: '50%', boxShadow: '0 0 12px #00b247' },

  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
    gap: '20px' 
  },
  card: { 
    borderRadius: '30px', 
    padding: '1.8rem', 
    boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
    transition: '0.3s'
  },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
  placaBadge: { 
    backgroundColor: '#00b247', color: '#fff', padding: '6px 14px', borderRadius: '10px', 
    fontSize: '0.9rem', fontWeight: '900', letterSpacing: '1px' 
  },
  statusIndicator: { display: 'flex', alignItems: 'center', gap: '6px' },
  statusLabel: { fontSize: '0.6rem', fontWeight: '800', color: '#8d948a', letterSpacing: '1px' },

  cardMain: { marginBottom: '1.8rem' },
  modeloText: { fontSize: '1.4rem', fontWeight: '900', color: '#fff', margin: '0 0 8px 0', letterSpacing: '-0.5px' },
  corTag: { display: 'flex', alignItems: 'center', gap: '8px' },
  corDot: { width: '10px', height: '10px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)' },
  corText: { fontSize: '0.8rem', color: '#8d948a', fontWeight: '700', textTransform: 'uppercase' },
  
  detailsRow: { 
    display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', 
    padding: '15px 0', borderTop: '1px solid rgba(255,255,255,0.05)' 
  },
  detailItem: { display: 'flex', alignItems: 'center', gap: '8px' },
  detailValue: { color: '#fff', fontSize: '0.9rem', fontWeight: '700' },
  valorText: { fontWeight: '900', color: '#00b247', fontSize: '1.1rem' },
  
  avariaBox: { 
    display: 'flex', alignItems: 'flex-start', gap: '10px', backgroundColor: 'rgba(245, 158, 11, 0.05)', 
    padding: '12px', borderRadius: '15px', marginBottom: '1.5rem', border: '1px solid rgba(245, 158, 11, 0.2)'
  },
  avariaText: { color: '#f59e0b', fontSize: '0.75rem', fontWeight: '600', margin: 0, lineHeight: '1.4' },
  
  payButton: { 
    width: '100%', padding: '16px', backgroundColor: '#fff', color: '#111310', border: 'none', 
    borderRadius: '16px', fontWeight: '900', cursor: 'pointer', display: 'flex',
    alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.85rem'
  },
  
  emptyState: { gridColumn: '1/-1', padding: '6rem 0', textAlign: 'center' },
  emptyIconBox: { width: '100px', height: '100px', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' },
  emptyTitle: { color: '#fff', fontSize: '1.5rem', fontWeight: '900', margin: 0 },
  emptyDesc: { color: '#8d948a', fontSize: '0.9rem', marginTop: '10px' },
  loaderContainer: { textAlign: 'center', padding: '8rem 0', color: '#8d948a' }
};

export default Dashboard;