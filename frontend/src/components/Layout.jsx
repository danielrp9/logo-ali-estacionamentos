/**
 * Logo Ali Estacionamentos - Master Layout (Role-Aware Edition)
 * Author: Daniel Rodrigues Pereira | Year: 2026
 */
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Car, LayoutDashboard, PlusCircle, History, 
  LogOut, User, Menu, X, ChevronLeft, ChevronRight, Users 
} from 'lucide-react';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem('username') || 'Operador';
  const tipoUsuario = localStorage.getItem('tipo_usuario'); // 'CL', 'FU' ou 'AD'
  
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

  // Itens básicos (Todos veem)
  const menuItems = [
    { label: 'Painel Geral', icon: <LayoutDashboard size={20} />, path: '/dashboard/' },
    { label: 'Novo Registro', icon: <PlusCircle size={20} />, path: '/adicionar/' },
    { label: 'Audit. Histórico', icon: <History size={20} />, path: '/historico/' },
  ];

  // Item exclusivo para Funcionário/Admin (Norma N01.4)
  if (tipoUsuario === 'FU' || tipoUsuario === 'AD') {
    menuItems.push({ label: 'Diretório Clientes', icon: <Users size={20} />, path: '/clientes/' });
  }

  return (
    <div style={{...styles.appContainer, backgroundColor: theme.background}}>
      <style>{`
        @media (max-width: 768px) {
          .sidebar-desktop { 
            position: fixed !important;
            left: ${isMobileOpen ? '0' : '-300px'} !important;
            top: 0; bottom: 0; z-index: 2000; width: 280px !important;
            transition: left 0.3s ease-in-out !important; display: flex !important;
          }
          .navbar-main { padding: 0 1rem !important; }
          .collapse-btn-desktop { display: none !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="navbar-main" style={{...styles.navbar, backgroundColor: theme.structure, borderBottom: `1px solid ${theme.border}`}}>
        <div style={styles.navLeft}>
          <button style={styles.btnMenuMobile} onClick={() => setIsMobileOpen(true)}><Menu color="#fff" /></button>
          <div style={styles.brandWrapper} onClick={() => navigate('/dashboard')}>
            <Car color={theme.accent} size={20} />
            <span style={styles.brandName}>Logo Ali</span>
            <span style={styles.roleBadge}>{tipoUsuario === 'CL' ? 'CLIENTE' : 'OPERACIONAL'}</span>
          </div>
        </div>

        <div style={styles.navRight}>
          <div style={{...styles.userInfo, backgroundColor: 'rgba(0,0,0,0.2)', border: `1px solid ${theme.border}`}}>
            <User size={14} color={theme.accent} />
            <span style={styles.userName}>{username}</span>
          </div>
          <button onClick={handleLogout} style={styles.logoutBtn}><LogOut size={20} /></button>
        </div>
      </nav>

      <div style={styles.mainWrapper}>
        {/* SIDEBAR */}
        <aside className="sidebar-desktop" style={{...styles.sidebar, width: isCollapsed ? '80px' : '280px', backgroundColor: theme.structure, borderRight: `1px solid ${theme.border}`}}>
          <button 
            className="collapse-btn-desktop"
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{...styles.collapseBtn, border: `1px solid ${theme.border}`, backgroundColor: theme.structure}}
          >
            {isCollapsed ? <ChevronRight size={14} color="#fff" /> : <ChevronLeft size={14} color="#fff" />}
          </button>

          <div style={styles.menuList}>
            {!isCollapsed && <p style={styles.menuTitle}>TERMINAL OPERACIONAL</p>}
            
            {menuItems.map((item) => (
              <div 
                key={item.path}
                onClick={() => { navigate(item.path); setIsMobileOpen(false); }}
                style={{
                  ...styles.menuItem,
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  backgroundColor: location.pathname === item.path ? 'rgba(0,178,71,0.1)' : 'transparent'
                }}
              >
                <span style={{color: location.pathname === item.path ? theme.accent : '#8d948a'}}>
                  {item.icon}
                </span>
                {!isCollapsed && <span style={{...styles.menuLabel, color: location.pathname === item.path ? '#fff' : '#8d948a'}}>{item.label}</span>}
              </div>
            ))}
          </div>
        </aside>

        <main style={styles.content}>
          <div style={styles.contentInner}>{children}</div>
        </main>
      </div>
      
      {isMobileOpen && <div onClick={() => setIsMobileOpen(false)} style={styles.mobileOverlay} />}
    </div>
  );
};

const styles = {
  appContainer: { display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden' },
  navbar: { height: '70px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem', zIndex: 1000 },
  navLeft: { display: 'flex', alignItems: 'center', gap: '1.2rem' },
  brandWrapper: { display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' },
  brandName: { fontWeight: '900', color: '#fff', textTransform: 'uppercase', fontSize: '1rem' },
  roleBadge: { fontSize: '0.5rem', fontWeight: '900', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.05)', color: '#4a5248', marginLeft: '5px' },
  navRight: { display: 'flex', alignItems: 'center', gap: '1rem' },
  userInfo: { display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '10px' },
  userName: { fontSize: '0.8rem', fontWeight: '800', color: '#fff' },
  logoutBtn: { background: 'none', border: 'none', color: '#4a5248', cursor: 'pointer' },
  mainWrapper: { display: 'flex', flex: 1, overflow: 'hidden' },
  sidebar: { display: 'flex', flexDirection: 'column', padding: '1.5rem 1rem', transition: 'width 0.3s ease', position: 'relative' },
  collapseBtn: { position: 'absolute', right: '-12px', top: '20px', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 100 },
  menuTitle: { fontSize: '0.6rem', fontWeight: '900', color: '#4a5248', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1rem', paddingLeft: '10px' },
  menuList: { display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 },
  menuItem: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '12px', cursor: 'pointer' },
  menuLabel: { whiteSpace: 'nowrap', fontSize: '0.85rem', fontWeight: '700' },
  content: { flex: 1, overflowY: 'auto' },
  contentInner: { maxWidth: '1200px', margin: '0 auto', padding: '2rem' },
  mobileOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1500, backdropFilter: 'blur(4px)' },
  btnMenuMobile: { display: 'none', background: 'none', border: 'none', cursor: 'pointer' }
};

export default Layout;