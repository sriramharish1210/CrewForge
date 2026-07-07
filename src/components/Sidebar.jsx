import React from 'react';
import { Home, LayoutDashboard, Users, Play, History, Settings, ChevronLeft, ChevronRight, Cpu } from 'lucide-react';

export default function Sidebar({ currentPage, setCurrentPage, isCollapsed, setIsCollapsed }) {
  const menuItems = [
    { id: 'landing', label: 'Landing Page', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'create-team', label: 'Create Team', icon: Users },
    { id: 'run-workflow', label: 'Run Workflow', icon: Play },
    { id: 'history', label: 'History & Logs', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div
      className="glass-panel"
      style={{
        width: isCollapsed ? '72px' : '260px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid var(--border-primary)',
        transition: 'var(--transition-smooth)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'var(--bg-secondary)',
      }}
    >
      {/* Brand Section */}
      <div
        style={{
          padding: '24px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderBottom: '1px solid var(--border-primary)',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        <div
          style={{
            minWidth: '36px',
            height: '36px',
            borderRadius: '8px',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--glow-shadow)',
          }}
        >
          <Cpu size={20} color="#fff" />
        </div>
        {!isCollapsed && (
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '18px',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            Crew<span className="gradient-text">Forge</span>
          </span>
        )}
      </div>

      {/* Navigation Menu */}
      <nav
        style={{
          flex: 1,
          padding: '24px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1px solid transparent',
                backgroundColor: isActive ? 'var(--bg-active)' : 'transparent',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
                textAlign: 'left',
                outline: 'none',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              {/* Left glow strip for active item */}
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '20%',
                    height: '60%',
                    width: '3px',
                    background: 'var(--accent-gradient)',
                    borderRadius: '0 4px 4px 0',
                  }}
                />
              )}

              <Icon size={18} style={{ color: isActive ? 'var(--accent-purple)' : 'inherit' }} />

              {!isCollapsed && (
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: isActive ? 500 : 400,
                  }}
                >
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse Trigger Button */}
      <div
        style={{
          padding: '12px 16px',
          display: 'flex',
          justifyContent: isCollapsed ? 'center' : 'flex-end',
          borderTop: '1px solid var(--border-primary)',
        }}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-primary)',
            color: 'var(--text-secondary)',
            borderRadius: '6px',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'var(--transition-fast)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-secondary)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-primary)'}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* User Section */}
      <div
        style={{
          padding: '20px 16px',
          borderTop: '1px solid var(--border-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        <div
          style={{
            minWidth: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
            border: '2px solid var(--border-primary)',
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '600',
            color: '#fff',
            fontSize: '14px',
          }}
        >
          SH
        </div>
        {!isCollapsed && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--text-primary)',
              }}
            >
              SRIRAM
            </span>
            <span
              style={{
                fontSize: '11px',
                color: 'var(--text-muted)',
              }}
            >
              Founder • CrewForge
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
