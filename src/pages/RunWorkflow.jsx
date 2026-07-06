import React, { useState, useEffect, useRef } from 'react';
import { Play, Sparkles, Terminal, ShieldCheck, CheckCircle2, ChevronRight, Layers, Cpu, Download, ArrowRight, CornerDownRight, RefreshCw, XCircle } from 'lucide-react';
import { DEFAULT_TEAMS, MOCK_SIMULATION_STEPS, LLM_MODELS } from '../data/mockData';

export default function RunWorkflow({ 
  selectedTeamId, 
  setSelectedTeamId, 
  savedTeams, 
  onAddHistoryItem 
}) {
  const allTeams = [...DEFAULT_TEAMS, ...savedTeams];
  
  // Find current selected team
  const currentTeam = allTeams.find(t => t.id === selectedTeamId) || allTeams[0];

  const [prompt, setPrompt] = useState('');
  const [outputFormat, setOutputFormat] = useState('markdown');
  const [costCap, setCostCap] = useState('0.50');
  
  // Execution states
  const [isRunning, setIsRunning] = useState(false);
  const [stepIndex, setStepIndex] = useState(-1);
  const [activeLogs, setActiveLogs] = useState([]);
  const [finalResult, setFinalResult] = useState('');
  const [executionTime, setExecutionTime] = useState(0);

  const timerRef = useRef(null);
  const simulationIntervalRef = useRef(null);
  const logEndRef = useRef(null);

  // Auto-scroll logs
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeLogs]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      clearInterval(simulationIntervalRef.current);
    };
  }, []);

  const handleStartWorkflow = () => {
    if (!prompt.trim()) {
      alert('Please enter a task description or prompt to execute.');
      return;
    }

    setIsRunning(true);
    setStepIndex(0);
    setActiveLogs([]);
    setFinalResult('');
    setExecutionTime(0);

    // Start timer
    let seconds = 0;
    timerRef.current = setInterval(() => {
      seconds += 1;
      setExecutionTime(seconds);
    }, 1000);

    // Get steps for this team. Fallback to default academic researcher steps if team steps aren't explicitly mapped.
    const steps = MOCK_SIMULATION_STEPS[currentTeam.id] || MOCK_SIMULATION_STEPS['academic-researcher'];
    let currentStep = 0;

    // Simulate logs stream and step updates
    simulationIntervalRef.current = setInterval(() => {
      if (currentStep < steps.length) {
        const step = steps[currentStep];
        
        // Add log entry
        setActiveLogs(prev => [
          ...prev, 
          { text: `[${step.agent}] ${step.action}`, type: 'sys' },
          ...step.log.split('\n').map(line => ({ text: line, type: 'log' }))
        ]);

        setStepIndex(currentStep);
        currentStep += 1;
      } else {
        // Simulation finished
        clearInterval(simulationIntervalRef.current);
        clearInterval(timerRef.current);
        
        setIsRunning(false);
        setStepIndex(steps.length);
        
        // Generate mock result based on prompt & team
        const resultTemplate = getMockResultForTeam(currentTeam.id, prompt);
        setFinalResult(resultTemplate);

        // Add item to global history log
        const historyItem = {
          id: `run-${Date.now().toString().slice(-4)}`,
          teamName: currentTeam.name,
          prompt: prompt,
          status: 'completed',
          date: new Date().toISOString().slice(0, 16).replace('T', ' '),
          duration: `${Math.floor(seconds / 60)}m ${seconds % 60}s`,
          cost: `$${(steps.length * 0.015 + 0.02).toFixed(4)}`,
          tokens: `${(steps.length * 2800 + 1200).toLocaleString()}`,
          result: resultTemplate
        };
        onAddHistoryItem(historyItem);
      }
    }, 4000); // 4 seconds per agent step
  };

  const getMockResultForTeam = (teamId, promptText) => {
    if (teamId === 'marketing-squad') {
      return `# Generated Marketing Assets

## SEO Tagline Spec for: "${promptText}"
- **Primary Keywords**: SaaS scaling, orchestrate agents, visual workflows.
- **Copywriter Pitch**: "Build autonomous teams in minutes, not months. Visual node configuration connects your database, search engines, and local file storage with LLM cores."

## Social Campaign Script
- 📢 Introducing our newest deployment: custom AI workforce. Zero programming, infinite leverage. Click "Run" to spawn your research squad now!`;
    }
    
    if (teamId === 'code-dev-qa') {
      return `# Code Forge Synthesis Report

## Spec & Requirements
- Node Routing: BST layout
- Output Structure: JavaScript ES6 export

## Source Code (Validated by QA Tester)
\`\`\`javascript
export class DirectoryNode {
  constructor(name, path) {
    this.name = name;
    this.path = path;
    this.left = null;
    this.right = null;
  }
}
\`\`\`
*Verification: All 6 integration unit tests passed. Deployment sandbox exited clean.*`;
    }

    // Default Academic style
    return `# Synthesis Analysis Report: "${promptText}"

## Section 1: Core Research Synthesis
Primary search terms returned 14 academic citations. Identified key parameters and commercial pilots operating at a scale of 100MWh.

## Section 2: Industrial Outlook (2026-2028)
- Transition from prototype cells to pre-production lines is underway.
- Main barrier to entry: solid electrolyte volume cracking under rapid expansion cycling.

---
*Generated by CrewForge visual team orchestrator.*`;
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([finalResult], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${currentTeam.name.toLowerCase().replace(/\s+/g, '-')}-output.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const steps = MOCK_SIMULATION_STEPS[currentTeam.id] || MOCK_SIMULATION_STEPS['academic-researcher'];

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', minHeight: 'calc(100vh - 64px)' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '26px', fontWeight: 700, fontFamily: 'var(--font-display)' }}>Run Workflow Workspace</h1>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Select your assembled team, input guidelines, and monitor raw execution timelines.
        </p>
      </div>

      {/* Main Grid: Control Panel (Left) & Monitoring Dashboard (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '32px', alignItems: 'start' }}>
        
        {/* Left Side: Setup & Input Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="premium-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600 }}>Workflow Control</h2>

            {/* Team Selection */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '8px' }}>SELECT TEAM</label>
              <select 
                value={selectedTeamId}
                onChange={(e) => {
                  setSelectedTeamId(e.target.value);
                  setIsRunning(false);
                  setStepIndex(-1);
                  setActiveLogs([]);
                  setFinalResult('');
                }}
                disabled={isRunning}
                className="input-field"
                style={{ appearance: 'none', background: 'var(--bg-primary) url("data:image/svg+xml;utf8,<svg fill=\'%23a1a1aa\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>") no-repeat right 12px center' }}
              >
                {allTeams.map(team => (
                  <option key={team.id} value={team.id}>{team.name} ({team.agents.length} Agents)</option>
                ))}
              </select>
            </div>

            {/* Prompt Input */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '8px' }}>INPUT TASK PROMPT</label>
              <textarea 
                rows={5}
                placeholder="Enter prompt instruction for the team (e.g. Write a brief on solid-state battery progress)..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isRunning}
                className="input-field"
                style={{ resize: 'vertical', minHeight: '100px', fontSize: '13px' }}
              />
            </div>

            {/* Parameters Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>OUTPUT TYPE</label>
                <select 
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value)}
                  disabled={isRunning}
                  className="input-field"
                >
                  <option value="markdown">Markdown File (.md)</option>
                  <option value="json">Structured JSON</option>
                  <option value="raw">Raw Console Log</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>API COST CAP</label>
                <select 
                  value={costCap}
                  onChange={(e) => setCostCap(e.target.value)}
                  disabled={isRunning}
                  className="input-field"
                >
                  <option value="0.25">$0.25 max cap</option>
                  <option value="0.50">$0.50 max cap</option>
                  <option value="1.00">$1.00 max cap</option>
                  <option value="5.00">$5.00 max cap</option>
                </select>
              </div>
            </div>

            {/* Trigger Button */}
            <button
              onClick={handleStartWorkflow}
              disabled={isRunning || !prompt.trim()}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '10px' }}
            >
              {isRunning ? (
                <>
                  <RefreshCw size={16} className="animate-spin-slow" />
                  Running Forge Orchestrator...
                </>
              ) : (
                <>
                  <Play size={16} style={{ fill: '#fff' }} />
                  Trigger Workflow Execution
                </>
              )}
            </button>
          </div>

          {/* Active Team Specifications Card */}
          <div className="premium-card" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>Active Nodes in Pipeline</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {currentTeam.agents.map((agent, idx) => (
                <div key={agent.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-primary)', fontSize: '10px', color: 'var(--text-muted)' }}>
                    {idx + 1}
                  </div>
                  <span style={{ color: '#fff', fontWeight: 500 }}>{agent.name}</span>
                  <span style={{ color: 'var(--text-muted)' }}>({agent.role})</span>
                  <span className="badge badge-purple" style={{ marginLeft: 'auto', fontSize: '9px' }}>
                    {LLM_MODELS.find(m => m.id === agent.model)?.name || agent.model}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Stepper Timeline & Logs Terminal */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Output Stepper Timeline */}
          {stepIndex >= 0 && (
            <div className="premium-card">
              <h2 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>Execution Stepper Timeline</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative' }}>
                {/* Visual timeline vertical line */}
                <div 
                  style={{
                    position: 'absolute',
                    left: '11px',
                    top: '12px',
                    bottom: '12px',
                    width: '2px',
                    backgroundColor: 'var(--border-primary)',
                    zIndex: 1,
                  }}
                />

                {steps.map((step, idx) => {
                  const isActive = idx === stepIndex && isRunning;
                  const isDone = idx < stepIndex;
                  const isUpcoming = idx > stepIndex;

                  let borderCol = 'var(--border-primary)';
                  let bgCol = 'var(--bg-primary)';
                  let glow = 'none';
                  
                  if (isActive) {
                    borderCol = 'var(--accent-purple)';
                    bgCol = 'rgba(168, 85, 247, 0.2)';
                    glow = '0 0 10px var(--accent-purple)';
                  } else if (isDone) {
                    borderCol = 'var(--accent-emerald)';
                    bgCol = 'rgba(16, 185, 129, 0.15)';
                  }

                  return (
                    <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', zIndex: 2 }}>
                      <div 
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          border: `2px solid ${borderCol}`,
                          backgroundColor: bgCol,
                          boxShadow: glow,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'var(--transition-smooth)',
                        }}
                      >
                        {isDone ? (
                          <CheckCircle2 size={12} color="var(--accent-emerald)" />
                        ) : isActive ? (
                          <RefreshCw size={10} className="animate-spin-slow" color="var(--accent-purple)" />
                        ) : (
                          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--text-muted)' }} />
                        )}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: isActive ? '#fff' : isUpcoming ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                            {step.agent}
                          </span>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{step.duration}</span>
                        </div>
                        <p style={{ fontSize: '11px', color: isActive ? 'var(--text-secondary)' : 'var(--text-muted)', marginTop: '2px' }}>
                          {step.action}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Logs & Final Output panel */}
          {stepIndex >= 0 && (
            <div 
              className="premium-card" 
              style={{ 
                background: '#070709', 
                borderColor: 'var(--border-secondary)', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px' 
              }}
            >
              <div className="flex-between" style={{ borderBottom: '1px solid var(--border-primary)', paddingBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Terminal size={14} style={{ color: 'var(--accent-purple)' }} />
                  <span style={{ fontSize: '13px', fontFamily: 'monospace', color: 'var(--text-primary)' }}>Console Output Panel</span>
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', gap: '10px' }}>
                  <span>Cost cap: ${costCap}</span>
                  <span>Time: {executionTime}s</span>
                </div>
              </div>

              {/* Streaming Logs Box */}
              <div 
                style={{
                  maxHeight: '260px',
                  overflowY: 'auto',
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  padding: '10px',
                  background: 'rgba(0,0,0,0.1)',
                  borderRadius: '6px',
                  border: '1px solid var(--border-primary)',
                }}
              >
                {activeLogs.map((log, i) => (
                  <div 
                    key={i} 
                    style={{ 
                      color: log.type === 'sys' ? '#c084fc' : 'var(--text-secondary)',
                      lineHeight: 1.4,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {log.type === 'sys' ? `> ${log.text}` : `  ${log.text}`}
                  </div>
                ))}
                <div ref={logEndRef} />
              </div>

              {/* Final Generated Artifact (Only visible when complete) */}
              {finalResult && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid var(--border-primary)', paddingTop: '14px', marginTop: '4px' }}>
                  <div className="flex-between">
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Compiled Markdown Artifact</span>
                    <button 
                      className="btn btn-secondary" 
                      onClick={handleDownload}
                      style={{ padding: '6px 10px', fontSize: '11px', gap: '6px' }}
                    >
                      <Download size={12} />
                      Export Artifact
                    </button>
                  </div>
                  <div 
                    style={{
                      maxHeight: '240px',
                      overflowY: 'auto',
                      padding: '16px',
                      backgroundColor: 'rgba(255,255,255,0.01)',
                      border: '1px solid var(--border-primary)',
                      borderRadius: '8px',
                      fontSize: '13px',
                      lineHeight: 1.6,
                      color: 'var(--text-primary)',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {finalResult}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
