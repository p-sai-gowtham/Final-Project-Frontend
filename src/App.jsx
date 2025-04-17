import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SidebarMenu from './components/SidebarMenu';
import ProjectsPage from './pages/ProjectsPage'; 
import InternalProjectsPage from './pages/InternalProjectsPage';
import ProtectedRoute from './auth/ProtectedRoute';
import { AuthProvider } from './auth/AuthContext';
import useWindowSize from './hooks/useWindowSize';
import { Box } from '@mui/material';

const App = () => {
  const drawerWidth = 240;
  const [openProjectManagement, setOpenProjectManagement] = useState(true);
  const [openProjects, setOpenProjects] = useState(false);
  const [openPerformanceEdge, setOpenPerformanceEdge] = useState(false);
  const [openApprovals, setOpenApprovals] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
  const windowSize = useWindowSize();
  const isMobile = windowSize.width <= 768;

  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

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
        mobileOpen={mobileOpen}
        toggleDrawer={toggleDrawer}
        isMobile={isMobile}
      />
        <Box
          sx={{
            flexGrow: 1,
            p: 2,
            background: '#f5f5f7',
            height: '100vh',
            overflow: 'auto',
          }}
        >
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
        </Box>
      </div>
      </Router>
  </AuthProvider>
  );
};

export default App;



