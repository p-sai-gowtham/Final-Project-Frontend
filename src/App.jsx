import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SidebarMenu from './components/SidebarMenu';
import ProjectsPage from './pages/ProjectsPage'; 
import InternalProjectsPage from './pages/InternalProjectsPage';
import ProtectedRoute from './auth/ProtectedRoute';
import { AuthProvider } from './auth/AuthContext';

const App = () => {
  const drawerWidth = 240;
  const [openProjectManagement, setOpenProjectManagement] = useState(true);
  const [openProjects, setOpenProjects] = useState(false);
  const [openPerformanceEdge, setOpenPerformanceEdge] = useState(false);
  const [openApprovals, setOpenApprovals] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
  return (
    
  <AuthProvider>
    <Router>
      <div style={{ display: 'flex' }}>
        <SidebarMenu
        drawerWidth={drawerWidth}
        openProjectManagement={openProjectManagement}
        setOpenProjectManagement={setOpenProjectManagement}
        openProjects={openProjects}
        setOpenProjects={setOpenProjects}
        openPerformanceEdge={openPerformanceEdge}
        setOpenPerformanceEdge={setOpenPerformanceEdge}
        openApprovals={openApprovals}
        setOpenApprovals={setOpenApprovals}
        openAdmin={openAdmin}
        setOpenAdmin={setOpenAdmin}
      />
        <div style={{ flexGrow: 1, padding: 24, background: '#f5f5f7', height: '100vh' }}>
          <Routes>
            <Route
              path="/projects"
              element={
                <ProtectedRoute>
                  <ProjectsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects/internal"
              element={
                <ProtectedRoute>
                  <InternalProjectsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
      </Router>
  </AuthProvider>
  );
};

export default App;
