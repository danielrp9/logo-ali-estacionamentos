/**
 * Logo Ali Estacionamentos - Adicionar Veículo (Vínculo por CPF)
 * Author: Daniel Rodrigues Pereira | Year: 2026
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

    const theme = {
        structure: "#21261f",
        background: "#111310",
        border: "rgba(255, 255, 255, 0.08)",
        accent: "#00b247"
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
            // Chamada filtrada pelo parâmetro 'cpf' para busca exata no backend
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
            setStatusMsg({ type: 'success', text: 'Entrada autorizada e registrada!' });
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
                <div style={styles.wideGrid}>
                    
                    {/* STATUS E VAGAS */}
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
                                    <span style={styles.vagasSub}>DISPONÍVEIS</span>
                                </div>
                            </div>
                        </div>

                        {/* BUSCA DE CLIENTE (EXCLUSIVO FUNCIONÁRIO) */}
                        {tipoUsuario !== 'CL' && (
                            <div style={{...styles.searchCard, backgroundColor: theme.structure, border: `1px solid ${theme.border}`}}>
                                <label style={styles.label}>Vincular Cliente (CPF)</label>
                                <div style={styles.searchWrapper}>
                                    <Search size={18} color={theme.accent} />
                                    <input 
                                        placeholder="Digite o CPF do cliente..." 
                                        maxLength="11"
                                        value={cpfBusca}
                                        onChange={(e) => setCpfBusca(e.target.value.replace(/\D/g, ''))}
                                        style={styles.searchInput}
                                    />
                                </div>
                                
                                {buscando && <p style={styles.miniLog}>Consultando base...</p>}
                                
                                {clienteEncontrado && (
                                    <div style={styles.clienteResult}>
                                        <User size={16} color={theme.accent} />
                                        <div style={styles.clienteInfo}>
                                            <span style={styles.nomeConfirm}>{clienteEncontrado.nome_completo}</span>
                                            <span style={styles.statusConfirm}>CLIENTE IDENTIFICADO</span>
                                        </div>
                                    </div>
                                )}

                                {!clienteEncontrado && cpfBusca.length === 11 && !buscando && (
                                    <button type="button" onClick={() => navigate('/cadastro')} style={styles.btnNovoCliente}>
                                        <UserPlus size={14} /> CADASTRAR NOVO CLIENTE
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* FORMULÁRIO DE ENTRADA */}
                    <div style={styles.formSection}>
                        <div style={{...styles.infoBox, backgroundColor: theme.structure, border: `1px solid ${theme.border}`}}>
                            <div style={styles.boxHeader}>
                                <Activity size={24} color={theme.accent} />
                                <div>
                                    <h2 style={styles.boxTitle}>Ticket de Entrada</h2>
                                    <p style={styles.boxSubtitle}>Detalhamento Técnico do Veículo</p>
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
                                        <label style={styles.label}>Placa</label>
                                        <input name="placa" maxLength="7" placeholder="ABC1234" onChange={handleChange} style={styles.input} required />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Modelo</label>
                                        <input name="modelo" placeholder="Ex: Honda Civic" onChange={handleChange} style={styles.input} required />
                                    </div>
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Cor</label>
                                    <input name="cor" placeholder="Ex: Cinza Metálico" onChange={handleChange} style={styles.input} required />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Avarias pré-existentes</label>
                                    <textarea name="avarias" placeholder="Opcional: riscos, amassados..." onChange={handleChange} style={{...styles.input, height: '80px', resize: 'none'}} />
                                </div>

                                <button type="submit" style={styles.registerBtn}>
                                    <ShieldCheck size={20} />
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
    pageContainer: { padding: '1rem 0', maxWidth: '1200px', margin: '0 auto' },
    wideGrid: { display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem' },
    statusSection: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    vagasCard: { padding: '2rem', borderRadius: '30px', color: '#fff' },
    vagasHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' },
    vagasLabel: { fontSize: '0.6rem', fontWeight: '900', color: '#8d948a', letterSpacing: '1px' },
    vagasContent: { display: 'flex', alignItems: 'center', gap: '15px' },
    vagasNumber: { fontSize: '4rem', fontWeight: '900', margin: 0 },
    vagasInfo: { display: 'flex', flexDirection: 'column' },
    vagasMain: { fontSize: '1.2rem', fontWeight: '900', color: '#fff' },
    vagasSub: { fontSize: '0.7rem', color: '#8d948a' },
    
    searchCard: { padding: '2rem', borderRadius: '30px', display: 'flex', flexDirection: 'column', gap: '1rem' },
    searchWrapper: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)' },
    searchInput: { background: 'none', border: 'none', color: '#fff', fontSize: '0.9rem', outline: 'none', width: '100%' },
    miniLog: { fontSize: '0.65rem', color: '#00b247', margin: 0, fontWeight: '800' },
    clienteResult: { display: 'flex', alignItems: 'center', gap: '12px', padding: '15px', backgroundColor: 'rgba(0,178,71,0.05)', borderRadius: '15px', border: '1px solid rgba(0,178,71,0.2)' },
    clienteInfo: { display: 'flex', flexDirection: 'column' },
    nomeConfirm: { fontSize: '0.85rem', fontWeight: '900', color: '#fff' },
    statusConfirm: { fontSize: '0.6rem', color: '#00b247', fontWeight: '900' },
    btnNovoCliente: { background: 'none', border: '1px dashed #ef4444', color: '#ef4444', padding: '10px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },

    formSection: { width: '100%' },
    infoBox: { padding: '2.5rem', borderRadius: '35px' },
    boxHeader: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' },
    boxTitle: { fontWeight: '900', fontSize: '1.5rem', margin: 0, color: '#fff' },
    boxSubtitle: { fontSize: '0.75rem', color: '#8d948a', margin: 0, fontWeight: '700' },
    form: { display: 'flex', flexDirection: 'column', gap: '1.2rem' },
    formRow: { display: 'flex', gap: '1.2rem' },
    formGroup: { display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 },
    label: { fontSize: '0.65rem', fontWeight: '900', color: '#fff', textTransform: 'uppercase', opacity: 0.7 },
    input: { width: '100%', padding: '1rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '0.9rem', outline: 'none' },
    registerBtn: { width: '100%', padding: '1.2rem', backgroundColor: '#00b247', color: '#fff', border: 'none', borderRadius: '16px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '1rem' },
    alert: { padding: '1rem', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '0.8rem', fontWeight: '900' }
};

export default AdicionarVeiculo;