/**
 * Logo Ali Estacionamentos - Histórico de Auditoria (Deep Earth Edition)
 * Author: Daniel Rodrigues Pereira | Year: 2026
 * Estética: Professional Audit / Deep Olive / Kinetic Tech
 */
import React, { useEffect, useState } from 'react';
import api from '../api';
import Layout from '../components/Layout';
import { Calendar, Search, User, ShieldCheck, CheckCircle2, Activity } from 'lucide-react';

const Historico = () => {
    const [historico, setHistorico] = useState([]);
    const [busca, setBusca] = useState('');

    const theme = {
        structure: "#21261f",
        background: "#111310",
        border: "rgba(255, 255, 255, 0.08)",
        accent: "#00b247"
    };

    useEffect(() => {
        const fetchHistorico = async () => {
            try {
                // CORREÇÃO: Chamada para o endpoint específico de histórico completo
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
            <div style={styles.header}>
                <div>
                    <h2 style={styles.title}>Auditoria de Movimentação</h2>
                    <p style={styles.subtitle}>Registro de fluxo em Diamantina • MG</p>
                </div>
                
                <div style={{...styles.searchBar, backgroundColor: theme.structure, border: `1px solid ${theme.border}`}}>
                    <Search size={18} color="#4a5248" />
                    <input 
                        type="text" 
                        placeholder="Buscar placa ou modelo..." 
                        style={styles.searchInput}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div>
            </div>

            <div style={{...styles.tableContainer, backgroundColor: theme.structure, border: `1px solid ${theme.border}`}}>
                <table style={styles.table}>
                    <thead>
                        <tr style={{...styles.thRow, backgroundColor: 'rgba(0,0,0,0.2)'}}>
                            <th style={styles.th}>VEÍCULO</th>
                            <th style={styles.th}>ENTRADA / SAÍDA</th>
                            <th style={styles.th}>RESPONSÁVEL (AUDITORIA)</th>
                            <th style={styles.th}>STATUS FINAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtrados.map(v => (
                            <tr key={v.id} style={{...styles.tr, borderBottom: `1px solid ${theme.border}`}}>
                                <td style={styles.td}>
                                    <div style={styles.plate}>{v.placa}</div>
                                    <div style={styles.model}>{v.modelo}</div>
                                </td>
                                <td style={styles.td}>
                                    <div style={styles.timeInfo}>
                                        <Calendar size={12} color={theme.accent} />
                                        <strong>ENTRADA:</strong> {new Date(v.horario_entrada).toLocaleString()}
                                    </div>
                                    {v.horario_saida && (
                                        <div style={{...styles.timeInfo, marginTop: '6px', color: theme.accent}}>
                                            <CheckCircle2 size={12} />
                                            <strong>SAÍDA:</strong> {new Date(v.horario_saida).toLocaleString()}
                                        </div>
                                    )}
                                </td>
                                <td style={styles.td}>
                                    <div style={styles.userInfo}>
                                        <div style={{...styles.userIconBox, backgroundColor: theme.background, border: `1px solid ${theme.border}`}}>
                                            <User size={14} color={theme.accent} />
                                        </div>
                                        <span>{v.usuario_detalhes?.username || 'Sistema'}</span>
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    <span style={{
                                        ...styles.status, 
                                        backgroundColor: v.horario_saida ? 'rgba(0,0,0,0.3)' : 'rgba(0,178,71,0.1)',
                                        color: v.horario_saida ? '#8d948a' : theme.accent,
                                        border: `1px solid ${v.horario_saida ? theme.border : theme.accent}`
                                    }}>
                                        {v.horario_saida ? 'FINALIZADO' : 'EM PÁTIO'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filtrados.length === 0 && (
                    <div style={styles.emptyState}>
                        <Activity size={40} color={theme.border} />
                        <p style={{color: '#4a5248', fontWeight: '800'}}>NENHUM REGISTRO LOCALIZADO</p>
                    </div>
                )}
            </div>
        </Layout>
    );
};

const styles = {
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' },
    title: { fontSize: '1.8rem', fontWeight: '900', color: '#fff', letterSpacing: '-1.5px', margin: 0 },
    subtitle: { fontSize: '0.8rem', color: '#8d948a', marginTop: '6px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' },
    searchBar: { display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 25px', borderRadius: '18px', width: '100%', maxWidth: '380px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' },
    searchInput: { border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '0.95rem', fontWeight: '700', color: '#fff' },
    tableContainer: { borderRadius: '35px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.4)' },
    table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
    thRow: { borderBottom: '1px solid rgba(255,255,255,0.05)' },
    th: { padding: '22px', color: '#4a5248', fontSize: '0.7rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1.5px' },
    tr: { transition: '0.2s' },
    td: { padding: '22px' },
    plate: { fontWeight: '900', color: '#fff', fontSize: '1.1rem', letterSpacing: '1px' },
    model: { fontSize: '0.75rem', color: '#8d948a', fontWeight: '800', textTransform: 'uppercase', marginTop: '4px' },
    timeInfo: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#ccc', fontWeight: '600' },
    userInfo: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#fff', fontWeight: '800' },
    userIconBox: { padding: '8px', borderRadius: '12px', display: 'flex' },
    status: { padding: '8px 16px', borderRadius: '12px', fontSize: '0.65rem', fontWeight: '900', letterSpacing: '1px', display: 'inline-block' },
    emptyState: { textAlign: 'center', padding: '6rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }
};

export default Historico;