/**
 * Logo Ali Estacionamentos - Future-Core v4.3 (Mobile Fix Absolute)
 * Author: Daniel Rodrigues Pereira | Year: 2026
 * Estética: Kinetic Glass / Deep Grid / Grounded Composition
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Car, ArrowRight, Menu, X, 
  LogIn, Lock, Eye, FileText, Zap, Sparkles
} from 'lucide-react';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const assets = {
    heroVehicle: "https://www.pngmart.com/files/4/Tesla-PNG-Image.png", 
    accent: "#00f061", 
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const goToLogin = () => window.location.href = '/login/';
  const goToCadastro = () => window.location.href = '/cadastro/';

  return (
    <div style={styles.container}>
      <ResponsiveStyle assets={assets} isMenuOpen={isMenuOpen} />
      
      {/* BACKGROUND ELEMENTS */}
      <div className="liquid-orb orb-1"></div>
      <div className="liquid-orb orb-2"></div>

      {/* NAVBAR */}
      <header style={{...styles.navWrapper, top: scrolled ? '10px' : '20px'}}>
        <nav style={{
          ...styles.navbar, 
          backgroundColor: scrolled ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
          width: scrolled ? '90%' : '95%'
        }}>
          <div style={styles.logoGroup} onClick={() => window.location.href = '/'}>
            <div style={styles.logoIcon}><Car size={18} color={assets.accent} /></div>
            <span style={styles.logoText}>LOGO ALI <span style={{fontWeight: 300, opacity: 0.4}}>| Estacionamentos</span></span>
          </div>

          <div className="desktopNav" style={styles.navLinks}>
            <span style={styles.navLinkItem} onClick={() => scrollToSection('sobre')}>Essência</span>
            <span style={styles.navLinkItem} onClick={() => scrollToSection('psi')}>Segurança</span>
            <div style={styles.navDivider}></div>
            <button style={styles.btnNavText} onClick={goToLogin}><LogIn size={16} /> Entrar</button>
            <button style={styles.btnNavAction} onClick={goToCadastro}>Primeiro Acesso</button>
          </div>

          <button className="mobileMenuBtn" style={styles.mobileMenuBtn} onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} color="#fff" /> : <Menu size={24} color="#fff" />}
          </button>
        </nav>
        
        {/* MOBILE MENU DROPDOWN */}
        <div className={`mobileMenuDropdown ${isMenuOpen ? 'active' : ''}`} style={styles.mobileMenuDropdown}>
            <div className="mobileMenuInner" style={styles.mobileMenuInner}>
                <span style={styles.navLinkMobile} onClick={() => scrollToSection('sobre')}>Home</span>
                <span style={styles.navLinkMobile} onClick={() => scrollToSection('psi')}>Segurança P.S.I</span>
                <div style={styles.mobileActionGroup}>
                    <button style={styles.btnMobileAction} onClick={goToLogin}>Entrar no Sistema</button>
                    <button style={styles.btnNavTextMobile} onClick={goToCadastro}>Criar Conta</button>
                </div>
            </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="sobre" style={styles.heroSection} className="heroSection">
        <div className="backgroundGrid"></div>
        <div style={styles.heroLayout} className="heroLayout">
          
          <div style={styles.textContainer} className="textContainer">
            <div style={styles.badge} className="badge">
                <Sparkles size={12} />
                <span>Estacione e gerencie tudo pelo Celular</span>
            </div>
            <h1 style={styles.mainTitle} className="mainTitle">
             Estacionamento<br />
              <span className="textAccentShadow">24h</span>
            </h1>
            <p style={styles.mainSubtitle} className="mainSubtitle">
              Gestão inteligente e segurança total. O <strong>Logo Ali</strong> redefine a experiência de cuidar do seu veiculo.
            </p>
            <div style={styles.buttonGroup} className="heroButtons">
              <button className="btn-glow" style={styles.btnPrimary} onClick={goToLogin}>ESTACIONAR AGORA</button>
              <button style={styles.btnSecondary} onClick={() => scrollToSection('psi')}>SAIBA MAIS</button>
            </div>
          </div>

          <div style={styles.visualContainer} className="heroVisual">
            <img 
              src={assets.heroVehicle} 
              alt="Veículo" 
              style={styles.heroImage} 
              className="carImage"
            />
          </div>
        </div>
      </section>

      {/* SEÇÃO PSI */}
      <section id="psi" style={styles.psiSection}>
        <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>P.S.I</h2>
            <p style={styles.sectionSub}>Política de Segurança de Informação</p>
        </div>
        <div style={styles.psiGrid} className="psiGrid">
            <div style={styles.psiCard} className="glassCard">
                <Lock size={28} color={assets.accent} />
                <h3 style={styles.cardTitle}>Integridade</h3>
                <p style={styles.cardText}>Garantimos a proteção contra alterações não autorizadas em todos os registros do sistema.</p>
            </div>
            <div style={styles.psiCard} className="glassCard">
                <Eye size={28} color={assets.accent} />
                <h3 style={styles.cardTitle}>Privacidade</h3>
                <p style={styles.cardText}>Acesso restrito garantindo que apenas usuários autorizados visualizem dados sensíveis.</p>
            </div>
            <div style={styles.psiCard} className="glassCard">
                <FileText size={28} color={assets.accent} />
                <h3 style={styles.cardTitle}>Disponibilidade</h3>
                <p style={styles.cardText}>Infraestrutura resiliente para assegurar que o sistema esteja pronto para operar em Diamantina.</p>
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
            <div style={styles.logoGroup}>
                <Car size={20} color={assets.accent} />
                <span style={styles.logoText}>LOGO ALI</span>
            </div>
            <div style={styles.footerCopyright}>
                © 2026 Daniel Rodrigues Pereira | UFVJM
            </div>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#020502', minHeight: '100vh', fontFamily: '"Inter", sans-serif', color: '#fff', overflowX: 'hidden', position: 'relative' },
  navWrapper: { display: 'flex', justifyContent: 'center', width: '100%', position: 'fixed', zIndex: 1000, transition: 'all 0.4s ease' },
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1100px', backdropFilter: 'blur(30px)', padding: '12px 24px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.08)' },
  logoGroup: { display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' },
  logoIcon: { backgroundColor: 'rgba(0,240,97,0.1)', padding: '8px', borderRadius: '50%' },
  logoText: { fontWeight: '900', fontSize: '0.85rem', letterSpacing: '1px' },
  navLinks: { display: 'flex', alignItems: 'center', gap: '25px' },
  navDivider: { width: '1px', height: '20px', backgroundColor: 'rgba(255,255,255,0.1)' },
  navLinkItem: { fontSize: '0.75rem', fontWeight: '500', color: '#aaa', cursor: 'pointer' },
  btnNavText: { background: 'none', border: 'none', color: '#fff', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
  btnNavAction: { backgroundColor: '#fff', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '100px', fontWeight: '800', fontSize: '0.75rem', cursor: 'pointer' },
  mobileMenuBtn: { display: 'none', background: 'none', border: 'none', cursor: 'pointer' },
  
  mobileMenuDropdown: { 
    position: 'fixed', top: '0', left: '0', width: '100%', height: '0',
    backgroundColor: 'rgba(2,5,2,0.98)', backdropFilter: 'blur(20px)',
    overflow: 'hidden', transition: '0.5s cubic-bezier(0.16, 1, 0.3, 1)', zIndex: 999,
    display: 'flex', flexDirection: 'column', justifyContent: 'center'
  },
  mobileMenuInner: { padding: '40px', display: 'flex', flexDirection: 'column', gap: '25px', opacity: 0, transition: '0.3s' },
  navLinkMobile: { fontSize: '1.8rem', fontWeight: '900', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' },
  mobileActionGroup: { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' },
  btnMobileAction: { padding: '18px', backgroundColor: '#00f061', color: '#000', border: 'none', borderRadius: '16px', fontWeight: '900', fontSize: '1rem' },
  btnNavTextMobile: { padding: '18px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '16px', background: 'none', fontWeight: '700' },

  heroSection: { maxWidth: '1200px', margin: '0 auto', paddingTop: '160px', position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center' },
  heroLayout: { display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap', width: '100%' },
  textContainer: { flex: 1.2, minWidth: '320px', zIndex: 10 },
  badge: { display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,240,97,0.1)', padding: '8px 16px', borderRadius: '100px', width: 'fit-content', fontSize: '0.65rem', fontWeight: '800', color: '#00f061', marginBottom: '24px', border: '1px solid rgba(0,240,97,0.2)' },
  mainTitle: { fontSize: 'clamp(2.8rem, 9vw, 5.5rem)', fontWeight: '900', lineHeight: '0.95', marginBottom: '25px', letterSpacing: '-3px' },
  mainSubtitle: { color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', marginBottom: '40px', lineHeight: '1.6', maxWidth: '480px' },
  buttonGroup: { display: 'flex', gap: '15px' },
  btnPrimary: { backgroundColor: '#00f061', color: '#000', border: 'none', padding: '18px 36px', borderRadius: '16px', fontWeight: '900', cursor: 'pointer', fontSize: '0.9rem' },
  btnSecondary: { backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '18px 36px', borderRadius: '16px', fontWeight: '700', cursor: 'pointer' },

  visualContainer: { flex: 1.4, position: 'relative', display: 'flex', justifyContent: 'center', alignSelf: 'flex-end' },
  heroImage: { width: '130%', height: 'auto', zIndex: 5, filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))' },

  psiSection: { maxWidth: '1100px', margin: '80px auto', padding: '0 20px' },
  sectionHeader: { textAlign: 'center', marginBottom: '50px' },
  sectionTitle: { fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-1px' },
  sectionSub: { color: 'rgba(255,255,255,0.4)', fontSize: '1rem' },
  psiGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' },
  psiCard: { padding: '40px', borderRadius: '32px' },
  cardTitle: { fontSize: '1.3rem', fontWeight: '800', marginTop: '10px' },
  cardText: { color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: '1.5' },

  footer: { borderTop: '1px solid rgba(255,255,255,0.05)', padding: '40px 20px' },
  footerInner: { maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' },
  footerCopyright: { fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)' }
};

const ResponsiveStyle = ({assets, isMenuOpen}) => (
  <style>{`
    .textAccentShadow { color: ${assets.accent}; text-shadow: 0 0 40px rgba(0, 240, 97, 0.3); }
    
    .liquid-orb { position: fixed; border-radius: 50%; filter: blur(100px); z-index: 0; pointer-events: none; opacity: 0.1; }
    .orb-1 { width: 500px; height: 500px; background: ${assets.accent}; top: -100px; right: -100px; }
    .orb-2 { width: 400px; height: 400px; background: #0080ff; bottom: -50px; left: -50px; }

    .backgroundGrid {
        position: absolute; inset: 0; 
        background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
        background-size: 40px 40px; z-index: 1; mask-image: radial-gradient(circle at 50% 50%, black, transparent 85%);
    }

    .glassCard { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(40px); border: 1px solid rgba(255, 255, 255, 0.05); transition: 0.3s ease; }
    .glassCard:hover { transform: translateY(-5px); border-color: ${assets.accent}33; }

    .btn-glow:hover { box-shadow: 0 0 30px ${assets.accent}44; transform: translateY(-2px); }

    @media (max-width: 968px) {
      .desktopNav { display: none !important; }
      .mobileMenuBtn { display: block !important; }
      
      .heroSection { 
        padding-top: 100px !important;
        min-height: 100vh !important;
        overflow: hidden;
      }

      .heroLayout { 
        flex-direction: column !important;
        text-align: center !important;
        gap: 20px !important;
        width: 100% !important;
        padding: 0 20px !important;
        margin: 0 !important;
      }

      .textContainer { 
        min-width: 100% !important;
        width: 100% !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
      }

      .badge { margin-bottom: 15px !important; }
      
      .mainTitle { 
        font-size: 3.2rem !important; 
        line-height: 1.1 !important;
        width: 100% !important;
      }

      .mainSubtitle { 
        font-size: 1rem !important;
        max-width: 100% !important;
        margin-bottom: 30px !important;
      }

      .heroButtons { 
        flex-direction: column !important;
        width: 100% !important;
        gap: 12px !important;
      }

      .btnPrimary, .btnSecondary { 
        width: 100% !important;
        padding: 18px !important;
      }

      .visualContainer { 
        width: 100% !important;
        margin-top: 20px !important;
        display: flex !important;
        justify-content: center !important;
        align-self: center !important;
        position: relative !important;
      }

      .carImage { 
        width: 110% !important; 
        max-width: none !important;
        transform: translateY(10px) !important;
      }

      .mobileMenuDropdown.active { height: 100vh !important; }
      .mobileMenuDropdown.active .mobileMenuInner { opacity: 1 !important; transition-delay: 0.2s; }
      
      .psiGrid { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

export default Home;