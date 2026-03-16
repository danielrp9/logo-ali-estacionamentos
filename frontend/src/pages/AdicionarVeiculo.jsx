/**
 * Logo Ali Estacionamentos - Adicionar Veículo (URL Correction)
 * Author: Daniel Rodrigues Pereira | Year: 2026
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Layout from '../components/Layout';
import { Car, ShieldCheck, CheckCircle, AlertCircle, MapPin, Gauge, Activity } from 'lucide-react';

const AdicionarVeiculo = () => {
    const navigate = useNavigate();
    const [vagas, setVagas] = useState(0);
    const [formData, setFormData] = useState({
        placa: '',
        modelo: '',
        cor: '',
        avarias: ''
    });
    const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

    const theme = {
        structure: "#21261f",
        background: "#111310",
        border: "rgba(255, 255, 255, 0.08)",
        accent: "#00b247"
    };

    useEffect(() => {
        const fetchVagas = async () => {
            try {
                // CORREÇÃO: Removido o primeiro /api/ pois o axios já deve ter a baseURL configurada
                const response = await api.get('/veiculos/adicionar/');
                setVagas(response.data.disponiveis);
            } catch (err) {
                console.error("Erro ao carregar vagas");
            }
        };
        fetchVagas();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value.toUpperCase() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMsg({ type: '', text: '' });

        try {
            // CORREÇÃO: Removido o primeiro /api/ para evitar a URL duplicada /api/api/
            await api.post('/veiculos/adicionar/', formData);
            setStatusMsg({ type: 'success', text: 'Entrada autorizada e registrada!' });
            setTimeout(() => navigate('/dashboard'), 1500);
        } catch (err) {
            const errorData = err.response?.data;
            setStatusMsg({ 
                type: 'error', 
                text: errorData?.erro || "Erro de autorização. Verifique os dados." 
            });
        }
    };

    return (
        <Layout>
            <div style={styles.pageContainer}>
                <div style={styles.wideGrid}>
                    
                    {/* LADO ESQUERDO: PAINEL DE STATUS */}
                    <div style={styles.statusSection}>
                        <div style={{...styles.vagasCard, backgroundColor: theme.structure, border: `1px solid ${theme.border}`}}>
                            <div style={styles.vagasHeader}>
                                <Gauge size={18} color={theme.accent} />
                                <span style={styles.vagasLabel}>CAPACIDADE DO PÁTIO</span>
                            </div>
                            <div style={styles.vagasContent}>
                                <h1 style={{...styles.vagasNumber, color: theme.accent}}>{vagas}</h1>
                                <div style={styles.vagasInfo}>
                                    <span style={styles.vagasMain}>VAGAS</span>
                                    <span style={styles.vagasSub}>LIVRES AGORA</span>
                                </div>
                            </div>
                            <div style={{...styles.vagasFooter, borderTop: `1px solid ${theme.border}`}}>
                                <MapPin size={14} color={theme.accent} /> 
                                <span style={styles.footerLoc}>Diamantina • Campus JK</span>
                            </div>
                        </div>

                        <div style={{...styles.helperCard, backgroundColor: 'rgba(0,178,71,0.05)', border: `1px solid rgba(0,178,71,0.2)`}}>
                            <ShieldCheck size={24} color={theme.accent} />
                            <p style={styles.helperText}>
                                Protocolo de segurança ativo. Toda entrada gera um hash de auditoria único.
                            </p>
                        </div>
                    </div>

                    {/* LADO DIREITO: FORMULÁRIO */}
                    <div style={styles.formSection}>
                        <div style={{...styles.infoBox, backgroundColor: theme.structure, border: `1px solid ${theme.border}`}}>
                            <div style={styles.boxHeader}>
                                <div style={{...styles.iconCircle, backgroundColor: theme.background, border: `1px solid ${theme.border}`}}>
                                    <Activity size={24} color={theme.accent} />
                                </div>
                                <div>
                                    <h2 style={styles.boxTitle}>Registrar Entrada</h2>
                                    <p style={styles.boxSubtitle}>Identificação e Triagem de Veículo</p>
                                </div>
                            </div>
                            
                            {statusMsg.text && (
                                <div style={{
                                    ...styles.alert, 
                                    backgroundColor: statusMsg.type === 'success' ? 'rgba(0,178,71,0.1)' : 'rgba(239,68,68,0.1)',
                                    color: statusMsg.type === 'success' ? theme.accent : '#ef4444',
                                    border: `1px solid ${statusMsg.type === 'success' ? theme.accent : '#ef4444'}`
                                }}>
                                    {statusMsg.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                                    {statusMsg.text}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} style={styles.form}>
                                <div style={styles.formRow}>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Placa do Veículo</label>
                                        <input 
                                            name="placa" 
                                            maxLength="7" 
                                            placeholder="BRA2E19"
                                            onChange={handleChange} 
                                            style={styles.input} 
                                            required 
                                        />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Modelo / Marca</label>
                                        <input 
                                            name="modelo" 
                                            placeholder="Ex: Toyota Corolla"
                                            onChange={handleChange} 
                                            style={styles.input} 
                                            required 
                                        />
                                    </div>
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Cor Predominante</label>
                                    <input 
                                        name="cor" 
                                        placeholder="Ex: Branco Pérola"
                                        onChange={handleChange} 
                                        style={styles.input} 
                                        required 
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Observações de Avarias</label>
                                    <textarea 
                                        name="avarias" 
                                        placeholder="Relate riscos, amassados ou itens visíveis..."
                                        onChange={handleChange} 
                                        style={{...styles.input, height: '100px', resize: 'none'}} 
                                    />
                                </div>

                                <button type="submit" style={styles.registerBtn}>
                                    <ShieldCheck size={20} />
                                    <span>CONFIRMAR ENTRADA NO PÁTIO</span>
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
};

const styles = {
    pageContainer: { padding: '1rem 0', maxWidth: '1250px', margin: '0 auto' },
    wideGrid: { display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '2.5rem', alignItems: 'start' },
    statusSection: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    vagasCard: { padding: '2.5rem', borderRadius: '40px', color: '#fff', boxShadow: '0 30px 60px rgba(0,0,0,0.3)' },
    vagasHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.2rem' },
    vagasLabel: { fontSize: '0.65rem', fontWeight: '900', letterSpacing: '2px', color: '#8d948a', textTransform: 'uppercase' },
    vagasContent: { display: 'flex', alignItems: 'baseline', gap: '20px' },
    vagasNumber: { fontSize: '6rem', fontWeight: '900', margin: 0, lineHeight: '1', letterSpacing: '-5px' },
    vagasInfo: { display: 'flex', flexDirection: 'column' },
    vagasMain: { fontSize: '2rem', fontWeight: '900', lineHeight: '0.9', color: '#fff' },
    vagasSub: { fontSize: '0.8rem', fontWeight: '600', color: '#8d948a', textTransform: 'uppercase' },
    vagasFooter: { marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '1.5rem' },
    footerLoc: { fontSize: '0.75rem', fontWeight: '800', color: '#4a5248', textTransform: 'uppercase' },
    helperCard: { padding: '1.5rem', borderRadius: '24px', display: 'flex', gap: '15px', alignItems: 'center' },
    helperText: { fontSize: '0.8rem', color: '#fff', fontWeight: '600', margin: 0, lineHeight: '1.5', opacity: 0.8 },
    formSection: { width: '100%' },
    infoBox: { padding: '3rem', borderRadius: '45px', boxShadow: '0 40px 100px rgba(0,0,0,0.4)' },
    boxHeader: { display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' },
    iconCircle: { padding: '15px', borderRadius: '18px', display: 'flex' },
    boxTitle: { fontWeight: '900', fontSize: '1.8rem', margin: 0, color: '#fff', letterSpacing: '-1px' },
    boxSubtitle: { fontSize: '0.85rem', color: '#8d948a', margin: '4px 0 0', fontWeight: '700', textTransform: 'uppercase' },
    form: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    formRow: { display: 'flex', gap: '1.5rem' },
    formGroup: { display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 },
    label: { fontSize: '0.7rem', fontWeight: '900', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8 },
    input: { width: '100%', padding: '1.1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', outline: 'none', fontSize: '1rem', backgroundColor: 'rgba(0,0,0,0.2)', color: '#fff', boxSizing: 'border-box' },
    registerBtn: { width: '100%', padding: '1.3rem', backgroundColor: '#00b247', color: '#fff', border: 'none', borderRadius: '18px', fontWeight: '900', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', boxShadow: '0 15px 30px rgba(0, 178, 71, 0.3)', marginTop: '1rem' },
    alert: { padding: '1.2rem', borderRadius: '16px', marginBottom: '2rem', textAlign: 'center', fontSize: '0.85rem', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }
};

export default AdicionarVeiculo;