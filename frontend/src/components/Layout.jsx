/**
 * Logo Ali Estacionamentos - Master Layout (Fixed Mobile & Collapsible)
 * Author: Daniel Rodrigues Pereira | Year: 2026
 */
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Car, LayoutDashboard, PlusCircle, History, 
  LogOut, User, Activity, Menu, X, ChevronLeft, ChevronRight 
} from 'lucide-react';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem('username') || 'Operador';
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const theme = {
    structure: "#21261f",
    background: "#111310",
    border: "rgba(255, 255, 255, 0.08)",
    accent: "#00b247"
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const menuItems = [
    { label: 'Pátio Atual', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { label: 'Novo Veículo', icon: <PlusCircle size={20} />, path: '/adicionar' },
    { label: 'Histórico', icon: <History size={20} />, path: '/historico' },
  ];

  return (
    <div style={{...styles.appContainer, backgroundColor: theme.background}}>
      <style>{`
        @media (max-width: 768px) {
          .sidebar-desktop { 
            position: fixed !important;
            left: ${isMobileOpen ? '0' : '-300px'} !important;
            top: 0;
            bottom: 0;
            z-index: 2000;
            width: 280px !important;
            transition: left 0.3s ease-in-out !important;
            display: flex !important;
          }
          .content-area { padding: 1rem !important; }
          .navbar-main { padding: 0 1rem !important; }
          .mobile-toggle { display: flex !important; }
          .user-name-text { display: none; }
          .brand-badge { display: none; }
          .collapse-btn-desktop { display: none !important; }
        }
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
        .pulse-dot { animation: pulse 2s infinite; }
      `}</style>

      {/* 1. NAVBAR SUPERIOR */}
      <nav className="navbar-main" style={{...styles.navbar, backgroundColor: theme.structure, borderBottom: `1px solid ${theme.border}`}}>
        <div style={styles.navLeft}>
          <button 
            className="mobile-toggle" 
            style={styles.iconToggleBtn} 
            onClick={() => setIsMobileOpen(true)}
          >
            <Menu size={24} color="#fff" />
          </button>
          
          <div style={styles.brandWrapper} onClick={() => navigate('/dashboard')}>
            <div style={{...styles.logoIcon, backgroundColor: theme.background, border: `1px solid ${theme.border}`}}>
              <Car size={18} color={theme.accent} />
            </div>
            <div style={styles.brandGroup}>
              <span style={styles.brandName}>Logo Ali</span>
              <span className="brand-badge" style={styles.brandBadge}>GESTÃO</span>
            </div>
          </div>
        </div>

        <div style={styles.navRight}>
          <div style={{...styles.userInfo, backgroundColor: 'rgba(0,0,0,0.2)', border: `1px solid ${theme.border}`}}>
            <User size={14} color={theme.accent} />
            <span className="user-name-text" style={styles.userName}>{username}</span>
          </div>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            <LogOut size={20} />
          </button>
        </div>
      </nav>

      <div style={styles.mainWrapper}>
        {/* 2. SIDEBAR (CONTROLE) */}
        <aside 
          className="sidebar-desktop"
          style={{
            ...styles.sidebar, 
            width: isCollapsed ? '80px' : '280px',
            backgroundColor: theme.structure, 
            borderRight: `1px solid ${theme.border}`
          }}
        >
          {/* Header da Sidebar no Mobile */}
          <div className="mobile-toggle" style={{...styles.mobileSidebarHeader, display: 'none'}}>
            <span style={{fontWeight: 900, color: '#fff'}}>MENU</span>
            <button onClick={() => setIsMobileOpen(false)} style={styles.closeBtn}>
              <X size={24} color="#fff" />
            </button>
          </div>

          <button 
            className="collapse-btn-desktop"
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{...styles.collapseBtn, border: `1px solid ${theme.border}`, backgroundColor: theme.structure}}
          >
            {isCollapsed ? <ChevronRight size={14} color="#fff" /> : <ChevronLeft size={14} color="#fff" />}
          </button>

          <div style={styles.menuList}>
            {!isCollapsed && <p style={styles.menuTitle}>PRINCIPAL</p>}
            
            {menuItems.map((item) => (
              <div 
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsMobileOpen(false);
                }}
                style={{
                  ...styles.menuItem,
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  ...(location.pathname === item.path ? styles.menuActive : {})
                }}
              >
                <span style={location.pathname === item.path ? {color: theme.accent} : {color: '#8d948a'}}>
                  {item.icon}
                </span>
                {!isCollapsed && <span style={styles.menuLabel}>{item.label}</span>}
              </div>
            ))}
          </div>

          {!isCollapsed && (
            <div style={{...styles.sidebarFooter, borderTop: `1px solid ${theme.border}`}}>
              <div style={styles.safetyStatus}>
                <div className="pulse-dot" style={{...styles.pulse, backgroundColor: theme.accent}}></div>
                <span>SISTEMA ATIVO</span>
              </div>
            </div>
          )}
        </aside>

        {/* 3. ÁREA DE CONTEÚDO */}
        <main className="content-area" style={styles.content}>
          <div style={styles.contentInner}>
            {children}
          </div>
        </main>
      </div>

      {/* OVERLAY PARA MOBILE */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          style={styles.mobileOverlay}
        />
      )}
    </div>
  );
};

const styles = {
  appContainer: { display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden' },
  navbar: { height: '70px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem', zIndex: 1000 },
  navLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
  iconToggleBtn: { display: 'none', background: 'none', border: 'none', cursor: 'pointer' },
  brandWrapper: { display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' },
  logoIcon: { padding: '8px', borderRadius: '10px', display: 'flex' },
  brandGroup: { display: 'flex', flexDirection: 'column' },
  brandName: { fontSize: '1rem', fontWeight: '900', color: '#fff', textTransform: 'uppercase' },
  brandBadge: { color: '#4a5248', fontSize: '0.55rem', fontWeight: '800', letterSpacing: '1px' },
  navRight: { display: 'flex', alignItems: 'center', gap: '1rem' },
  userInfo: { display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '10px' },
  userName: { fontSize: '0.8rem', fontWeight: '800', color: '#fff' },
  logoutBtn: { background: 'none', border: 'none', color: '#4a5248', cursor: 'pointer', padding: '5px' },
  mainWrapper: { display: 'flex', flex: 1, overflow: 'hidden' },
  sidebar: { display: 'flex', flexDirection: 'column', padding: '1.5rem 1rem', transition: 'width 0.3s ease', position: 'relative' },
  collapseBtn: { position: 'absolute', right: '-12px', top: '20px', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 100 },
  mobileSidebarHeader: { padding: '1rem', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  closeBtn: { background: 'none', border: 'none', cursor: 'pointer' },
  menuTitle: { fontSize: '0.6rem', fontWeight: '900', color: '#4a5248', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1rem', paddingLeft: '10px' },
  menuList: { display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 },
  menuItem: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '12px', cursor: 'pointer', color: '#8d948a', fontWeight: '700', fontSize: '0.85rem' },
  menuActive: { backgroundColor: 'rgba(0,178,71,0.1)', color: '#fff' },
  menuLabel: { whiteSpace: 'nowrap' },
  sidebarFooter: { paddingTop: '1rem' },
  safetyStatus: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.6rem', fontWeight: '900', color: '#00b247' },
  pulse: { width: '6px', height: '6px', borderRadius: '50%' },
  content: { flex: 1, overflowY: 'auto' },
  contentInner: { maxWidth: '1200px', margin: '0 auto', padding: '2rem' },
  mobileOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1500, backdropFilter: 'blur(4px)' }
};

export default Layout;