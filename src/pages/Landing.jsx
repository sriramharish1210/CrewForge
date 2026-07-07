import React, { useState, useEffect } from 'react';
import { Play, Sparkles, Terminal, ShieldCheck, ChevronRight, Zap, RefreshCw, Cpu, Layers } from 'lucide-react';

export default function Landing({ setCurrentPage }) {
  // Live Mini-Simulator State
  const [simStep, setSimStep] = useState(0);
  const [simLogs, setSimLogs] = useState([]);
  
  const simulationSteps = [
    { text: '[Supervisor] Prompt received: "Draft marketing strategy for CrewForge"', type: 'sys' },
    { text: '[Supervisor] Analyzing requirements and creating tasks...', type: 'sys' },
    { text: '[Supervisor] Routing research segment to Researcher Agent', type: 'info' },
    { text: '[Researcher] Searching Google for "no-code multi-agent tools"', type: 'tool' },
    { text: '[Researcher] Scraping competitors and compiling specs...', type: 'tool' },
    { text: '[Researcher] Synthesizing findings (24 sources checked)', type: 'success' },
    { text: '[Supervisor] Validating source data and delegating draft task', type: 'info' },
    { text: '[Writer] Structuring landing draft with high-conversion frameworks', type: 'tool' },
    { text: '[Writer] Formatting final copy in markdown', type: 'tool' },
    { text: '[Supervisor] All tests passed. Execution complete. (Duration: 14s)', type: 'success' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSimStep((prev) => {
        const next = (prev + 1) % (simulationSteps.length + 1);
        if (next === 0) {
          setSimLogs([]);
        } else {
          setSimLogs(simulationSteps.slice(0, next));
        }
        return next;
      });
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="dot-grid-bg" style={{ minHeight: 'calc(100vh - 64px)', padding: '60px 40px 100px 40px' }}>
      
      {/* Hero Section */}
      <div 
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          paddingBottom: '80px',
        }}
      >
        {/* Release Tag */}
        <div 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            backgroundColor: 'rgba(168, 85, 247, 0.08)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: 500,
            color: '#c084fc',
          }}
        >
          <Sparkles size={14} />
          <span>Introducing CrewForge v1.0 • No-Code Agent Orchestrator</span>
        </div>

        {/* Large Typography Title */}
        <h1 
          style={{
            fontSize: '56px',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            fontFamily: 'var(--font-display)',
            maxWidth: '850px',
            color: '#fff',
          }}
        >
          Assemble Custom AI Agent Teams <br />
          <span className="gradient-text">Without a Single Line of Code</span>
        </h1>

        {/* Subtitle */}
        <p 
          style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            maxWidth: '650px',
            lineHeight: 1.6,
          }}
        >
          Define custom agents, assign roles, supply API tools, and orchestrate complex autonomous workflows in a premium visual interface.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px' }}>
          <button 
            className="btn btn-primary" 
            style={{ fontSize: '15px', padding: '12px 24px' }}
            onClick={() => setCurrentPage('dashboard')}
          >
            Enter Dashboard
            <ChevronRight size={16} />
          </button>
          
          <button 
            className="btn btn-secondary"
            style={{ fontSize: '15px', padding: '12px 24px' }}
            onClick={() => setCurrentPage('create-team')}
          >
            Build a Team
          </button>
        </div>
      </div>

      {/* Simulator Panel (Visual & Output Console side-by-side) */}
      <div 
        style={{
          maxWidth: '1100px',
          margin: '0 auto 80px auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '32px',
          alignItems: 'stretch',
        }}
      >
        {/* Left Side: Visual Nodes Flow */}
        <div 
          className="premium-card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'var(--bg-secondary)',
            borderColor: 'var(--border-secondary)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle background glow */}
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />

          <div>
            <div className="flex-between" style={{ marginBottom: '20px', zIndex: 2, position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ padding: '6px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                  <Layers size={16} className="gradient-text" />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 600 }}>Active Orchestration Node</h3>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Visual workflow simulation</span>
                </div>
              </div>
              <div 
                className="badge badge-purple"
                style={{ animation: simStep > 0 && simStep < 10 ? 'pulseGlow 1.5s infinite ease-in-out' : '' }}
              >
                <RefreshCw size={10} className={simStep > 0 && simStep < 10 ? 'animate-spin-slow' : ''} style={{ marginRight: '4px' }} />
                {simStep === 0 || simStep === 10 ? 'Ready' : 'Simulating'}
              </div>
            </div>

            {/* Visual Flow Elements */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '24px',
                position: 'relative',
                padding: '10px 0',
                zIndex: 2,
              }}
            >
              {/* Supervisor Card */}
              <div 
                className="glass-panel"
                style={{
                  width: '240px',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  border: `1px solid ${[1, 2, 3, 7, 9, 10].includes(simStep) ? 'var(--accent-purple)' : 'var(--border-primary)'}`,
                  boxShadow: [1, 2, 3, 7, 9, 10].includes(simStep) ? 'var(--glow-shadow)' : 'none',
                  transition: 'var(--transition-smooth)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-purple)' }} />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>Supervisor Agent</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>Orchestrator Node • Gemini 2.5 Flash</div>
              </div>

              {/* Line Connector 1 */}
              <div 
                style={{
                  width: '2px',
                  height: '24px',
                  background: [3, 4, 5, 6].includes(simStep) ? 'linear-gradient(to bottom, var(--accent-purple), var(--accent-blue))' : 'var(--border-primary)',
                  transition: 'var(--transition-smooth)',
                }}
              />

              {/* Researcher Card */}
              <div 
                className="glass-panel"
                style={{
                  width: '240px',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  border: `1px solid ${[4, 5, 6].includes(simStep) ? 'var(--accent-blue)' : 'var(--border-primary)'}`,
                  boxShadow: [4, 5, 6].includes(simStep) ? 'var(--glow-shadow-blue)' : 'none',
                  transition: 'var(--transition-smooth)',
                  transform: [4, 5, 6].includes(simStep) ? 'scale(1.02)' : 'scale(1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-blue)' }} />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>Web Researcher</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>Data Miner • Gemini 2.5 Flash</div>
              </div>

              {/* Line Connector 2 */}
              <div 
                style={{
                  width: '2px',
                  height: '24px',
                  background: [7, 8, 9].includes(simStep) ? 'linear-gradient(to bottom, var(--accent-purple), var(--accent-emerald))' : 'var(--border-primary)',
                  transition: 'var(--transition-smooth)',
                }}
              />

              {/* Writer Card */}
              <div 
                className="glass-panel"
                style={{
                  width: '240px',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  border: `1px solid ${[8, 9].includes(simStep) ? 'var(--accent-emerald)' : 'var(--border-primary)'}`,
                  boxShadow: [8, 9].includes(simStep) ? '0 0 20px rgba(16, 185, 129, 0.15)' : 'none',
                  transition: 'var(--transition-smooth)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-emerald)' }} />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>Document Writer</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>Technical Writer • Gemini Pro</div>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '11px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-primary)', paddingTop: '12px', marginTop: '20px', zIndex: 2 }}>
            💡 Hover nodes in the workspace editor to edit parameters and tools.
          </div>
        </div>

        {/* Right Side: Output Panel Streaming logs */}
        <div 
          className="premium-card"
          style={{
            background: '#070709',
            borderColor: 'var(--border-secondary)',
            fontFamily: 'monospace',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div className="flex-between" style={{ borderBottom: '1px solid var(--border-primary)', paddingBottom: '12px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={14} style={{ color: 'var(--accent-purple)' }} />
              <span style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>Live Output Stream</span>
            </div>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>forge-sandbox:active</span>
          </div>

          <div 
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              fontSize: '12px',
              overflowY: 'auto',
              minHeight: '260px',
              maxHeight: '300px',
            }}
          >
            {simLogs.length === 0 ? (
              <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Awaiting pipeline execution...</span>
            ) : (
              simLogs.map((log, index) => {
                let color = 'var(--text-secondary)';
                if (log.type === 'sys') color = '#c084fc';
                if (log.type === 'tool') color = '#60a5fa';
                if (log.type === 'success') color = '#34d399';
                if (log.type === 'info') color = '#a1a1aa';

                return (
                  <div key={index} style={{ color, borderLeft: '2px solid rgba(255,255,255,0.05)', paddingLeft: '8px' }}>
                    {log.text}
                  </div>
                );
              })
            )}
          </div>

          <div 
            style={{
              backgroundColor: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-primary)',
              borderRadius: '6px',
              padding: '10px',
              marginTop: '16px',
              fontSize: '11px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ color: 'var(--text-muted)' }}>Status: {simStep === 10 ? 'Execution Complete' : simStep === 0 ? 'Queue Empty' : 'Running Workflow'}</span>
            <span style={{ color: 'var(--accent-purple)' }}>{simLogs.length}/10 logs</span>
          </div>
        </div>
      </div>

      {/* Core Features Grid */}
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '40px', fontFamily: 'var(--font-display)' }}>
          Design Features Built for <span className="gradient-text">Agentic Excellence</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          <div className="premium-card">
            <Cpu size={24} style={{ color: 'var(--accent-purple)', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Visual Construct Space</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Drag, align, and configure individual agents. Grant specific system instructions and memory boundaries in seconds.
            </p>
          </div>

          <div className="premium-card">
            <Zap size={24} style={{ color: 'var(--accent-blue)', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Dynamic Tool Sandbox</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Give your agents access to search queries, mathematical processing sandboxes, and structural scrapers dynamically.
            </p>
          </div>

          <div className="premium-card">
            <ShieldCheck size={24} style={{ color: 'var(--accent-emerald)', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Enterprise Token Control</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Manage model routing, API cost caps, and run records inside a secure, centralized dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
