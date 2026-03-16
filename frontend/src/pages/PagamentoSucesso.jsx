/**
 * Logo Ali Estacionamentos - PagamentoSucesso.jsx (Versão Final de Produção)
 * Author: Daniel Rodrigues Pereira | Year: 2026
 */
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react'; 
import api from '../api';
import Layout from '../components/Layout';
import { CheckCircle, Printer, ArrowLeft, Activity, ShieldCheck } from 'lucide-react';

const PagamentoSucesso = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [dados, setDados] = useState(null);

    const theme = {
        structure: "#21261f",
        background: "#111310",
        border: "rgba(255, 255, 255, 0.08)",
        accent: "#00b247"
    };

    useEffect(() => {
        const confirmarPagamento = async () => {
            const sessionId = searchParams.get('session_id');
            // Captura o ID e limpa qualquer caractere não numérico (segurança contra sujeira na URL)
            const rawId = searchParams.get('veiculo_id');
            const veiculoId = rawId ? rawId.match(/\d+/)?.[0] : null;

            if (sessionId && veiculoId) {
                try {
                    // Chamada direta para a rota da API configurada no Django
                    const response = await api.post(`/pagamento/confirmar/${veiculoId}/`, {
                        session_id: sessionId
                    });
                    setDados(response.data);
                } catch (err) {
                    console.error("ERRO CRÍTICO NA CONFIRMAÇÃO:", err.response?.data);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        confirmarPagamento();
    }, [searchParams]);

    const formatarData = (dataStr) => {
        if (!dataStr) return "---";
        const data = new Date(dataStr);
        return isNaN(data.getTime()) ? "---" : data.toLocaleString();
    };

    if (loading) {
        return (
            <Layout>
                <div style={styles.loaderContainer}>
                    <Activity className="spin" size={32} color={theme.accent} />
                    <p style={{marginTop: '1rem', color: '#8d948a', fontWeight: '800'}}>PROCESSANDO LIBERAÇÃO...</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div style={styles.container}>
                <div style={styles.successHeader} className="no-print">
                    <div style={{...styles.iconBox, border: `2px solid ${theme.accent}`}}>
                        <CheckCircle size={40} color={theme.accent} />
                    </div>
                    <h1 style={styles.title}>PAGAMENTO CONFIRMADO</h1>
                </div>
                
                <div id="extrato-digital" style={{...styles.receipt, backgroundColor: theme.structure, border: `1px solid ${theme.border}`}}>
                    <div style={styles.receiptHeader}>
                        <ShieldCheck size={18} color={theme.accent} />
                        <h3 style={styles.receiptTitle}>EXTRATO DE PERMANÊNCIA</h3>
                    </div>

                    <div style={styles.qrContainer}>
                        <div style={styles.qrWrapper}>
                            <QRCodeSVG 
                                value={dados?.qrcode_token || "ERRO-TOKEN"} 
                                size={160}
                                bgColor={"#ffffff"}
                                fgColor={"#000000"}
                            />
                        </div>
                        <p style={styles.qrLabel}>APRESENTE NA CATRACA</p>
                    </div>
                    
                    <div style={styles.divider} />

                    <div style={styles.infoGrid}>
                        <div style={styles.infoRow}><span style={styles.label}>PLACA:</span> <span style={styles.value}>{dados?.placa || "---"}</span></div>
                        <div style={styles.infoRow}><span style={styles.label}>MODELO:</span> <span style={styles.value}>{dados?.modelo || "---"}</span></div>
                        <div style={styles.infoRow}><span style={styles.label}>ENTRADA:</span> <span style={styles.value}>{formatarData(dados?.entrada)}</span></div>
                        <div style={styles.infoRow}><span style={styles.label}>SAÍDA:</span> <span style={styles.value}>{formatarData(dados?.saida)}</span></div>
                        <div style={styles.infoRow}><span style={styles.label}>PERMANÊNCIA:</span> <span style={styles.value}>{dados?.permanencia || "---"}</span></div>
                    </div>

                    <div style={styles.divider} />

                    <div style={styles.totalRow}>
                        <span style={styles.totalLabel}>TOTAL PAGO:</span>
                        <span style={{...styles.totalValue, color: theme.accent}}>R$ {dados?.valor_total?.toFixed(2) || "0.00"}</span>
                    </div>

                    <div style={styles.footerBrand}>
                        <span style={styles.brandText}>LOGO ALI ESTACIONAMENTOS</span>
                        <p style={styles.footerMsg}>Diamantina • MG | Auditoria: {dados?.id_transacao?.substring(0, 12)}</p>
                    </div>
                </div>

                <div style={styles.actions} className="no-print">
                    <button onClick={() => window.print()} style={styles.btnPrint}>
                        <Printer size={18} /> IMPRIMIR EXTRATO
                    </button>
                    <button onClick={() => navigate('/dashboard')} style={styles.btnBack}>
                        <ArrowLeft size={18} /> VOLTAR AO PÁTIO
                    </button>
                </div>
            </div>
            <style>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { 100% { transform: rotate(360deg); } } @media print { .no-print, nav, button { display: none !important; } body { background: white !important; } #extrato-digital { position: absolute; top: 0; left: 0; width: 100%; max-width: 450px; background: white !important; border: 1px solid #ddd !important; border-radius: 0 !important; } span, p, h3, div { color: black !important; border-color: #eee !important; } .qrWrapper { border: 1px solid #000 !important; } }`}</style>
        </Layout>
    );
};

const styles = {
    container: { display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '1rem', textAlign: 'center' },
    successHeader: { marginBottom: '2rem' },
    iconBox: { width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', backgroundColor: 'rgba(0,178,71,0.1)' },
    title: { color: '#fff', fontSize: '1.8rem', fontWeight: '950', margin: '0', letterSpacing: '-1.5px' },
    receipt: { padding: '2.5rem', borderRadius: '40px', width: '100%', maxWidth: '420px', boxShadow: '0 30px 80px rgba(0,0,0,0.5)', position: 'relative' },
    receiptHeader: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '1.5rem' },
    receiptTitle: { fontSize: '0.7rem', fontWeight: '900', color: '#fff', letterSpacing: '2px', margin: 0 },
    qrContainer: { padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' },
    qrWrapper: { backgroundColor: '#fff', padding: '15px', borderRadius: '25px' },
    qrLabel: { color: '#00b247', fontSize: '0.75rem', fontWeight: '900', letterSpacing: '1px' },
    infoGrid: { display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' },
    infoRow: { display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' },
    label: { color: '#4a5248', fontWeight: '900', fontSize: '0.7rem' },
    value: { color: '#fff', fontWeight: '700' },
    divider: { height: '1px', backgroundColor: 'rgba(255,255,255,0.05)', margin: '1.5rem 0' },
    totalRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    totalLabel: { fontWeight: '900', color: '#fff', fontSize: '0.8rem' },
    totalValue: { fontSize: '1.5rem', fontWeight: '900' },
    footerBrand: { textAlign: 'center', opacity: 0.5 },
    brandText: { fontSize: '0.7rem', fontWeight: '900', color: '#fff' },
    footerMsg: { fontSize: '0.6rem', color: '#4a5248', marginTop: '4px' },
    actions: { display: 'flex', gap: '1rem', marginTop: '2.5rem' },
    btnPrint: { display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 25px', backgroundColor: '#fff', color: '#111310', border: 'none', borderRadius: '16px', cursor: 'pointer', fontWeight: '900' },
    btnBack: { display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 25px', backgroundColor: 'transparent', color: '#8d948a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', cursor: 'pointer', fontWeight: '900' },
    loaderContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }
};

export default PagamentoSucesso;