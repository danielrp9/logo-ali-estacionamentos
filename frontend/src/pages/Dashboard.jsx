/**
 * Logo Ali Estacionamentos - Dashboard (Terminal de Monitoramento)
 * Author: Daniel Rodrigues Pereira | Year: 2026
 * Estética: Kinetic Monitoring / Automotive Tech / Liquid Glass
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

  const assets = {
    accent: "#00f061", // Verde neon oficial do ecossistema Logo Ali
    borderColor: "rgba(255, 255, 255, 0.06)",
    textMuted: "rgba(255, 255, 255, 0.4)"
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
        <style>{`
          /* CONFIGURAÇÕES DE REATIVIDADE ESTÉTICA KINETIC GLASS */
          .dashboardMonitorCard {
            background: rgba(255, 255, 255, 0.02) !important;
            backdrop-filter: blur(40px) !important;
            -webkit-backdrop-filter: blur(40px) !important;
            border: 1px solid ${assets.borderColor} !important;
            transition: border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
          .dashboardMonitorCard:hover {
            border-color: rgba(0, 240, 97, 0.18) !important;
            transform: translateY(-4px) !important;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4) !important;
          }

          /* ANIMADO: PULSAÇÃO VIA INFRAESTRUTURA CSS */
          @keyframes pulseGlow {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 240, 97, 0.5); }
            70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(0, 240, 97, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 240, 97, 0); }
          }
          .pulseSignal {
            animation: pulseGlow 2s infinite !important;
            background-color: ${assets.accent} !important;
          }

          .btnCheckoutAction {
            background-color: ${assets.accent} !important;
            color: #000000 !important;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
          .btnCheckoutAction:hover {
            background-color: #ffffff !important;
            box-shadow: 0 0 25px ${assets.accent}44 !important;
          }

          /* SPINNING LOADER CUSTOMIZADO */
          .spinnerTerminal {
            width: 32px; height: 32px;
            border: 2px solid rgba(255, 255, 255, 0.05);
            border-radius: 50%;
            border-top-color: ${assets.accent};
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>

        {/* CABEÇALHO DO DASHBOARD */}
        <div style={styles.header}>
          <div style={styles.titleGroup}>
            <div style={{...styles.logoBox, border: `1px solid ${assets.borderColor}`, background: 'rgba(255,255,255,0.01)'}}>
              <Activity size={18} color={assets.accent} style={{ filter: `drop-shadow(0 0 8px ${assets.accent}44)` }} />
            </div>
            <div>
              <h2 style={styles.title}>
                {tipoUsuario === 'CL' ? 'Meus Veículos' : 'Monitoramento de Pátio'}
              </h2>
              <p style={{...styles.subtitle, color: assets.textMuted}}>Sincronizado • Diamantina MG</p>
            </div>
          </div>
          
          <div style={styles.badge} className="dashboardMonitorCard">
            <div className="pulseSignal" style={styles.pulse}></div>
            <span style={styles.badgeText}>{veiculos.length} VEÍCULOS OPERANTES</span>
          </div>
        </div>

        {/* ÁREA DE CONTEÚDO PRINCIPAL / LOADER */}
        {loading ? (
          <div style={styles.loaderContainer}>
            <div className="spinnerTerminal"></div>
          </div>
        ) : (
          <div style={styles.grid}>
            {veiculos.map((v) => (
              <div key={v.id} style={styles.card} className="dashboardMonitorCard">
                <div style={styles.cardHeader}>
                  <div style={{ ...styles.placaBadge, border: `1px solid rgba(0, 240, 97, 0.2)` }}>
                    <span style={{ color: assets.accent, fontWeight: '900' }}>{v.placa}</span>
                  </div>
                  <ShieldCheck size={16} color={assets.accent} style={{ filter: `drop-shadow(0 0 6px ${assets.accent}33)` }} />
                </div>
                
                <div style={styles.cardMain}>
                  <h3 style={styles.modeloText}>{v.modelo}</h3>
                  <span style={{...styles.corText, color: assets.textMuted}}>{v.cor}</span>
                </div>
                
                <div style={{ ...styles.detailsRow, borderTop: `1px solid ${assets.borderColor}` }}>
                  <div style={styles.detailItem}>
                    <Clock size={14} color={assets.textMuted} />
                    <span>{new Date(v.horario_entrada).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <CreditCard size={14} color={assets.accent} />
                    <span style={{...styles.valorText, color: assets.accent}}>R$ {v.valor_atual}</span>
                  </div>
                </div>
                
                <button onClick={() => handlePagamento(v.id)} style={styles.payButton} className="btnCheckoutAction">
                  <span style={{ fontWeight: '900', letterSpacing: '0.5px' }}>
                    {tipoUsuario === 'CL' ? 'PAGAR E SAIR' : 'LIBERAR SAÍDA'}
                  </span> 
                  <ChevronRight size={15} style={{ strokeWidth: 3 }} />
                </button>
              </div>
            ))}
            
            {veiculos.length === 0 && (
              <div style={styles.emptyContainer}>
                <p style={{...styles.empty, color: assets.textMuted}}>Pátio operacional livre de pendências.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

const styles = {
  container: { padding: '0.5rem 0 4rem', width: '100%', boxSizing: 'border-box' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', gap: '20px', flexWrap: 'wrap' },
  titleGroup: { display: 'flex', alignItems: 'center', gap: '14px' },
  logoBox: { padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: '1.4rem', fontWeight: '900', color: '#fff', margin: 0, textTransform: 'uppercase', letterSpacing: '-0.3px' },
  subtitle: { fontSize: '0.75rem', fontWeight: '600', margin: '4px 0 0 0', letterSpacing: '0.5px' },
  badge: { display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 18px', borderRadius: '100px' },
  badgeText: { fontSize: '0.65rem', fontWeight: '900', color: '#fff', letterSpacing: '0.5px' },
  pulse: { width: '8px', height: '8px', borderRadius: '50%' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', width: '100%' },
  card: { borderRadius: '24px', padding: '1.8rem', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.4rem' },
  placaBadge: { backgroundColor: 'rgba(0,0,0,0.2)', padding: '6px 14px', borderRadius: '10px', fontSize: '0.85rem', letterSpacing: '0.5px' },
  modeloText: { fontSize: '1.35rem', fontWeight: '900', color: '#fff', margin: 0, letterSpacing: '-0.3px' },
  corText: { fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', display: 'block', marginTop: '4px', letterSpacing: '0.5px' },
  detailsRow: { display: 'flex', justifyContent: 'space-between', padding: '14px 0 0 0', margin: '1.4rem 0 1.5rem 0' },
  detailItem: { display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '0.85rem', fontWeight: '600' },
  valorText: { fontWeight: '900' },
  payButton: { width: '100%', padding: '14px', border: 'none', borderRadius: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.8rem' },
  loaderContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '6rem 0' },
  emptyContainer: { gridColumn: '1/-1', width: '100%', display: 'flex', justifyContent: 'center' },
  empty: { textAlign: 'center', fontSize: '0.9rem', fontWeight: '600', paddingTop: '3rem' }
};

export default Dashboard;