/**
 * Logo Ali Estacionamentos - Dashboard (Terminal de Monitoramento)
 * Author: Daniel Rodrigues Pereira | Year: 2026
 * Estética: Kinetic Monitoring / Automotive Tech
 */
import React, { useEffect, useState } from 'react';
import api from '../api';
import Layout from '../components/Layout';
import { 
  Car, Clock, AlertTriangle, CreditCard, 
  ShieldCheck, ChevronRight, Activity
} from 'lucide-react';

const Dashboard = () => {
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const tipoUsuario = localStorage.getItem('tipo_usuario');

  const theme = {
    structure: "#21261f", 
    background: "#111310",
    border: "rgba(255, 255, 255, 0.08)", 
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
      if (response.data.url) window.location.href = response.data.url;
    } catch (err) {
      alert(`Falha: ${err.response?.data?.erro || "Erro no processamento"}`);
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.titleGroup}>
            <div style={{...styles.logoBox, backgroundColor: theme.structure, border: `1px solid ${theme.border}`}}>
              <Activity size={20} color={theme.accent} />
            </div>
            <div>
              <h2 style={styles.title}>
                {tipoUsuario === 'CL' ? 'Meus Veículos' : 'Monitoramento de Pátio'}
              </h2>
              <p style={styles.subtitle}>Sincronizado • Diamantina MG</p>
            </div>
          </div>
          <div style={{...styles.badge, backgroundColor: theme.structure, border: `1px solid ${theme.border}`}}>
            <div style={styles.pulse}></div>
            <span style={styles.badgeText}>{veiculos.length} VEÍCULOS NO PÁTIO</span>
          </div>
        </div>

        {loading ? (
          <div style={styles.loaderContainer}><div className="spinner"></div></div>
        ) : (
          <div style={styles.grid}>
            {veiculos.map((v) => (
              <div key={v.id} style={{...styles.card, backgroundColor: theme.structure, border: `1px solid ${theme.border}`}}>
                <div style={styles.cardHeader}>
                  <div style={styles.placaBadge}>{v.placa}</div>
                  <ShieldCheck size={16} color={theme.accent} />
                </div>
                <div style={styles.cardMain}>
                  <h3 style={styles.modeloText}>{v.modelo}</h3>
                  <span style={styles.corText}>{v.cor}</span>
                </div>
                <div style={styles.detailsRow}>
                  <div style={styles.detailItem}><Clock size={14} color="#8d948a" /><span>{new Date(v.horario_entrada).toLocaleTimeString()}</span></div>
                  <div style={styles.detailItem}><CreditCard size={14} color={theme.accent} /><span style={styles.valorText}>R$ {v.valor_atual}</span></div>
                </div>
                <button onClick={() => handlePagamento(v.id)} style={styles.payButton}>
                  {tipoUsuario === 'CL' ? 'PAGAR E SAIR' : 'LIBERAR SAÍDA'} <ChevronRight size={16} />
                </button>
              </div>
            ))}
            {veiculos.length === 0 && <p style={styles.empty}>Pátio Livre.</p>}
          </div>
        )}
      </div>
    </Layout>
  );
};

const styles = {
  container: { padding: '1rem 0 4rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' },
  titleGroup: { display: 'flex', alignItems: 'center', gap: '1.2rem' },
  logoBox: { padding: '12px', borderRadius: '15px' },
  title: { fontSize: '1.4rem', fontWeight: '900', color: '#fff', margin: 0, textTransform: 'uppercase' },
  subtitle: { fontSize: '0.8rem', color: '#8d948a', fontWeight: '700' },
  badge: { display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 20px', borderRadius: '15px' },
  badgeText: { fontSize: '0.7rem', fontWeight: '900', color: '#fff' },
  pulse: { width: '8px', height: '8px', backgroundColor: '#00b247', borderRadius: '50%', boxShadow: '0 0 12px #00b247' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' },
  card: { borderRadius: '30px', padding: '1.8rem' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' },
  placaBadge: { backgroundColor: '#00b247', color: '#fff', padding: '6px 14px', borderRadius: '10px', fontWeight: '900' },
  modeloText: { fontSize: '1.4rem', fontWeight: '900', color: '#fff', margin: 0 },
  corText: { fontSize: '0.8rem', color: '#8d948a', fontWeight: '700', textTransform: 'uppercase' },
  detailsRow: { display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '1rem 0' },
  detailItem: { display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '0.9rem' },
  valorText: { fontWeight: '900', color: '#00b247' },
  payButton: { width: '100%', padding: '16px', backgroundColor: '#fff', color: '#111310', border: 'none', borderRadius: '16px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
  empty: { gridColumn: '1/-1', textAlign: 'center', color: '#8d948a', paddingTop: '4rem' }
};

export default Dashboard;