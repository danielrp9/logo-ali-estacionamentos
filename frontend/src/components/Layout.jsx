/**
 * Logo Ali Estacionamentos - Master Layout (Liquid Glass Edition)
 * Author: Daniel Rodrigues Pereira | Year: 2026
 * Estética: Kinetic Glass / Cyberpunk Deep Grid / Role-Aware Perimeter
 * Modificação: Padronização estética completa do menu mobile com a identidade visual do sistema
 */
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Car, LayoutDashboard, PlusCircle, History, 
  LogOut, User, Menu, X, ChevronLeft, ChevronRight, Users, Sparkles, ShieldCheck
} from 'lucide-react';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem('username') || 'Operador';
  const tipoUsuario = localStorage.getItem('tipo_usuario'); // 'CL', 'FU' ou 'AD'
  const isStaff = localStorage.getItem('is_staff') === 'true'; // Validação estrita de Superadmin/Staff
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const assets = {
    accent: "#00f061", // Tom de verde neon padronizado do ecossistema Logo Ali
    structureColor: "rgba(255, 255, 255, 0.01)",
    borderColor: "rgba(255, 255, 255, 0.06)",
    textMuted: "rgba(255, 255, 255, 0.4)",
    adminAccent: "#ffaa00" // Cor dourada de alerta de privilégio para o painel Django
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  // Itens básicos (Todos veem)
  const menuItems = [
    { label: 'Painel Geral', icon: <LayoutDashboard size={20} />, path: '/dashboard/' },
    { label: 'Novo Registro', icon: <PlusCircle size={20} />, path: '/adicionar/' },
    { label: 'Histórico', icon: <History size={20} />, path: '/historico/' },
  ];

  // Item exclusivo para Funcionário/Admin (Norma N01.4)
  if (tipoUsuario === 'FU' || tipoUsuario === 'AD') {
    menuItems.push({ label: 'Clientes', icon: <Users size={20} />, path: '/clientes/' });
  }

  return (
    <div style={styles.appContainer}>
      <style>{`
        /* INJEÇÃO DE ESTILOS DA IDENTIDADE VISUAL LIQUID GLASS */
        .glassElement {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
        }

        .backgroundGrid {
          position: absolute; inset: 0; 
          background-image: linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px);
          background-size: 50px 50px; z-index: 1;
          mask-image: radial-gradient(circle at 50% 50%, black, transparent 90%);
          -webkit-mask-image: radial-gradient(circle at 50% 50%, black, transparent 90%);
          pointer-events: none;
        }

        .liquid-orb { position: absolute; border-radius: 50%; filter: blur(120px); -webkit-filter: blur(120px); z-index: 0; pointer-events: none; opacity: 0.06; }
        .orb-1 { width: 500px; height: 500px; background: ${assets.accent}; top: -150px; right: -50px; z-index: 0; }
        .orb-2 { width: 450px; height: 450px; background: #0080ff; bottom: -100px; left: 100px; z-index: 0; }

        .menuItemTransition {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .menuItemTransition:hover {
          background: rgba(255, 255, 255, 0.03) !important;
          color: #fff !important;
        }
        .menuItemTransition:hover span {
          color: ${assets.accent} !important;
        }

        .adminItemTransition {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .adminItemTransition:hover {
          background: rgba(255, 170, 0, 0.05) !important;
          color: #fff !important;
          border-color: rgba(255, 170, 0, 0.2) !important;
        }
        .adminItemTransition:hover span {
          color: ${assets.adminAccent} !important;
        }

        .logoutGlow { transition: all 0.2s ease; }
        .logoutGlow:hover { color: #ff4d4d !important; filter: drop-shadow(0 0 8px rgba(255,77,77,0.4)); }

        .btnMobileGlow { transition: all 0.2s ease; }
        .btnMobileGlow:hover { color: ${assets.accent} !important; }

        /* TRANSIÇÃO EXCLUSIVA DO PORTAL MOBILE DRAWER COM PADRONIZAÇÃO VISUAL */
        .mobile-drawer-portal {
          position: fixed; top: 0; bottom: 0; left: -300px; width: 290px;
          background-color: #111310; z-index: 99999 !important; display: none;
          flex-direction: column; padding: 2rem 1.2rem;
          box-shadow: 10px 0 40px rgba(0,0,0,0.8);
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          transition: left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: auto !important;
        }

        @media (max-width: 768px) {
          .hide-logo-mobile { display: none !important; }
          .sidebar-desktop { display: none !important; }
          
          .mobile-drawer-portal { display: flex !important; }
          .mobile-drawer-portal.open { left: 0 !important; }

          .navbar-main { padding: 0 1.2rem !important; }
          .collapse-btn-desktop { display: none !important; }
          .btnMenuMobileCollapse { display: block !important; }
          .innerContentLayout { padding: 1.5rem 1rem !important; }
        }
      `}</style>

      {/* BACKGROUND DE SESSÃO SELETA */}
      <div className="liquid-orb orb-1"></div>
      <div className="liquid-orb orb-2"></div>
      <div className="backgroundGrid"></div>

      {/* NAVBAR */}
      <nav 
        className="navbar-main glassElement" 
        style={{
          ...styles.navbar, 
          backgroundColor: assets.structureColor, 
          borderBottom: `1px solid ${assets.borderColor}`
        }}
      >
        <div style={styles.navLeft}>
          <button className="btnMenuMobileCollapse btnMobileGlow" style={styles.btnMenuMobile} onClick={() => setIsMobileOpen(true)}>
            <Menu size={22} color="#fff" />
          </button>
          <div style={styles.brandWrapper} onClick={() => navigate('/dashboard/')} className="hide-logo-mobile">
            <div style={{ ...styles.logoIconContainer, border: `1px solid rgba(0, 240, 97, 0.15)` }}>
              <Car color={assets.accent} size={18} />
            </div>
            <span style={styles.brandName}>Logo Ali</span>
            <span style={{ ...styles.roleBadge, color: tipoUsuario === 'CL' ? '#0080ff' : assets.accent, border: `1px solid ${tipoUsuario === 'CL' ? 'rgba(0,128,255,0.15)' : 'rgba(0,240,97,0.15)'}` }}>
              {tipoUsuario === 'CL' ? 'CLIENTE' : 'OPERACIONAL'}
            </span>
          </div>
        </div>

        <div style={styles.navRight}>
          <div style={{...styles.userInfo, backgroundColor: 'rgba(255,255,255,0.01)', border: `1px solid ${assets.borderColor}`}}>
            <User size={14} color={assets.accent} />
            <span style={styles.userName}>{username}</span>
          </div>
          <button onClick={handleLogout} style={styles.logoutBtn} className="logoutGlow">
            <LogOut size={20} />
          </button>
        </div>
      </nav>

      <div style={styles.mainWrapper}>
        
        {/* SIDEBAR DESKTOP */}
        <aside 
          className="sidebar-desktop glassElement" 
          style={{
            ...styles.sidebar, 
            width: isCollapsed ? '84px' : '280px', 
            backgroundColor: assets.structureColor, 
            borderRight: `1px solid ${assets.borderColor}`
          }}
        >
          <button 
            className="collapse-btn-desktop"
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              ...styles.collapseBtn, 
              border: `1px solid ${assets.borderColor}`, 
              backgroundColor: '#0c0f0c',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
            }}
          >
            {isCollapsed ? <ChevronRight size={13} color="#fff" /> : <ChevronLeft size={13} color="#fff" />}
          </button>

          <div style={styles.menuList}>
            {!isCollapsed ? (
              <p style={{...styles.menuTitle, color: assets.textMuted}}>TERMINAL OPERACIONAL</p>
            ) : (
              <div style={styles.menuTitleCollapsed}><Sparkles size={12} color={assets.accent} style={{opacity: 0.5}} /></div>
            )}
            
            {menuItems.map((item) => {
              const isSelected = location.pathname === item.path;
              return (
                <div 
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="menuItemTransition"
                  style={{
                    ...styles.menuItem,
                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                    backgroundColor: isSelected ? 'rgba(0, 240, 97, 0.04)' : 'transparent',
                    border: isSelected ? `1px solid rgba(0, 240, 97, 0.1)` : '1px solid transparent'
                  }}
                >
                  <span style={{
                    color: isSelected ? assets.accent : 'rgba(255,255,255,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    filter: isSelected ? `drop-shadow(0 0 8px ${assets.accent}44)` : 'none'
                  }}>
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <span style={{
                      ...styles.menuLabel, 
                      color: isSelected ? '#fff' : 'rgba(255,255,255,0.5)',
                      fontWeight: isSelected ? '800' : '600'
                    }}>
                      {item.label}
                    </span>
                  )}
                </div>
              );
            })}

            {isStaff && (
              <div style={{ marginTop: 'auto', paddingTop: '15px', borderTop: `1px solid ${assets.borderColor}` }}>
                <div 
                  onClick={() => window.location.href = '/admin/'}
                  className="adminItemTransition"
                  style={{
                    ...styles.menuItem,
                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                    backgroundColor: 'rgba(255, 170, 0, 0.01)',
                    border: '1px solid rgba(255, 170, 0, 0.05)'
                  }}
                >
                  <span style={{ color: 'rgba(255, 170, 0, 0.5)', display: 'flex', alignItems: 'center' }}>
                    <ShieldCheck size={20} />
                  </span>
                  {!isCollapsed && (
                    <span style={{ color: 'rgba(255, 170, 0, 0.7)', fontWeight: '700', fontSize: '0.8rem' }}>
                      Django Admin
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* 1º: OVERLAY MOBILE INVERTIDO */}
        {isMobileOpen && (
          <div 
            onClick={() => setIsMobileOpen(false)} 
            style={{ position: 'fixed', inset: 0, zIndex: 99990, backgroundColor: 'rgba(2, 5, 2, 0.7)' }} 
          />
        )}

        {/* 2º: DRAWER MOBILE ISOLADO COM PADRONIZAÇÃO VISUAL LIQUID GLASS */}
        <div className={`mobile-drawer-portal ${isMobileOpen ? 'open' : ''}`}>
          <button 
            style={{ background: 'none', border: 'none', cursor: 'pointer', alignSelf: 'flex-end', marginBottom: '1.5rem', padding: '4px', pointerEvents: 'auto' }} 
            onClick={() => setIsMobileOpen(false)}
          >
            <X size={22} color="#fff" />
          </button>

          <p style={{ ...styles.menuTitle, color: assets.textMuted, paddingLeft: '12px', marginBottom: '1.2rem' }}>TERMINAL OPERACIONAL</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, pointerEvents: 'auto' }}>
            {menuItems.map((item) => {
              const isSelected = location.pathname === item.path;
              return (
                <div 
                  key={item.path}
                  onClick={() => { navigate(item.path); setIsMobileOpen(false); }}
                  className="menuItemTransition"
                  style={{
                    ...styles.menuItem,
                    justifyContent: 'flex-start',
                    backgroundColor: isSelected ? 'rgba(0, 240, 97, 0.04)' : 'transparent',
                    border: isSelected ? `1px solid rgba(0, 240, 97, 0.1)` : '1px solid transparent',
                    pointerEvents: 'auto'
                  }}
                >
                  <span style={{ 
                    color: isSelected ? assets.accent : 'rgba(255,255,255,0.4)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    pointerEvents: 'none',
                    filter: isSelected ? `drop-shadow(0 0 8px ${assets.accent}44)` : 'none'
                  }}>
                    {item.icon}
                  </span>
                  <span style={{ ...styles.menuLabel, color: isSelected ? '#fff' : 'rgba(255,255,255,0.5)', fontWeight: isSelected ? '800' : '600', pointerEvents: 'none' }}>
                    {item.label}
                  </span>
                </div>
              );
            })}

            {isStaff && (
              <div style={{ marginTop: 'auto', paddingTop: '15px', borderTop: `1px solid ${assets.borderColor}`, pointerEvents: 'auto' }}>
                <div 
                  onClick={() => window.location.href = '/admin/'}
                  className="adminItemTransition"
                  style={{
                    ...styles.menuItem,
                    justifyContent: 'flex-start',
                    backgroundColor: 'rgba(255, 170, 0, 0.01)',
                    border: '1px solid rgba(255, 170, 0, 0.05)',
                    pointerEvents: 'auto'
                  }}
                >
                  <span style={{ color: 'rgba(255, 170, 0, 0.5)', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
                    <ShieldCheck size={20} />
                  </span>
                  <span style={{ color: '#ffaa00', fontWeight: '700', fontSize: '0.8rem', pointerEvents: 'none' }}>
                    Django Admin
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CONTAINER DE CONTEÚDO PRINCIPAL */}
        <main style={styles.content}>
          <div style={styles.contentInner} className="innerContentLayout">{children}</div>
        </main>
      </div>
    </div>
  );
};

const styles = {
  appContainer: { display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#020502', position: 'relative' },
  navbar: { height: '74px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2.5rem', zIndex: 1000, position: 'relative' },
  navLeft: { display: 'flex', alignItems: 'center', gap: '1.5rem', zIndex: 10 },
  brandWrapper: { display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' },
  logoIconContainer: { background: 'linear-gradient(135deg, rgba(0,240,97,0.1), transparent)', padding: '6px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  brandName: { fontWeight: '900', color: '#fff', textTransform: 'uppercase', fontSize: '0.95rem', letterSpacing: '1px' },
  roleBadge: { fontSize: '0.6rem', fontWeight: '900', padding: '3px 8px', borderRadius: '100px', backgroundColor: 'rgba(255,255,255,0.02)', marginLeft: '4px', letterSpacing: '0.5px' },
  navRight: { display: 'flex', alignItems: 'center', gap: '1.2rem', zIndex: 10 },
  userInfo: { display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 16px', borderRadius: '100px' },
  userName: { fontSize: '0.8rem', fontWeight: '800', color: '#fff', letterSpacing: '0.3px' },
  logoutBtn: { background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' },
  mainWrapper: { display: 'flex', flex: 1, overflow: 'hidden', position: 'relative', zIndex: 10 },
  sidebar: { display: 'flex', flexDirection: 'column', padding: '2rem 1rem', transition: 'width 0.3s ease', position: 'relative', zIndex: 100 },
  mobileCloseMenuBtn: { background: 'none', border: 'none', cursor: 'pointer', display: 'block' },
  collapseBtn: { position: 'absolute', right: '-12px', top: '26px', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 110, border: 'none' },
  menuTitle: { fontSize: '0.65rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1.2rem', paddingLeft: '12px' },
  menuTitleCollapsed: { display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '1.2rem' },
  menuList: { display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 },
  menuItem: { display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', borderRadius: '16px', cursor: 'pointer', boxSizing: 'border-box' },
  menuLabel: { whiteSpace: 'nowrap', fontSize: '0.85rem', letterSpacing: '0.3px' },
  content: { flex: 1, overflowY: 'auto', position: 'relative', zIndex: 5 },
  contentInner: { maxWidth: '1240px', margin: '0 auto', padding: '2.5rem 2rem', width: '100%', boxSizing: 'border-box' },
  btnMenuMobile: { display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }
};

export default Layout;