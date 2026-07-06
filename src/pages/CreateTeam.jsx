import React, { useState } from 'react';
import { Plus, Trash2, Cpu, Wrench, Shield, Check, Info, ArrowDown } from 'lucide-react';
import { LLM_MODELS, AVAILABLE_TOOLS } from '../data/mockData';

export default function CreateTeam({ setCurrentPage, savedTeams, setSavedTeams }) {
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [routingType, setRoutingType] = useState('sequential'); // sequential or supervisor
  const [agents, setAgents] = useState([
    {
      id: 'agent-1',
      name: 'Supervisor Agent',
      role: 'Orchestrator',
      goal: 'Break down complex prompts, delegate items, and verify quality.',
      backstory: 'An efficient manager expert in routing and validating work.',
      model: 'gpt-4o',
      tools: []
    },
    {
      id: 'agent-2',
      name: 'Researcher Agent',
      role: 'Data Miner',
      goal: 'Gather sources and query key parameters.',
      backstory: 'A detail-oriented analyst prioritizing raw statistics.',
      model: 'claude-3-5',
      tools: ['web_search']
    }
  ]);

  const [selectedAgentId, setSelectedAgentId] = useState('agent-1');

  // Agent Form State (bound to selectedAgentId)
  const currentAgent = agents.find(a => a.id === selectedAgentId) || agents[0];

  const updateCurrentAgent = (field, value) => {
    setAgents(prev => prev.map(agent => {
      if (agent.id === selectedAgentId) {
        return { ...agent, [field]: value };
      }
      return agent;
    }));
  };

  const toggleToolForCurrentAgent = (toolId) => {
    const activeTools = currentAgent.tools || [];
    const newTools = activeTools.includes(toolId)
      ? activeTools.filter(id => id !== toolId)
      : [...activeTools, toolId];
    updateCurrentAgent('tools', newTools);
  };

  const handleAddAgent = () => {
    const newId = `agent-${Date.now()}`;
    const newAgent = {
      id: newId,
      name: `Agent ${agents.length + 1}`,
      role: 'Contributor',
      goal: 'Complete specific assignments delegated by the team.',
      backstory: 'A helpful AI collaborator with strong execution capability.',
      model: 'gpt-4o',
      tools: []
    };
    setAgents([...agents, newAgent]);
    setSelectedAgentId(newId);
  };

  const handleDeleteAgent = (idToDelete) => {
    if (agents.length <= 1) return; // Must keep at least 1 agent
    const newAgents = agents.filter(a => a.id !== idToDelete);
    setAgents(newAgents);
    if (selectedAgentId === idToDelete) {
      setSelectedAgentId(newAgents[0].id);
    }
  };

  const handleSaveTeam = () => {
    if (!teamName.trim()) {
      alert('Please provide a name for this Agent Team.');
      return;
    }
    if (agents.length < 2) {
      alert('An agent team requires at least 2 agents to run collaborative tasks.');
      return;
    }

    const newTeam = {
      id: `custom-team-${Date.now()}`,
      name: teamName,
      description: teamDescription || 'Custom user-built agent team.',
      routingType,
      agents
    };

    setSavedTeams([...savedTeams, newTeam]);
    setCurrentPage('dashboard');
  };

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', minHeight: 'calc(100vh - 64px)' }}>
      {/* Page Header */}
      <div className="flex-between">
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, fontFamily: 'var(--font-display)' }}>Assemble New Agent Team</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Configure individual agents, choose their LLM cores, link their tools, and assign orchestrations.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary" onClick={() => setCurrentPage('dashboard')}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSaveTeam}>
            Save Team
          </button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', alignItems: 'stretch' }}>
        
        {/* Left Column: Visual Builder Canvas */}
        <div 
          className="premium-card dot-grid-bg"
          style={{
            background: 'var(--bg-secondary)',
            borderColor: 'var(--border-secondary)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '600px',
            position: 'relative',
          }}
        >
          {/* Metadata inputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '6px' }}>TEAM IDENTITY</label>
              <input 
                type="text" 
                placeholder="Team Name (e.g. Code Review Crew)" 
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="input-field"
                style={{ fontSize: '15px', fontWeight: 600 }}
              />
            </div>
            <div>
              <input 
                type="text" 
                placeholder="Description of team purpose..." 
                value={teamDescription}
                onChange={(e) => setTeamDescription(e.target.value)}
                className="input-field"
                style={{ fontSize: '13px' }}
              />
            </div>

            {/* Routing Selection */}
            <div style={{ marginTop: '10px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '8px' }}>WORKFLOW PATTERN</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setRoutingType('sequential')}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: routingType === 'sequential' ? 'var(--accent-purple)' : 'var(--border-primary)',
                    background: routingType === 'sequential' ? 'rgba(168, 85, 247, 0.04)' : 'var(--bg-card)',
                    color: routingType === 'sequential' ? 'var(--text-primary)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '12px',
                    textAlign: 'left',
                    transition: 'var(--transition-fast)',
                  }}
                >
                  <span style={{ fontWeight: 600, display: 'block', marginBottom: '2px' }}>Sequential Flow</span>
                  Agents run one after another, passing context down the line.
                </button>

                <button
                  onClick={() => setRoutingType('supervisor')}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: routingType === 'supervisor' ? 'var(--accent-purple)' : 'var(--border-primary)',
                    background: routingType === 'supervisor' ? 'rgba(168, 85, 247, 0.04)' : 'var(--bg-card)',
                    color: routingType === 'supervisor' ? 'var(--text-primary)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '12px',
                    textAlign: 'left',
                    transition: 'var(--transition-fast)',
                  }}
                >
                  <span style={{ fontWeight: 600, display: 'block', marginBottom: '2px' }}>Supervisor Routing</span>
                  A supervisor agent coordinates, delegating tasks and reviewing results.
                </button>
              </div>
            </div>
          </div>

          {/* Visual Canvas containing Node List */}
          <div 
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              padding: '20px 0',
            }}
          >
            {agents.map((agent, index) => {
              const isSelected = agent.id === selectedAgentId;
              return (
                <React.Fragment key={agent.id}>
                  {index > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '-4px 0' }}>
                      <ArrowDown size={16} style={{ color: 'var(--text-muted)' }} />
                    </div>
                  )}

                  <div 
                    onClick={() => setSelectedAgentId(agent.id)}
                    className="glass-panel"
                    style={{
                      width: '320px',
                      borderRadius: '10px',
                      padding: '14px 18px',
                      border: isSelected ? '1.5px solid var(--accent-purple)' : '1px solid var(--border-primary)',
                      boxShadow: isSelected ? 'var(--glow-shadow)' : 'none',
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)',
                      position: 'relative',
                    }}
                  >
                    <div className="flex-between">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div 
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: isSelected ? 'var(--accent-purple)' : 'var(--text-muted)'
                          }} 
                        />
                        <span style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{agent.name || 'Unnamed Agent'}</span>
                      </div>
                      
                      {agents.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAgent(agent.id);
                          }}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            padding: '4px',
                            borderRadius: '4px',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-rose)'}
                          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                      <span>Role: {agent.role || 'Contributor'}</span>
                      <span className="badge badge-blue">{LLM_MODELS.find(m => m.id === agent.model)?.name || agent.model}</span>
                    </div>

                    {agent.tools && agent.tools.length > 0 && (
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '10px' }}>
                        {agent.tools.map(toolId => (
                          <span 
                            key={toolId} 
                            style={{ 
                              fontSize: '9px', 
                              backgroundColor: 'rgba(255,255,255,0.05)', 
                              border: '1px solid var(--border-primary)', 
                              borderRadius: '4px', 
                              padding: '2px 6px',
                              color: 'var(--text-secondary)'
                            }}
                          >
                            {AVAILABLE_TOOLS.find(t => t.id === toolId)?.name || toolId}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </React.Fragment>
              );
            })}

            <button 
              className="btn btn-secondary"
              onClick={handleAddAgent}
              style={{ marginTop: '12px', padding: '8px 16px', fontSize: '13px' }}
            >
              <Plus size={14} />
              Add Agent Node
            </button>
          </div>

          <div style={{ fontSize: '11px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-primary)', paddingTop: '12px' }}>
            ℹ️ Agents execute down the pipeline. Arrange order by selecting and modifying fields on the right.
          </div>
        </div>

        {/* Right Column: Node Details Form Editor */}
        <div className="premium-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 600 }}>Configure Node Parameters</h2>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Modifying variables for: <strong>{currentAgent.name}</strong>
            </p>
          </div>

          {/* Form Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
            
            {/* Agent Name */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>AGENT NAME</label>
              <input 
                type="text"
                value={currentAgent.name}
                onChange={(e) => updateCurrentAgent('name', e.target.value)}
                className="input-field"
              />
            </div>

            {/* Agent Role */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>ROLE</label>
              <input 
                type="text"
                placeholder="e.g. SEO Auditor"
                value={currentAgent.role}
                onChange={(e) => updateCurrentAgent('role', e.target.value)}
                className="input-field"
              />
            </div>

            {/* LLM Model Core */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>LLM ENGINE CORE</label>
              <select 
                value={currentAgent.model}
                onChange={(e) => updateCurrentAgent('model', e.target.value)}
                className="input-field"
                style={{ appearance: 'none', background: 'var(--bg-primary) url("data:image/svg+xml;utf8,<svg fill=\'%23a1a1aa\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>") no-repeat right 12px center' }}
              >
                {LLM_MODELS.map(model => (
                  <option key={model.id} value={model.id}>{model.name}</option>
                ))}
              </select>
            </div>

            {/* Backstory */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>BACKSTORY</label>
              <textarea 
                rows={3}
                placeholder="Backstory, personality, guidelines..."
                value={currentAgent.backstory}
                onChange={(e) => updateCurrentAgent('backstory', e.target.value)}
                className="input-field"
                style={{ resize: 'vertical', minHeight: '60px', fontFamily: 'var(--font-sans)', fontSize: '13px' }}
              />
            </div>

            {/* Goal */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>GOAL</label>
              <textarea 
                rows={3}
                placeholder="The objective this agent aims to resolve..."
                value={currentAgent.goal}
                onChange={(e) => updateCurrentAgent('goal', e.target.value)}
                className="input-field"
                style={{ resize: 'vertical', minHeight: '60px', fontFamily: 'var(--font-sans)', fontSize: '13px' }}
              />
            </div>

            {/* Sandbox Tools Selection */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '8px' }}>AUTHORIZED TOOLS</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {AVAILABLE_TOOLS.map(tool => {
                  const hasTool = (currentAgent.tools || []).includes(tool.id);
                  return (
                    <div 
                      key={tool.id}
                      onClick={() => toggleToolForCurrentAgent(tool.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        backgroundColor: hasTool ? 'rgba(168, 85, 247, 0.04)' : 'rgba(0,0,0,0.2)',
                        border: '1px solid',
                        borderColor: hasTool ? 'var(--accent-purple)' : 'var(--border-primary)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'var(--transition-fast)',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 500, color: hasTool ? '#fff' : 'var(--text-secondary)' }}>{tool.name}</span>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{tool.description}</span>
                      </div>
                      <div 
                        style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '4px',
                          border: '1px solid',
                          borderColor: hasTool ? 'var(--accent-purple)' : 'var(--border-secondary)',
                          backgroundColor: hasTool ? 'var(--accent-purple)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'var(--transition-fast)'
                        }}
                      >
                        {hasTool && <Check size={10} color="#fff" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
