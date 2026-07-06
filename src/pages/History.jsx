import React, { useState } from 'react';
import { Search, Calendar, ShieldCheck, CheckCircle2, XCircle, Download, Clock, DollarSign, Cpu, FileText, ChevronRight, CornerDownRight } from 'lucide-react';

export default function History({ history }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all, completed, failed
  const [selectedRun, setSelectedRun] = useState(null);

  const filteredHistory = history.filter(run => {
    const matchesSearch = run.teamName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          run.prompt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || run.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleDownloadResult = (run) => {
    const element = document.createElement("a");
    const file = new Blob([run.result], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${run.teamName.toLowerCase().replace(/\s+/g, '-')}-${run.id}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', minHeight: 'calc(100vh - 64px)' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '26px', fontWeight: 700, fontFamily: 'var(--font-display)' }}>Execution History & Logs</h1>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Browse, filter, and audit past agent executions and generated deliverables.
        </p>
      </div>

      {/* Search & Filters */}
      <div 
        style={{ 
          display: 'flex', 
          gap: '16px', 
          alignItems: 'center', 
          backgroundColor: 'var(--bg-secondary)', 
          border: '1px solid var(--border-primary)', 
          borderRadius: '8px', 
          padding: '12px 16px' 
        }}
      >
        <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search prompt, team name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '36px', height: '38px', backgroundColor: 'var(--bg-primary)' }}
          />
        </div>

        <div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field"
            style={{ width: '160px', height: '38px', backgroundColor: 'var(--bg-primary)' }}
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed Successfully</option>
            <option value="failed">Failed / Aborted</option>
          </select>
        </div>
      </div>

      {/* Main Grid: List (Left) & Sidebar details (Right) */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: selectedRun ? '1.2fr 1fr' : '1fr', 
          gap: '24px', 
          alignItems: 'start',
          transition: 'var(--transition-smooth)'
        }}
      >
        
        {/* Table of History items */}
        <div 
          className="premium-card" 
          style={{ 
            padding: 0, 
            overflow: 'hidden', 
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-primary)'
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-primary)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '16px 20px', fontWeight: 500 }}>TEAM NAME</th>
                  <th style={{ padding: '16px 20px', fontWeight: 500 }}>PROMPT REQUEST</th>
                  <th style={{ padding: '16px 20px', fontWeight: 500 }}>STATUS</th>
                  <th style={{ padding: '16px 20px', fontWeight: 500 }}>DATE</th>
                  <th style={{ padding: '16px 20px', fontWeight: 500 }}>DURATION</th>
                  <th style={{ padding: '16px 20px', fontWeight: 500 }}>COST</th>
                  <th style={{ padding: '16px 20px', fontWeight: 500 }}></th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                      No history runs match filter requirements.
                    </td>
                  </tr>
                ) : (
                  filteredHistory.map((run) => {
                    const isSelected = selectedRun && selectedRun.id === run.id;
                    const isSuccess = run.status === 'completed';
                    
                    return (
                      <tr 
                        key={run.id}
                        onClick={() => setSelectedRun(run)}
                        style={{ 
                          borderBottom: '1px solid var(--border-primary)', 
                          cursor: 'pointer',
                          backgroundColor: isSelected ? 'var(--bg-active)' : 'transparent',
                          transition: 'var(--transition-fast)',
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)';
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <td style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--text-primary)' }}>{run.teamName}</td>
                        <td style={{ padding: '16px 20px', color: 'var(--text-secondary)', maxInlineSize: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {run.prompt}
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: isSuccess ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                            {isSuccess ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                            {run.status}
                          </span>
                        </td>
                        <td style={{ padding: '16px 20px', color: 'var(--text-muted)' }}>{run.date}</td>
                        <td style={{ padding: '16px 20px', color: 'var(--text-secondary)' }}>{run.duration}</td>
                        <td style={{ padding: '16px 20px', fontWeight: 500, color: isSuccess ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>{run.cost}</td>
                        <td style={{ padding: '16px 20px', color: 'var(--text-muted)', textAlign: 'right' }}>
                          <ChevronRight size={16} />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar details Drawer */}
        {selectedRun && (
          <div 
            className="premium-card" 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '20px', 
              position: 'sticky', 
              top: '88px',
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-secondary)'
            }}
          >
            <div className="flex-between" style={{ borderBottom: '1px solid var(--border-primary)', paddingBottom: '12px' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>Run Details: {selectedRun.id}</h3>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Logged at {selectedRun.date}</span>
              </div>
              <button 
                onClick={() => setSelectedRun(null)}
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: 'var(--text-muted)', 
                  cursor: 'pointer',
                  fontSize: '18px',
                  lineHeight: '1px'
                }}
              >
                &times;
              </button>
            </div>

            {/* Run Parameters Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '13px', borderBottom: '1px solid var(--border-primary)', paddingBottom: '12px' }}>
                <span style={{ display: 'block', fontSize: '10px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>INPUT TASK PROMPT</span>
                <p style={{ color: 'var(--text-primary)', fontStyle: 'italic', lineHeight: 1.4 }}>
                  "{selectedRun.prompt}"
                </p>
              </div>

              {/* Stats Metrics Sub-grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px' }}>
                <div style={{ padding: '10px', backgroundColor: 'var(--bg-primary)', borderRadius: '6px', border: '1px solid var(--border-primary)' }}>
                  <span style={{ display: 'block', fontSize: '9px', color: 'var(--text-muted)', marginBottom: '4px' }}>DURATION</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    <Clock size={12} />
                    {selectedRun.duration}
                  </div>
                </div>

                <div style={{ padding: '10px', backgroundColor: 'var(--bg-primary)', borderRadius: '6px', border: '1px solid var(--border-primary)' }}>
                  <span style={{ display: 'block', fontSize: '9px', color: 'var(--text-muted)', marginBottom: '4px' }}>TOTAL COST</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, color: selectedRun.status === 'completed' ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                    <DollarSign size={12} />
                    {selectedRun.cost}
                  </div>
                </div>

                <div style={{ padding: '10px', backgroundColor: 'var(--bg-primary)', borderRadius: '6px', border: '1px solid var(--border-primary)' }}>
                  <span style={{ display: 'block', fontSize: '9px', color: 'var(--text-muted)', marginBottom: '4px' }}>TOTAL TOKENS</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    <Cpu size={12} />
                    {selectedRun.tokens}
                  </div>
                </div>

                <div style={{ padding: '10px', backgroundColor: 'var(--bg-primary)', borderRadius: '6px', border: '1px solid var(--border-primary)' }}>
                  <span style={{ display: 'block', fontSize: '9px', color: 'var(--text-muted)', marginBottom: '4px' }}>DELIVERABLES</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    <FileText size={12} />
                    {selectedRun.status === 'completed' ? '1 Markdown' : '0 Output'}
                  </div>
                </div>
              </div>
            </div>

            {/* Generated output sandbox (Only for successes) */}
            {selectedRun.status === 'completed' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                <div className="flex-between">
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>DELIVERABLE CONTENT</span>
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => handleDownloadResult(selectedRun)}
                    style={{ padding: '4px 8px', fontSize: '11px', gap: '4px' }}
                  >
                    <Download size={11} />
                    Download File
                  </button>
                </div>
                <div 
                  style={{
                    maxHeight: '280px',
                    overflowY: 'auto',
                    padding: '14px',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: '6px',
                    fontSize: '12px',
                    lineHeight: 1.5,
                    color: 'var(--text-secondary)',
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'monospace'
                  }}
                >
                  {selectedRun.result}
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '10px', padding: '12px', backgroundColor: 'rgba(244, 63, 94, 0.05)', border: '1px solid rgba(244, 63, 94, 0.15)', borderRadius: '6px', fontSize: '12px', color: 'var(--accent-rose)', alignItems: 'flex-start' }}>
                <XCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontWeight: 600, marginBottom: '2px' }}>Execution Terminated</h4>
                  <p style={{ fontSize: '11px', opacity: 0.9 }}>{selectedRun.result}</p>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
