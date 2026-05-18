/**
 * Logo Ali Estacionamentos - Histórico de Auditoria (Liquid Glass Edition)
 * Author: Daniel Rodrigues Pereira | Year: 2026
 * Estética: Kinetic Glass / Professional Audit / Perimeter Hardening
 */
import React, { useEffect, useState } from 'react';
import api from '../api';
import Layout from '../components/Layout';
import { Calendar, Search, User, ShieldCheck, CheckCircle2, Activity } from 'lucide-react';

const Historico = () => {
    const [historico, setHistorico] = useState([]);
    const [busca, setBusca] = useState('');

    const assets = {
        accent: "#00f061", // Verde neon oficial
        borderColor: "rgba(255, 255, 255, 0.06)",
        textMuted: "rgba(255, 255, 255, 0.4)"
    };

    useEffect(() => {
        const fetchHistorico = async () => {
            try {
                const response = await api.get('/veiculos/historico/'); 
                setHistorico(response.data);
            } catch (err) {
                console.error("Erro ao carregar histórico");
            }
        };
        fetchHistorico();
    }, []);

    const filtrados = historico.filter(v => 
        v.placa.toLowerCase().includes(busca.toLowerCase()) ||
        v.modelo.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <Layout>
            <div style={styles.pageContainer}>
                <style>{`
                    .auditGlassCard {
                        background: rgba(255, 255, 255, 0.02) !important;
                        backdrop-filter: blur(40px) !important;
                        -webkit-backdrop-filter: blur(40px) !important;
                        border: 1px solid ${assets.borderColor} !important;
                    }
                    .searchBarFocus {
                        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
                    }
                    .searchBarFocus:focus-within {
                        border-color: ${assets.accent}44 !important;
                        background-color: rgba(0,0,0,0.4) !important;
                        box-shadow: 0 0 20px ${assets.accent}11 !important;
                    }
                    .searchBarFocus:focus-within svg {
                        color: ${assets.accent} !important;
                    }
                    .tableRowHover {
                        transition: background-color 0.2s ease !important;
                    }
                    .tableRowHover:hover {
                        background-color: rgba(255, 255, 255, 0.01) !important;
                    }
                    @media (max-width: 768px) {
                        .auditHeaderSection {
                            flex-direction: column !important;
                            align-items: flex-start !important;
                            gap: 1.5rem !important;
                        }
                        .searchBarFocus {
                            max-width: 100% !important;
                        }
                        .hideOnMobile {
                            display: none !important;
                        }
                    }
                `}</style>

                {/* CABEÇALHO DA TELA */}
                <div style={styles.header} className="auditHeaderSection">
                    <div>
                        <h2 style={styles.title}>Histórico de Estacionamento</h2>
                        <p style={{...styles.subtitle, color: assets.textMuted}}>Registro de Estacionamento</p>
                    </div>
                    
                    <div style={styles.searchBar} className="auditGlassCard searchBarFocus">
                        <Search size={16} color="rgba(255,255,255,0.2)" style={{ transition: 'color 0.25s ease' }} />
                        <input 
                            type="text" 
                            placeholder="Buscar placa ou modelo..." 
                            style={styles.searchInput}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>
                </div>

                {/* CONTÊINER DA TABELA */}
                <div style={styles.tableContainer} className="auditGlassCard">
                    <div style={{ overflowX: 'auto' }}>
                        <table style={styles.table}>
                            <thead>
                                <tr style={{...styles.thRow, backgroundColor: 'rgba(255,255,255,0.01)', borderBottom: `1px solid ${assets.borderColor}`}}>
                                    <th style={{...styles.th, color: assets.textMuted}}>VEÍCULO</th>
                                    <th style={{...styles.th, color: assets.textMuted}}>ENTRADA / SAÍDA</th>
                                    <th style={{...styles.th, color: assets.textMuted}} className="hideOnMobile">RESPONSÁVEL</th>
                                    <th style={{...styles.th, color: assets.textMuted}}>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtrados.map(v => (
                                    <tr key={v.id} style={{...styles.tr, borderBottom: `1px solid ${assets.borderColor}`}} className="tableRowHover">
                                        <td style={styles.td}>
                                            <div style={styles.plate}>{v.placa}</div>
                                            <div style={{...styles.model, color: assets.textMuted}}>{v.modelo}</div>
                                        </td>
                                        <td style={styles.td}>
                                            <div style={styles.timeInfo}>
                                                <Calendar size={12} color={assets.accent} style={{ opacity: 0.7 }} />
                                                <span style={{ color: 'rgba(255,255,255,0.7)' }}>
                                                    <strong style={{ fontSize: '0.7rem', opacity: 0.5, marginRight: '4px' }}>ENTRADA:</strong> 
                                                    {new Date(v.horario_entrada).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                                                </span>
                                            </div>
                                            {v.horario_saida && (
                                                <div style={{...styles.timeInfo, marginTop: '8px'}}>
                                                    <CheckCircle2 size={12} color={assets.accent} style={{ filter: `drop-shadow(0 0 4px ${assets.accent}44)` }} />
                                                    <span style={{ color: assets.accent }}>
                                                        <strong style={{ fontSize: '0.7rem', opacity: 0.6, marginRight: '4px' }}>SAÍDA:</strong> 
                                                        {new Date(v.horario_saida).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                                                    </span>
                                                </div>
                                            )}
                                        </td>
                                        <td style={styles.td} className="hideOnMobile">
                                            <div style={styles.userInfo}>
                                                <div style={{...styles.userIconBox, backgroundColor: 'rgba(0,0,0,0.15)', border: `1px solid ${assets.borderColor}`}}>
                                                    <User size={13} color={assets.accent} />
                                                </div>
                                                <span>{v.usuario_detalhes?.username || 'Sistema'}</span>
                                            </div>
                                        </td>
                                        <td style={styles.td}>
                                            <span style={{
                                                ...styles.status, 
                                                backgroundColor: v.horario_saida ? 'rgba(255,255,255,0.02)' : 'rgba(0,240,97,0.03)',
                                                color: v.horario_saida ? 'rgba(255,255,255,0.4)' : assets.accent,
                                                borderColor: v.horario_saida ? assets.borderColor : 'rgba(0,240,97,0.15)'
                                            }}>
                                                {v.horario_saida ? 'FINALIZADO' : 'EM PÁTIO'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* CONTROLADOR DE ESTADO VAZIO */}
                    {filtrados.length === 0 && (
                        <div style={styles.emptyState}>
                            <div style={{ backgroundColor: 'rgba(255,255,255,0.01)', border: `1px solid ${assets.borderColor}`, padding: '16px', borderRadius: '50%', marginBottom: '4px' }}>
                                <Activity size={32} color="rgba(255,255,255,0.1)" />
                            </div>
                            <p style={{color: assets.textMuted, fontWeight: '800', fontSize: '0.75rem', letterSpacing: '1px'}}>NENHUM REGISTRO LOCALIZADO</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

const styles = {
    pageContainer: { width: '100%', boxSizing: 'border-box' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', gap: '20px' },
    title: { fontSize: '1.4rem', fontWeight: '900', color: '#fff', letterSpacing: '-0.3px', margin: 0, textTransform: 'uppercase' },
    subtitle: { fontSize: '0.75rem', marginTop: '4px', fontWeight: '600', letterSpacing: '0.5px' },
    searchBar: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', borderRadius: '14px', width: '100%', maxWidth: '360px', boxSizing: 'border-box', backgroundColor: 'rgba(0,0,0,0.1)' },
    searchInput: { border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '0.85rem', fontWeight: '600', color: '#fff' },
    tableContainer: { borderRadius: '24px', overflow: 'hidden' },
    table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' },
    thRow: {  },
    th: { padding: '18px 22px', fontSize: '0.65rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1.5px' },
    tr: { },
    td: { padding: '20px 22px', verticalAlign: 'middle' },
    plate: { fontWeight: '900', color: '#fff', fontSize: '1.05rem', letterSpacing: '0.5px' },
    model: { fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', marginTop: '2px', letterSpacing: '0.3px' },
    timeInfo: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' },
    userInfo: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#fff', fontWeight: '700' },
    userIconBox: { padding: '6px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    status: { padding: '6px 14px', borderRadius: '100px', fontSize: '0.65rem', fontWeight: '900', letterSpacing: '0.5px', display: 'inline-block', border: '1px solid' },
    emptyState: { textAlign: 'center', padding: '5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }
};

export default Historico;