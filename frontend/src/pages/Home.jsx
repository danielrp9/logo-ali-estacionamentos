/**
 * Logo Ali Estacionamentos - Visual Tech-X Edition (Final Production)
 * Author: Daniel Rodrigues Pereira | Year: 2026
 * Estética: Kinetic Minimalism / Deep Olive Structure
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Car, ShieldCheck, ArrowRight, Menu, X, 
  Cpu, Clock, Gauge, Activity, Battery, LogIn, UserPlus
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- CONFIGURAÇÕES DE ATIVOS ---
  const assets = {
    logo: "/logo.png",
    heroVehicle: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=1200",
    structureColor: "#21261f", 
    borderColor: "rgba(255, 255, 255, 0.08)",
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToAbout = () => {
    const section = document.getElementById('sobre');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      if (isMenuOpen) setIsMenuOpen(false);
    }
  };

  return (
    <div style={styles.container}>
      <ResponsiveStyle isMenuOpen={isMenuOpen} assets={assets} />

      {/* NAVBAR FLUTUANTE */}
      <div style={styles.navWrapper}>
        <nav style={{...styles.navbar, backgroundColor: assets.structureColor, border: `1px solid ${assets.borderColor}`}}>
          <div style={styles.logoGroup} onClick={() => navigate('/')}>
            <img 
              src={assets.logo} 
              alt="Logo Ali" 
              style={styles.brandLogo}
              onError={(e) => { e.target.style.display = 'none'; document.getElementById('logoFallback').style.display = 'flex'; }}
            />
            <div id="logoFallback" style={{display: 'none', alignItems: 'center', gap: '8px'}}>
              <Car size={24} color="#00b247" />
              <span style={styles.logoText}>LOGO ALI</span>
            </div>
          </div>

          <div className="desktopNav" style={styles.navLinks}>
            <span style={styles.navLinkItem} onClick={scrollToAbout}>Sobre</span>
            <button style={styles.btnNavText} onClick={() => navigate('/login')}>
               <LogIn size={16} /> Entrar
            </button>
            <button style={styles.btnNavAction} onClick={() => navigate('/cadastro')}>
               <UserPlus size={16} /> Cadastrar-se
            </button>
          </div>

          <button className="mobileMenuBtn" style={styles.mobileMenuBtn} onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} color="#fff" /> : <Menu size={24} color="#fff" />}
          </button>
        </nav>
        
        {/* MENU MOBILE EXPANSÍVEL */}
        {isMenuOpen && (
          <div className="mobileMenuDropdown" style={{...styles.mobileMenuDropdown, backgroundColor: assets.structureColor}}>
            <span style={styles.navLinkItem} onClick={scrollToAbout}>Sobre</span>
            <button style={styles.btnNavText} onClick={() => navigate('/login')}>Entrar</button>
            <button style={{...styles.btnNavAction, width: '100%', justifyContent: 'center'}} onClick={() => navigate('/cadastro')}>Cadastrar-se</button>
          </div>
        )}
      </div>

      {/* SEÇÃO HERO */}
      <header style={{...styles.heroSection, backgroundColor: assets.structureColor, border: `1px solid ${assets.borderColor}`}} className="heroSection">
        <div style={styles.heroLayout} className="heroLayout">
          <div style={styles.visualContainer} className="heroVisual">
            <div style={{...styles.floatingTag, backgroundColor: assets.structureColor}}>
              <Activity size={16} color="#00b247" />
              <span>Ambiente Seguro</span>
            </div>
            <div style={{...styles.carDisplay, backgroundImage: `url(${assets.heroVehicle})`}} className="carDisplay">
                <div style={styles.vignetteOverlay}></div>
                <div style={styles.scanOverlay}></div>
            </div>
            <div style={styles.statusBox}>
              <div style={styles.pulse}></div>
              <span>DIAMANTINA • MG</span>
            </div>
          </div>

          <div style={styles.textContainer} className="textContainer">
            <h1 style={styles.mainTitle} className="mainTitle">
              SEGURANÇA 24H <br />
              <span style={{color: '#00b247'}}>PARA SEU VEÍCULO</span>
            </h1>
            <p style={styles.mainSubtitle}>
              Líder em gestão de estacionamentos em Diamantina, utilizando algoritmos 
              de alta precisão para monitoramento ininterrupto.
            </p>
            <div style={styles.buttonGroup} className="buttonGroup">
              <button style={styles.btnPrimary} onClick={() => navigate('/login')}>
                ESTACIONE AGORA <ArrowRight size={18} />
              </button>
              <div style={styles.divider} className="heroDivider"></div>
              <div style={styles.partnerInfo}>
                <ShieldCheck size={20} color="#00b247" />
                <span>Local Monitorado</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SEÇÃO: NOSSA ESSÊNCIA */}
      <section id="sobre" style={styles.aboutSection} className="aboutSection">
        <div style={styles.aboutGrid} className="aboutGrid">
          <div style={styles.aboutTextContent}>
            <h2 style={styles.sectionTitle}>Nossa Essência</h2>
            <p style={styles.aboutText}>
              O <strong>Logo Ali</strong> nasceu da necessidade de redefinir a mobilidade e segurança em Diamantina. 
              Fundado por desenvolvedores da <strong>UFVJM</strong>, unimos tecnologia de ponta com a hospitalidade mineira 
              para oferecer um ecossistema digital onde seu veículo é monitorado com precisão cirúrgica. 
            </p>
            <p style={styles.aboutText}>
              Nossa missão é simplificar a vida de quem circula pela cidade, garantindo que a última coisa com que você 
              precise se preocupar seja a segurança do seu patrimônio. Estacione e viva a cidade com total confiança.
            </p>
          </div>
          <div style={styles.aboutStats} className="aboutStats">
            <div style={{...styles.statCard, backgroundColor: assets.structureColor, border: `1px solid ${assets.borderColor}`}}>
              <span style={styles.statNum}>100%</span>
              <span style={styles.statLabel}>Tecnologia Local</span>
            </div>
            <div style={{...styles.statCard, backgroundColor: assets.structureColor, border: `1px solid ${assets.borderColor}`}}>
              <span style={styles.statNum}>24h</span>
              <span style={styles.statLabel}>Monitoramento</span>
            </div>
          </div>
        </div>
      </section>

      {/* BENTO GRID */}
      <main style={styles.mainGrid} className="mainGrid">
        <div style={styles.bentoWrapper} className="bentoWrapper">
          <div style={{...styles.cardSmall, backgroundColor: assets.structureColor, border: `1px solid ${assets.borderColor}`}}>
            <div style={styles.cardHeader}>
              <Gauge size={20} color="#00b247" />
              <span style={styles.cardLabel}>CONTROLE DE VAGAS</span>
            </div>
            <div style={styles.gaugeContainer}>
              <div style={styles.gaugeValue}>4550</div>
              <div style={styles.gaugeSub}>VAGAS MONITORADAS</div>
            </div>
            <button style={styles.cardBtn} onClick={() => navigate('/login')}>Saiba mais</button>
          </div>

          <div style={{...styles.cardSmall, backgroundColor: assets.structureColor, border: `1px solid ${assets.borderColor}`}}>
            <div style={styles.cardHeader}>
              <Cpu size={20} color="#00b247" />
              <span style={styles.cardLabel}>SISTEMA AUTOMATIZADO</span>
            </div>
            <h3 style={styles.cardTitle}>Segurança Ativa</h3>
            <p style={styles.cardText}>Resultados rápidos com códigos únicos de entrada e saída para cada cliente.</p>
          </div>

          <div style={{...styles.cardDark, backgroundColor: '#131612', border: '1px solid #2a3028'}}>
             <div style={styles.darkContent}>
                <Battery size={24} color="#00b247" />
                <h4 style={styles.darkLabel}>ECOSSISTEMA DIGITAL</h4>
                <p style={styles.darkText}>
                  Uma infraestrutura completa que simplifica a gestão e o cadastro de veículos em Diamantina.
                </p>
                <button style={styles.learnMore} onClick={scrollToAbout}>Ver detalhes</button>
             </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={styles.footer} className="footer">
        <div style={styles.footerGrid} className="footerGrid">
          <div>
            <div style={{...styles.logoGroup, marginBottom: '15px'}} className="footerLogo">
               <Car size={24} color="#00b247" />
               <span style={{...styles.logoText, color: '#fff'}}>LOGO ALI</span>
            </div>
            <p style={styles.footerDesc}>A nova era da segurança veicular em Minas Gerais. Tecnologia, transparência e proteção.</p>
          </div>
          <div style={styles.footerLinks}>
            <span style={styles.footerLinkTitle}>Serviços</span>
            <p>Registro de veículos</p>
            <p>Controle de vagas</p>
          </div>
          <div style={styles.footerLinks}>
            <span style={styles.footerLinkTitle}>Informações</span>
            <p onClick={scrollToAbout} style={{cursor: 'pointer'}}>Nossa Essência</p>
            <p>Política de privacidade</p>
          </div>
        </div>
        <p style={styles.copyright}>© 2026 LOGO ALI ESTACIONAMENTOS • DIAMANTINA, MG</p>
      </footer>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#111310', minHeight: '100vh', fontFamily: '"Inter", sans-serif', color: '#fff', padding: '20px' },
  navWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', position: 'sticky', top: '20px', zIndex: 1000 },
  navbar: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1200px',
    backdropFilter: 'blur(20px)', padding: '12px 30px', borderRadius: '25px', boxShadow: '0 15px 35px rgba(0,0,0,0.5)'
  },
  logoGroup: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' },
  brandLogo: { height: '32px', width: 'auto' },
  logoText: { fontWeight: '800', fontSize: '1.1rem', color: '#fff' },
  navLinks: { display: 'flex', alignItems: 'center', gap: '20px' },
  navLinkItem: { fontSize: '0.85rem', fontWeight: '600', color: '#aaa', cursor: 'pointer', transition: '0.3s' },
  btnNavText: { background: 'none', border: 'none', color: '#fff', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
  btnNavAction: { backgroundColor: '#00b247', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: '800', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: '0.3s' },
  mobileMenuBtn: { display: 'none', background: 'none', border: 'none', cursor: 'pointer' },
  mobileMenuDropdown: { 
    width: '100%', maxWidth: '1200px', marginTop: '10px', padding: '20px', borderRadius: '20px', 
    display: 'flex', flexDirection: 'column', gap: '15px', border: '1px solid rgba(255,255,255,0.08)' 
  },

  heroSection: {
    maxWidth: '1250px', margin: '30px auto', borderRadius: '50px', padding: '60px',
    boxShadow: '0 40px 100px rgba(0,0,0,0.6)', position: 'relative', overflow: 'hidden'
  },
  heroLayout: { display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap' },
  visualContainer: { flex: 1, position: 'relative', minWidth: '320px' },
  carDisplay: { width: '100%', height: '400px', borderRadius: '40px', overflow: 'hidden', position: 'relative', backgroundSize: 'cover', backgroundPosition: 'center' },
  vignetteOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(17,19,16,0.9) 100%)' },
  scanOverlay: { position: 'absolute', top: '20%', left: '20%', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(0,178,71,0.1) 0%, transparent 70%)', borderRadius: '50%', border: '1.5px solid #00b247' },
  floatingTag: { position: 'absolute', top: '-15px', left: '-10px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '10px 20px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 2, fontSize: '0.75rem', fontWeight: '800' },
  statusBox: { position: 'absolute', bottom: '25px', right: '25px', backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', padding: '10px 20px', borderRadius: '15px', fontSize: '0.7rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' },
  pulse: { width: '8px', height: '8px', backgroundColor: '#00b247', borderRadius: '50%', boxShadow: '0 0 12px #00b247' },

  textContainer: { flex: 1, minWidth: '300px' },
  mainTitle: { fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '900', lineHeight: '1.1', marginBottom: '25px', letterSpacing: '-2px' },
  mainSubtitle: { color: '#8d948a', fontSize: '1.1rem', marginBottom: '45px', lineHeight: '1.6' },
  buttonGroup: { display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' },
  btnPrimary: { backgroundColor: '#00b247', color: '#fff', border: 'none', padding: '20px 40px', borderRadius: '18px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' },
  divider: { width: '1px', height: '40px', backgroundColor: 'rgba(255,255,255,0.1)' },
  partnerInfo: { display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '700', color: '#fff' },

  aboutSection: { maxWidth: '1250px', margin: '100px auto', padding: '0 60px' },
  aboutGrid: { display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '60px', alignItems: 'center' },
  sectionTitle: { fontSize: '2.5rem', fontWeight: '900', color: '#fff', marginBottom: '30px', letterSpacing: '-1.5px' },
  aboutText: { fontSize: '1.1rem', color: '#8d948a', lineHeight: '1.8', marginBottom: '20px' },
  aboutStats: { display: 'flex', flexDirection: 'column', gap: '20px' },
  statCard: { padding: '30px', borderRadius: '30px', textAlign: 'center' },
  statNum: { display: 'block', fontSize: '3rem', fontWeight: '900', color: '#00b247', marginBottom: '5px' },
  statLabel: { fontSize: '0.8rem', fontWeight: '800', color: '#fff', textTransform: 'uppercase', letterSpacing: '2px' },

  mainGrid: { maxWidth: '1250px', margin: '20px auto 100px' },
  bentoWrapper: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' },
  cardSmall: { borderRadius: '35px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '25px' },
  cardHeader: { display: 'flex', alignItems: 'center', gap: '12px' },
  cardLabel: { fontSize: '0.75rem', fontWeight: '900', color: '#6d756b', letterSpacing: '1px' },
  gaugeContainer: { textAlign: 'center' },
  gaugeValue: { fontSize: '3.5rem', fontWeight: '900', color: '#fff' },
  gaugeSub: { fontSize: '0.75rem', color: '#00b247', fontWeight: '800' },
  cardBtn: { backgroundColor: 'rgba(255,255,255,0.05)', border: 'none', padding: '14px', borderRadius: '15px', fontWeight: '800', color: '#fff', cursor: 'pointer' },
  cardTitle: { fontSize: '1.6rem', fontWeight: '900', margin: 0 },
  cardText: { color: '#8d948a', fontSize: '1rem', lineHeight: '1.6', margin: 0 },

  cardDark: { borderRadius: '35px', padding: '40px', display: 'flex', alignItems: 'center' },
  darkContent: { display: 'flex', flexDirection: 'column', gap: '20px' },
  darkLabel: { color: '#4a5248', fontSize: '0.8rem', fontWeight: '900', margin: 0 },
  darkText: { color: '#8d948a', fontSize: '1rem', lineHeight: '1.7', margin: 0 },
  learnMore: { background: 'none', border: 'none', color: '#00b247', padding: 0, fontWeight: '800', cursor: 'pointer', textDecoration: 'underline' },

  footer: { maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', borderTop: '1px solid rgba(255,255,255,0.05)' },
  footerGrid: { display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '50px', marginBottom: '40px' },
  footerDesc: { color: '#555', fontSize: '0.95rem', lineHeight: '1.6' },
  footerLinkTitle: { fontWeight: '900', marginBottom: '20px', color: '#fff' },
  footerLinks: { color: '#666', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '12px' },
  copyright: { textAlign: 'center', fontSize: '0.7rem', color: '#333', fontWeight: '700', marginTop: '30px' }
};

const ResponsiveStyle = () => (
  <style>{`
    @media (max-width: 968px) {
      .desktopNav { display: none !important; }
      .mobileMenuBtn { display: block !important; }
      .heroSection { padding: 40px 25px !important; border-radius: 35px !important; margin: 15px auto !important; }
      .heroLayout { gap: 30px !important; flex-direction: column !important; }
      .heroVisual { width: 100% !important; min-width: unset !important; order: 2 !important; }
      .carDisplay { height: 280px !important; border-radius: 25px !important; }
      .textContainer { text-align: center !important; width: 100% !important; order: 1 !important; }
      .mainTitle { font-size: 2.2rem !important; }
      .buttonGroup { justify-content: center !important; gap: 15px !important; }
      .heroDivider { display: none !important; }
      
      .aboutSection { padding: 0 20px !important; margin: 60px auto !important; }
      .aboutGrid { grid-template-columns: 1fr !important; gap: 40px !important; text-align: center !important; }
      .aboutStats { flex-direction: row !important; gap: 15px !important; justify-content: center !important; }
      .statCard { padding: 20px !important; flex: 1 !important; }
      .statNum { font-size: 2rem !important; }

      .mainGrid { margin-bottom: 60px !important; }
      .bentoWrapper { grid-template-columns: 1fr !important; }
      .cardSmall { padding: 30px !important; border-radius: 25px !important; }

      .footerGrid { grid-template-columns: 1fr !important; gap: 30px !important; text-align: center !important; }
      .footerLogo { justify-content: center !important; }
    }
  `}</style>
);

export default Home;