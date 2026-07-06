import React from 'react';
import { Play, Plus, Clock, Cpu, FileText, CheckCircle2, XCircle, ChevronRight, TrendingUp } from 'lucide-react';
import { DEFAULT_TEAMS, MOCK_HISTORY } from '../data/mockData';

export default function Dashboard({ setCurrentPage, setSelectedTeamId, savedTeams }) {
  const allTeams = [...DEFAULT_TEAMS, ...savedTeams];

  const handleQuickRun = (teamId) => {
    setSelectedTeamId(teamId);
    setCurrentPage('run-workflow');
  };

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px', minHeight: 'calc(100vh - 64px)' }}>
      {/* Dashboard Welcome Header */}
      <div className="flex-between">
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, fontFamily: 'var(--font-display)' }}>System Dashboard</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Monitor agent executions, costs, and quick-start active worker nodes.
          </p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setCurrentPage('create-team')}
        >
          <Plus size={16} />
          Create New Team
        </button>
      </div>

      {/* Grid of Key Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        <div className="premium-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: 'rgba(168, 85, 247, 0.1)', display: 'flex', alignItems: 'center', justifyCentert: 'center', display: 'inline-flex', justifyContent: 'center' }}>
            <Cpu size={20} style={{ color: 'var(--accent-purple)', alignSelf: 'center' }} />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Configured Teams</span>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginTop: '2px' }}>{allTeams.length}</h2>
          </div>
        </div>

        <div className="premium-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyCentert: 'center', display: 'inline-flex', justifyContent: 'center' }}>
            <Play size={20} style={{ color: 'var(--accent-blue)', alignSelf: 'center' }} />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Total Executions</span>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginTop: '2px' }}>142</h2>
          </div>
        </div>

        <div className="premium-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyCentert: 'center', display: 'inline-flex', justifyContent: 'center' }}>
            <TrendingUp size={20} style={{ color: 'var(--accent-emerald)', alignSelf: 'center' }} />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Average Cost / Run</span>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginTop: '2px' }}>$0.061</h2>
          </div>
        </div>

        <div className="premium-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: 'rgba(244, 63, 94, 0.1)', display: 'flex', alignItems: 'center', justifyCentert: 'center', display: 'inline-flex', justifyContent: 'center' }}>
            <CheckCircle2 size={20} style={{ color: 'var(--accent-emerald)', alignSelf: 'center' }} />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Success Rate</span>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginTop: '2px' }}>98.1%</h2>
          </div>
        </div>
      </div>

      {/* Main Sections: Quick Run (Left) & Recent Actions Log (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', alignItems: 'start' }}>
        
        {/* Quick Launch Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600 }}>Quick Launch Agent Teams</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {allTeams.map((team) => (
              <div 
                key={team.id}
                className="premium-card" 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '20px',
                  backgroundColor: 'var(--bg-secondary)',
                }}
              >
                <div style={{ flex: 1, paddingRight: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 600 }}>{team.name}</h3>
                    <span className="badge badge-purple" style={{ fontSize: '10px' }}>
                      {team.agents.length} Agents
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.5 }}>
                    {team.description}
                  </p>
                </div>

                <button 
                  className="btn btn-secondary"
                  onClick={() => handleQuickRun(team.id)}
                  style={{ gap: '6px', padding: '8px 14px' }}
                >
                  <Play size={14} style={{ fill: 'var(--text-primary)' }} />
                  Run
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Run Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="flex-between">
            <h2 style={{ fontSize: '16px', fontWeight: 600 }}>Recent Executions</h2>
            <button 
              className="btn btn-ghost" 
              onClick={() => setCurrentPage('history')}
              style={{ fontSize: '12px', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              View Full History
              <ChevronRight size={12} />
            </button>
          </div>

          <div 
            className="premium-card"
            style={{
              padding: '8px 0',
              backgroundColor: 'var(--bg-secondary)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {MOCK_HISTORY.map((run, index) => {
              const isSuccess = run.status === 'completed';
              return (
                <div 
                  key={run.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderBottom: index === MOCK_HISTORY.length - 1 ? 'none' : '1px solid var(--border-primary)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {isSuccess ? (
                      <CheckCircle2 size={16} style={{ color: 'var(--accent-emerald)' }} />
                    ) : (
                      <XCircle size={16} style={{ color: 'var(--accent-rose)' }} />
                    )}
                    <div>
                      <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{run.teamName}</h4>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: '200px' }}>
                        "{run.prompt}"
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-primary)', display: 'block' }}>{run.duration}</span>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{run.tokens} tokens</span>
                    </div>
                    <span 
                      style={{ 
                        fontSize: '11px', 
                        fontWeight: 500, 
                        color: isSuccess ? 'var(--accent-emerald)' : 'var(--accent-rose)' 
                      }}
                    >
                      {run.cost}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
