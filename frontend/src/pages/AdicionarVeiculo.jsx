/**
 * Logo Ali Estacionamentos - Adicionar Veículo (Liquid Glass Edition)
 * Author: Daniel Rodrigues Pereira | Year: 2026
 * Estética: Kinetic Glass / Cyberpunk Deep Grid / Input Hardening
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Layout from '../components/Layout';
import { Car, ShieldCheck, CheckCircle, AlertCircle, MapPin, Gauge, Activity, Search, User, UserPlus } from 'lucide-react';

const AdicionarVeiculo = () => {
    const navigate = useNavigate();
    const tipoUsuario = localStorage.getItem('tipo_usuario');
    
    const [vagas, setVagas] = useState(0);
    const [cpfBusca, setCpfBusca] = useState('');
    const [clienteEncontrado, setClienteEncontrado] = useState(null);
    const [buscando, setBuscando] = useState(false);
    
    const [formData, setFormData] = useState({
        placa: '',
        modelo: '',
        cor: '',
        avarias: '',
        usuario: ''
    });
    
    const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

    const assets = {
        accent: "#00f061", // Verde neon oficial
        borderColor: "rgba(255, 255, 255, 0.06)",
        textMuted: "rgba(255, 255, 255, 0.4)"
    };

    useEffect(() => {
        const fetchVagas = async () => {
            try {
                const response = await api.get('/veiculos/adicionar/');
                setVagas(response.data.disponiveis);
            } catch (err) {
                console.error("Erro ao carregar vagas");
            }
        };
        fetchVagas();
    }, []);

    // Busca cliente por CPF quando o funcionário digita 11 dígitos
    useEffect(() => {
        if (tipoUsuario !== 'CL' && cpfBusca.length === 11) {
            buscarCliente();
        } else {
            setClienteEncontrado(null);
        }
    }, [cpfBusca]);

    const buscarCliente = async () => {
        setBuscando(true);
        setClienteEncontrado(null);
        setStatusMsg({ type: '', text: '' });
        try {
            const response = await api.get(`/clientes/?cpf=${cpfBusca}`);
            
            if (response.data && response.data.length > 0) {
                const cliente = response.data[0];
                setClienteEncontrado(cliente);
                setFormData(prev => ({ ...prev, usuario: cliente.cpf }));
            } else {
                setClienteEncontrado(null);
                setStatusMsg({ type: 'error', text: 'CPF não localizado na base.' });
            }
        } catch (err) {
            console.error("Erro na busca de cliente");
            setStatusMsg({ type: 'error', text: 'Falha na conexão com o servidor.' });
        } finally {
            setBuscando(false);
        }
    };

    const handleChange = (e) => {
        const value = e.target.name === 'placa' ? e.target.value.toUpperCase() : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMsg({ type: '', text: '' });

        // Validação de vínculo para Funcionário
        if (tipoUsuario !== 'CL' && !clienteEncontrado) {
            setStatusMsg({ type: 'error', text: 'É necessário vincular um cliente válido pelo CPF.' });
            return;
        }

        try {
            await api.post('/veiculos/adicionar/', formData);
            setStatusMsg({ type: 'success', text: 'Entrada autorizada e registrada com sucesso!' });
            setTimeout(() => navigate('/dashboard'), 1500);
        } catch (err) {
            setStatusMsg({ 
                type: 'error', 
                text: err.response?.data?.erro || "Erro ao registrar entrada. Verifique os dados." 
            });
        }
    };

    return (
        <Layout>
            <div style={styles.pageContainer}>
                <style>{`
                    .dashboardGlassCard {
                        background: rgba(255, 255, 255, 0.02) !important;
                        backdrop-filter: blur(40px) !important;
                        -webkit-backdrop-filter: blur(40px) !important;
                        border: 1px solid ${assets.borderColor} !important;
                        transition: border-color 0.3s ease, box-shadow 0.3s ease;
                    }
                    .dashboardGlassCard:hover {
                        border-color: rgba(0, 240, 97, 0.15) !important;
                    }
                    .inputFieldGlow {
                        transition: all 0.25s ease !important;
                    }
                    .inputFieldGlow:focus {
                        border-color: ${assets.accent}44 !important;
                        background-color: rgba(0,0,0,0.5) !important;
                        box-shadow: 0 0 20px ${assets.accent}11 !important;
                    }
                    .btnActionGlow {
                        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
                    }
                    .btnActionGlow:hover {
                        background-color: #fff !important;
                        box-shadow: 0 0 30px ${assets.accent}44 !important;
                        transform: translateY(-1px);
                    }
                    .btnLinkGlow {
                        transition: all 0.2s ease !important;
                    }
                    .btnLinkGlow:hover {
                        border-color: #ff4d4d !important;
                        color: #ff4d4d !important;
                        background-color: rgba(255,77,77,0.02) !important;
                    }
                    @media (max-width: 968px) {
                        .wideGridSection {
                            grid-template-columns: 1fr !important;
                            gap: 1.5rem !important;
                        }
                    }
                `}</style>

                <div style={styles.wideGrid} className="wideGridSection">
                    
                    {/* STATUS E VAGAS */}
                    <div style={styles.statusSection}>
                        <div style={styles.vagasCard} className="dashboardGlassCard">
                            <div style={styles.vagasHeader}>
                                <div style={styles.iconMiniContainer}>
                                    <Gauge size={16} color={assets.accent} />
                                </div>
                                <span style={{...styles.vagasLabel, color: assets.textMuted}}>CAPACIDADE DO PÁTIO</span>
                            </div>
                            <div style={styles.vagasContent}>
                                <h1 style={{...styles.vagasNumber, color: assets.accent, textShadow: `0 0 30px ${assets.accent}22`}}>{vagas}</h1>
                                <div style={styles.vagasInfo}>
                                    <span style={styles.vagasMain}>VAGAS</span>
                                    <span style={{...styles.vagasSub, color: assets.textMuted}}>DISPONÍVEIS</span>
                                </div>
                            </div>
                        </div>

                        {/* BUSCA DE CLIENTE (EXCLUSIVO FUNCIONÁRIO) */}
                        {tipoUsuario !== 'CL' && (
                            <div style={styles.searchCard} className="dashboardGlassCard">
                                <label style={{...styles.label, color: assets.textMuted}}>Vincular Cliente (CPF)</label>
                                <div style={styles.searchWrapper}>
                                    <Search size={16} color={assets.accent} />
                                    <input 
                                        placeholder="Digite o CPF do cliente..." 
                                        maxLength="11"
                                        value={cpfBusca}
                                        onChange={(e) => setCpfBusca(e.target.value.replace(/\D/g, ''))}
                                        style={styles.searchInput}
                                        className="inputFieldGlow"
                                    />
                                </div>
                                
                                {buscando && <p style={{...styles.miniLog, color: assets.accent}}>Consultando base de dados...</p>}
                                
                                {clienteEncontrado && (
                                    <div style={{...styles.clienteResult, borderColor: `${assets.accent}22`, backgroundColor: `${assets.accent}03`}}>
                                        <User size={16} color={assets.accent} />
                                        <div style={styles.clienteInfo}>
                                            <span style={styles.nomeConfirm}>{clienteEncontrado.nome_completo}</span>
                                            <span style={{...styles.statusConfirm, color: assets.accent}}>CLIENTE IDENTIFICADO</span>
                                        </div>
                                    </div>
                                )}

                                {!clienteEncontrado && cpfBusca.length === 11 && !buscando && (
                                    <button type="button" onClick={() => navigate('/cadastro')} style={styles.btnNovoCliente} className="btnLinkGlow">
                                        <UserPlus size={14} /> CADASTRAR NOVO CLIENTE
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* FORMULÁRIO DE ENTRADA */}
                    <div style={styles.formSection}>
                        <div style={styles.infoBox} className="dashboardGlassCard">
                            <div style={styles.boxHeader}>
                                <div style={{...styles.iconMainContainer, border: `1px solid rgba(0, 240, 97, 0.15)`}}>
                                    <Activity size={20} color={assets.accent} />
                                </div>
                                <div>
                                    <h2 style={styles.boxTitle}>Ticket de Entrada</h2>
                                    <p style={{...styles.boxSubtitle, color: assets.textMuted}}>Detalhamento Técnico do Veículo</p>
                                </div>
                            </div>
                            
                            {statusMsg.text && (
                                <div style={{
                                    ...styles.alert, 
                                    backgroundColor: statusMsg.type === 'success' ? 'rgba(0,240,97,0.03)' : 'rgba(255,77,77,0.03)',
                                    color: statusMsg.type === 'success' ? assets.accent : '#ff4d4d',
                                    borderColor: statusMsg.type === 'success' ? 'rgba(0,240,97,0.15)' : 'rgba(255,77,77,0.15)'
                                }}>
                                    {statusMsg.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                                    <span>{statusMsg.text}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} style={styles.form}>
                                <div style={styles.formRow}>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Placa</label>
                                        <input 
                                            name="placa" 
                                            maxLength="7" 
                                            placeholder="ABC1234" 
                                            onChange={handleChange} 
                                            style={styles.input} 
                                            className="inputFieldGlow"
                                            required 
                                        />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Modelo</label>
                                        <input 
                                            name="modelo" 
                                            placeholder="Ex: Honda Civic" 
                                            onChange={handleChange} 
                                            style={styles.input} 
                                            className="inputFieldGlow"
                                            required 
                                        />
                                    </div>
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Cor</label>
                                    <input 
                                        name="cor" 
                                        placeholder="Ex: Cinza Metálico" 
                                        onChange={handleChange} 
                                        style={styles.input} 
                                        className="inputFieldGlow"
                                        required 
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Avarias pré-existentes</label>
                                    <textarea 
                                        name="avarias" 
                                        placeholder="Opcional: riscos, arranhões, amassados estruturais..." 
                                        onChange={handleChange} 
                                        style={{...styles.input, height: '90px', resize: 'none'}} 
                                        className="inputFieldGlow"
                                    />
                                </div>

                                <button type="submit" style={styles.registerBtn} className="btnActionGlow">
                                    <ShieldCheck size={18} />
                                    <span>FINALIZAR REGISTRO DE ENTRADA</span>
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
    pageContainer: { padding: '0.5rem 0', width: '100%', boxSizing: 'border-box' },
    wideGrid: { display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '2rem', alignItems: 'start' },
    statusSection: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    vagasCard: { padding: '2.2rem 2rem', borderRadius: '24px', color: '#fff' },
    vagasHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.2rem' },
    iconMiniContainer: { backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '6px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    vagasLabel: { fontSize: '0.65rem', fontWeight: '900', letterSpacing: '1.5px' },
    vagasContent: { display: 'flex', alignItems: 'center', gap: '20px' },
    vagasNumber: { fontSize: '4.5rem', fontWeight: '900', margin: 0, lineHeight: 1 },
    vagasInfo: { display: 'flex', flexDirection: 'column', gap: '2px' },
    vagasMain: { fontSize: '1.1rem', fontWeight: '900', color: '#fff', letterSpacing: '0.5px' },
    vagasSub: { fontSize: '0.65rem', fontWeight: '800', letterSpacing: '0.5px' },
    
    searchCard: { padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '1rem' },
    searchWrapper: { display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.04)' },
    searchInput: { background: 'none', border: 'none', color: '#fff', fontSize: '0.9rem', outline: 'none', width: '100%' },
    miniLog: { fontSize: '0.65rem', margin: 0, fontWeight: '800', letterSpacing: '0.3px', paddingLeft: '4px' },
    clienteResult: { display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', borderRadius: '16px', border: '1px solid' },
    clienteInfo: { display: 'flex', flexDirection: 'column', gap: '2px' },
    nomeConfirm: { fontSize: '0.85rem', fontWeight: '800', color: '#fff' },
    statusConfirm: { fontSize: '0.6rem', fontWeight: '900', letterSpacing: '0.5px' },
    btnNovoCliente: { background: 'none', border: '1px dashed rgba(255,77,77,0.3)', color: 'rgba(255,77,77,0.8)', padding: '12px', borderRadius: '14px', fontSize: '0.7rem', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', boxSizing: 'border-box' },

    formSection: { width: '100%' },
    infoBox: { padding: '2.5rem', borderRadius: '28px' },
    iconMainContainer: { background: 'linear-gradient(135deg, rgba(0,240,97,0.1), transparent)', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    boxHeader: { display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '2.2rem' },
    boxTitle: { fontWeight: '900', fontSize: '1.4rem', margin: 0, color: '#fff', letterSpacing: '-0.3px' },
    boxSubtitle: { fontSize: '0.75rem', margin: 0, fontWeight: '600', marginTop: '2px' },
    form: { display: 'flex', flexDirection: 'column', gap: '1.4rem' },
    formRow: { display: 'flex', gap: '1.4rem', flexWrap: 'wrap' },
    formGroup: { display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1, minWidth: '200px' },
    label: { fontSize: '0.65rem', fontWeight: '900', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.5, paddingLeft: '2px' },
    input: { width: '100%', padding: '14px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.04)', backgroundColor: 'rgba(0,0,0,0.2)', color: '#fff', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' },
    registerBtn: { width: '100%', padding: '1.1rem', backgroundColor: '#00f061', color: '#000', border: 'none', borderRadius: '14px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '0.8rem', fontSize: '0.85rem', letterSpacing: '0.5px' },
    alert: { padding: '12px 16px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', fontWeight: '700', border: '1px solid', boxSizing: 'border-box', marginBottom: '0.5rem' }
};

export default AdicionarVeiculo;