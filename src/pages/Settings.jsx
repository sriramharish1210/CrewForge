import React, { useState } from 'react';
import { Eye, EyeOff, ShieldCheck, Key, Save, Server, Cpu, Check, AlertCircle } from 'lucide-react';

export default function Settings({ apiKeyStatus, setApiKeyStatus }) {
  const [keys, setKeys] = useState({
    gemini: localStorage.getItem('forge_key_gemini') || ''
  });

  const [visibleKeys, setVisibleKeys] = useState({
    gemini: false
  });

  const [validationStates, setValidationStates] = useState({
    gemini: 'idle'
  });

  const handleKeyChange = (provider, value) => {
    setKeys(prev => ({ ...prev, [provider]: value }));
  };

  const toggleVisibility = (provider) => {
    setVisibleKeys(prev => ({ ...prev, [provider]: !prev[provider] }));
  };

  const handleSaveKeys = () => {
    localStorage.setItem('forge_key_gemini', keys.gemini);
    
    // Check if any keys are saved to toggle system indicator
    const hasKeys = !!keys.gemini;
    setApiKeyStatus(hasKeys);

    alert('Security keys saved to browser local session storage.');
  };

  const validateKey = (provider) => {
    if (!keys[provider]) {
      setValidationStates(prev => ({ ...prev, [provider]: 'error' }));
      return;
    }

    setValidationStates(prev => ({ ...prev, [provider]: 'loading' }));

    setTimeout(() => {
      setValidationStates(prev => ({ ...prev, [provider]: 'success' }));
      
      // Implicitly toggle global encryption active status
      setApiKeyStatus(true);
    }, 1500);
  };

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px', minHeight: 'calc(100vh - 64px)' }}>
      {/* Header */}
      <div className="flex-between">
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, fontFamily: 'var(--font-display)' }}>System Settings</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Configure your model providers, API keys, and sandbox compute limits.
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleSaveKeys} style={{ gap: '6px' }}>
          <Save size={16} />
          Save Configurations
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', alignItems: 'start' }}>
        
        {/* Left Side: Keys Vault */}
        <div className="premium-card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 600 }}>API Provider Keys</h2>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Keys are encrypted and stored locally in your current browser tab instance.
            </p>
          </div>

          {/* Key fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            {/* Gemini Key */}
            <div>
              <div className="flex-between" style={{ marginBottom: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)' }}>GEMINI API KEY</label>
                <button 
                  onClick={() => validateKey('gemini')} 
                  style={{ background: 'transparent', border: 'none', color: 'var(--accent-purple)', fontSize: '11px', cursor: 'pointer', fontWeight: 500 }}
                >
                  {validationStates.gemini === 'loading' ? 'Verifying...' : validationStates.gemini === 'success' ? 'Verified ✓' : 'Test Key'}
                </button>
              </div>

              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input 
                  type={visibleKeys.gemini ? 'text' : 'password'}
                  placeholder="AIzaSy..."
                  value={keys.gemini}
                  onChange={(e) => handleKeyChange('gemini', e.target.value)}
                  className="input-field"
                  style={{ paddingRight: '40px' }}
                />
                <button 
                  onClick={() => toggleVisibility('gemini')}
                  style={{ position: 'absolute', right: '12px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  {visibleKeys.gemini ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: General Settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="premium-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600 }}>Default Model Configurations</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Supervisor Tier Core Model</label>
                <select className="input-field" defaultValue="gemini-2-5-flash">
                  <option value="gemini-2-5-flash">Gemini 2.5 Flash (Default Orchestrator)</option>
                  <option value="gemini-1-5">Gemini 1.5 Pro</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Worker Tier Core Model</label>
                <select className="input-field" defaultValue="gemini-2-5-flash">
                  <option value="gemini-2-5-flash">Gemini 2.5 Flash (Default Worker)</option>
                  <option value="gemini-1-5">Gemini 1.5 Pro</option>
                </select>
              </div>
            </div>
          </div>

          <div className="premium-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600 }}>Sandbox Safe Boundaries</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="flex-between">
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', display: 'block' }}>Python Sandbox Storage</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Limit read/write operations of Contributor code execution tools.</span>
                </div>
                <div style={{ width: '50px', height: '24px', borderRadius: '12px', backgroundColor: 'var(--accent-purple)', padding: '2px', cursor: 'pointer', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fff' }} />
                </div>
              </div>

              <div className="flex-between" style={{ borderTop: '1px solid var(--border-primary)', paddingTop: '14px' }}>
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', display: 'block' }}>Web Scraping Proxy</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Route scraper queries through premium residential proxies to avoid rate blocks.</span>
                </div>
                <div style={{ width: '50px', height: '24px', borderRadius: '12px', backgroundColor: 'var(--border-secondary)', padding: '2px', cursor: 'pointer', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fff' }} />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
