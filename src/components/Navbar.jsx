import React from 'react';
import { Search, Bell, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function Navbar({ currentPage, apiKeyStatus, setCurrentPage }) {
  const getBreadcrumbs = () => {
    switch (currentPage) {
      case 'landing':
        return ['CrewForge', 'Product Tour'];
      case 'dashboard':
        return ['CrewForge', 'Dashboard'];
      case 'create-team':
        return ['CrewForge', 'Teams', 'Constructor Workspace'];
      case 'run-workflow':
        return ['CrewForge', 'Workflows', 'Execution Monitor'];
      case 'history':
        return ['CrewForge', 'Logs & History'];
      case 'settings':
        return ['CrewForge', 'System Settings'];
      default:
        return ['CrewForge'];
    }
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header 
      className="glass-panel"
      style={{
        height: '64px',
        borderBottom: '1px solid var(--border-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backgroundColor: 'rgba(9, 9, 11, 0.7)',
      }}
    >
      {/* Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>/</span>}
            <span 
              style={{
                fontSize: '13px',
                fontWeight: idx === breadcrumbs.length - 1 ? 500 : 400,
                color: idx === breadcrumbs.length - 1 ? 'var(--text-primary)' : 'var(--text-secondary)',
              }}
            >
              {crumb}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Utilities */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
        {/* Search Mock */}
        <div 
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            width: '240px',
          }}
        >
          <Search 
            size={14} 
            style={{ 
              position: 'absolute', 
              left: '12px', 
              color: 'var(--text-muted)' 
            }} 
          />
          <input 
            type="text" 
            placeholder="Search teams, logs..." 
            style={{
              width: '100%',
              padding: '6px 12px 6px 32px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-primary)',
              borderRadius: '6px',
              fontSize: '12px',
              color: 'var(--text-primary)',
              outline: 'none',
              transition: 'var(--transition-fast)',
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = 'var(--border-secondary)'}
            onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-primary)'}
          />
          <div 
            style={{
              position: 'absolute',
              right: '8px',
              border: '1px solid var(--border-primary)',
              background: 'var(--bg-card)',
              color: 'var(--text-muted)',
              fontSize: '9px',
              padding: '2px 4px',
              borderRadius: '4px',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            ⌘K
          </div>
        </div>

        {/* API Key Status Check */}
        {apiKeyStatus ? (
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.15)',
              borderRadius: '6px',
              fontSize: '11px',
              color: 'var(--accent-emerald)',
            }}
          >
            <ShieldCheck size={12} />
            <span>API Encryption Active</span>
          </div>
        ) : (
          <button 
            onClick={() => setCurrentPage('settings')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              backgroundColor: 'rgba(249, 115, 22, 0.08)',
              border: '1px solid rgba(249, 115, 22, 0.15)',
              borderRadius: '6px',
              fontSize: '11px',
              color: '#fb923c',
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
              outline: 'none',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(249, 115, 22, 0.15)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(249, 115, 22, 0.08)'}
          >
            <AlertTriangle size={12} />
            <span>Setup API Keys</span>
          </button>
        )}

        {/* Status Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div 
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-emerald)',
              boxShadow: '0 0 8px var(--accent-emerald)',
            }}
          />
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>System Idle</span>
        </div>
      </div>
    </header>
  );
}
