import React, { useState } from 'react';
import { Plus, Trash2, Cpu, Wrench, Shield, Check, Info, ArrowDown } from 'lucide-react';
import { LLM_MODELS, AVAILABLE_TOOLS } from '../data/mockData';

const CREW_TEMPLATES = [
  {
    id: 'startup',
    name: 'Startup Crew',
    icon: '🚀',
    description: 'Ideate, design, and validate startup MVPs.',
    teamName: 'Startup Launch Crew',
    teamDescription: 'Coordinating PM, Tech Architect, and Growth Hacker to launch an MVP.',
    routingType: 'sequential',
    agents: [
      {
        id: 'agent-startup-1',
        name: 'Product Manager',
        role: 'Product Lead',
        goal: 'Define MVP scope, feature roadmap, and user stories.',
        backstory: 'Ex-FAANG Lead PM who designs lean, scalable software solutions.',
        model: 'gemini-2-5-flash',
        tools: ['web_search']
      },
      {
        id: 'agent-startup-2',
        name: 'Tech Architect',
        role: 'System Designer',
        goal: 'Design microservices architecture, database schemas, and stack choices.',
        backstory: 'Veteran system designer obsessed with performance, scalability, and clean code.',
        model: 'gemini-2-5-flash',
        tools: ['code_interpreter']
      },
      {
        id: 'agent-startup-3',
        name: 'GTM Marketer',
        role: 'Growth Hacker',
        goal: 'Create a launching campaign, identify key channels, and structure marketing funnels.',
        backstory: 'Creative marketer who has scaled multiple SaaS startups to $1M ARR.',
        model: 'gemini-2-5-flash',
        tools: ['web_search']
      }
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing Crew',
    icon: '📈',
    description: 'Optimize keyword SEO, write landing copy, edit copy.',
    teamName: 'SaaS Marketing Squad',
    teamDescription: 'Keyword strategist, copywriter, and editor collaborating on high-converting copy.',
    routingType: 'sequential',
    agents: [
      {
        id: 'agent-marketing-1',
        name: 'SEO Specialist',
        role: 'Keyword Optimizer',
        goal: 'Perform keyword research and output SEO optimized content outlines.',
        backstory: 'An SEO veteran specializing in search algorithms, competitor analysis, and search intent.',
        model: 'gemini-2-5-flash',
        tools: ['web_search']
      },
      {
        id: 'agent-marketing-2',
        name: 'Copywriter',
        role: 'Creative Writer',
        goal: 'Draft engaging landing page copy and social posts containing selected keywords.',
        backstory: 'Direct-response copywriter who knows how to captivate audiences and drive conversions.',
        model: 'gemini-2-5-flash',
        tools: []
      },
      {
        id: 'agent-marketing-3',
        name: 'Editor',
        role: 'Content Auditor',
        goal: 'Review and refine draft copies for tone consistency, readability, and grammar.',
        backstory: 'A meticulous proofreader and editor with an eye for detail and styling.',
        model: 'gemini-2-5-flash',
        tools: []
      }
    ]
  },
  {
    id: 'study',
    name: 'Study Crew',
    icon: '📚',
    description: 'Explain topics and generate interactive quizzes.',
    teamName: 'Personal Study Group',
    teamDescription: 'Tutor and assessment agent working together to explain topics and test knowledge.',
    routingType: 'sequential',
    agents: [
      {
        id: 'agent-study-1',
        name: 'Tutor Agent',
        role: 'SME Educator',
        goal: 'Break down dense textbooks and complex concepts into clear, simple analogies.',
        backstory: 'An encouraging and highly pedagogical professor who loves teaching complex subjects.',
        model: 'gemini-2-5-flash',
        tools: ['file_reader']
      },
      {
        id: 'agent-study-2',
        name: 'Quiz Creator',
        role: 'Assessor',
        goal: 'Design flashcards and interactive multiple-choice questions to test understanding.',
        backstory: 'Assessment specialist focused on active recall and spaced repetition principles.',
        model: 'gemini-2-5-flash',
        tools: ['code_interpreter']
      }
    ]
  },
  {
    id: 'content',
    name: 'Content Crew',
    icon: '✍️',
    description: 'Creative direction, script writing, manager.',
    teamName: 'Social Content Studio',
    teamDescription: 'Director, writer, and manager repurposing long-form content across social media.',
    routingType: 'supervisor',
    agents: [
      {
        id: 'agent-content-1',
        name: 'Content Director',
        role: 'Creative Director',
        goal: 'Outline monthly content calendars, define content hooks, and supervise production.',
        backstory: 'A viral creator with over 1M followers who knows exactly what gets clicked and shared.',
        model: 'gemini-2-5-flash',
        tools: ['web_search']
      },
      {
        id: 'agent-content-2',
        name: 'Script Writer',
        role: 'Video Copywriter',
        goal: 'Write retention-optimized video scripts for YouTube, TikTok, or Reels.',
        backstory: 'Ex-Hollywood script writer specialized in holding viewer retention and storytelling.',
        model: 'gemini-2-5-flash',
        tools: []
      },
      {
        id: 'agent-content-3',
        name: 'Distributor Agent',
        role: 'Social Media Manager',
        goal: 'Repurpose long-form scripts into tweets, threads, and LinkedIn posts.',
        backstory: 'Social native who drafts concise, punchy posts optimized for social algorithms.',
        model: 'gemini-2-5-flash',
        tools: []
      }
    ]
  },
  {
    id: 'research',
    name: 'Research Crew',
    icon: '🔬',
    description: 'Aggregate, scrape literature and draft reports.',
    teamName: 'Scientific Literature Reviewers',
    teamDescription: 'Orchestrating literature harvesting and report writing for deep analysis.',
    routingType: 'supervisor',
    agents: [
      {
        id: 'agent-research-1',
        name: 'Research Supervisor',
        role: 'Orchestrator',
        goal: 'Plan literature research phases, verify source quality, and orchestrate workers.',
        backstory: 'A senior principal investigator with an h-index of 50 and rigorous standards.',
        model: 'gemini-2-5-flash',
        tools: []
      },
      {
        id: 'agent-research-2',
        name: 'Literature Harvester',
        role: 'Data Scraping Specialist',
        goal: 'Extract key figures, methodologies, and outcomes from scientific databases.',
        backstory: 'An automated data extraction expert with zero tolerance for hallucinations.',
        model: 'gemini-2-5-flash',
        tools: ['web_search', 'web_scraper', 'file_reader']
      },
      {
        id: 'agent-research-3',
        name: 'Synthesis Writer',
        role: 'Technical Synthesizer',
        goal: 'Produce comprehensive peer-review quality reports compiling all research findings.',
        backstory: 'A scientific communicator skilled at connecting disparate research points beautifully.',
        model: 'gemini-2-5-flash',
        tools: []
      }
    ]
  }
];

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
      model: 'gemini-2-5-flash',
      tools: []
    },
    {
      id: 'agent-2',
      name: 'Researcher Agent',
      role: 'Data Miner',
      goal: 'Gather sources and query key parameters.',
      backstory: 'A detail-oriented analyst prioritizing raw statistics.',
      model: 'gemini-2-5-flash',
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
      model: 'gemini-2-5-flash',
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
      {/* Choose a Crew Template Section */}
      <div className="premium-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600 }}>Choose a Crew Template</h2>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
            Quick-start by choosing a predefined template. This will automatically populate the crew builder.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
          {CREW_TEMPLATES.map((tpl) => (
            <div
              key={tpl.id}
              onClick={() => {
                setTeamName(tpl.teamName);
                setTeamDescription(tpl.teamDescription);
                setRoutingType(tpl.routingType);
                setAgents(tpl.agents);
                setSelectedAgentId(tpl.agents[0].id);
              }}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                borderRadius: '10px',
                padding: '16px',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-purple)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--glow-shadow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-primary)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '24px' }}>{tpl.icon}</div>
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{tpl.name}</h3>
                <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px', lineHeight: '1.4' }}>
                  {tpl.description}
                </p>
              </div>
              <span className="badge badge-purple" style={{ alignSelf: 'flex-start', fontSize: '9px', marginTop: 'auto' }}>
                {tpl.agents.length} Agents
              </span>
            </div>
          ))}
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
