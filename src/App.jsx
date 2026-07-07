import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import CreateTeam from './pages/CreateTeam';
import RunWorkflow from './pages/RunWorkflow';
import History from './pages/History';
import Settings from './pages/Settings';
import { MOCK_HISTORY } from './data/mockData';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // API Key Status state
  const [apiKeyStatus, setApiKeyStatus] = useState(() => {
    return !!localStorage.getItem('forge_key_gemini');
  });

  // Global State for Teams and Execution Runs
  const [savedTeams, setSavedTeams] = useState(() => {
    const local = localStorage.getItem('forge_saved_teams');
    return local ? JSON.parse(local) : [];
  });
  const [selectedTeamId, setSelectedTeamId] = useState('academic-researcher');
  const [historyList, setHistoryList] = useState(() => {
    const local = localStorage.getItem('forge_history_list');
    return local ? JSON.parse(local) : MOCK_HISTORY;
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('forge_saved_teams', JSON.stringify(savedTeams));
  }, [savedTeams]);

  useEffect(() => {
    localStorage.setItem('forge_history_list', JSON.stringify(historyList));
  }, [historyList]);

  const handleAddHistoryItem = (newItem) => {
    setHistoryList(prev => [newItem, ...prev]);
  };

  const renderActivePage = () => {
    switch (currentPage) {
      case 'landing':
        return <Landing setCurrentPage={setCurrentPage} />;
      case 'dashboard':
        return (
          <Dashboard 
            setCurrentPage={setCurrentPage} 
            setSelectedTeamId={setSelectedTeamId} 
            savedTeams={savedTeams}
          />
        );
      case 'create-team':
        return (
          <CreateTeam 
            setCurrentPage={setCurrentPage} 
            savedTeams={savedTeams} 
            setSavedTeams={setSavedTeams} 
          />
        );
      case 'run-workflow':
        return (
          <RunWorkflow 
            selectedTeamId={selectedTeamId} 
            setSelectedTeamId={setSelectedTeamId}
            savedTeams={savedTeams}
            onAddHistoryItem={handleAddHistoryItem}
          />
        );
      case 'history':
        return <History history={historyList} />;
      case 'settings':
        return <Settings apiKeyStatus={apiKeyStatus} setApiKeyStatus={setApiKeyStatus} />;
      default:
        return <Landing setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      
      {/* Navigation Sidebar */}
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed} 
      />

      {/* Main Workspace Frame */}
      <div 
        style={{ 
          flex: 1, 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          overflowY: 'auto',
          backgroundColor: 'var(--bg-primary)'
        }}
      >
        <Navbar 
          currentPage={currentPage} 
          apiKeyStatus={apiKeyStatus} 
          setCurrentPage={setCurrentPage} 
        />
        
        <main style={{ flex: 1 }}>
          {renderActivePage()}
        </main>
      </div>
    </div>
  );
}

export default App;
