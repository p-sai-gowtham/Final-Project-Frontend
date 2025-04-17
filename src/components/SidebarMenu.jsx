import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer, Box, Typography, Divider, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Collapse
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Business as BusinessIcon,
  Assessment as AssessmentIcon,
  Checklist as ChecklistIcon,
  FlightTakeoff as TravelIcon,
  AttachMoney as ExpensesIcon,
  AdminPanelSettings as AdminIcon,
  Person as PersonIcon,
  KeyboardArrowDown as ExpandMoreIcon,
  KeyboardArrowRight as ChevronRightIcon
} from '@mui/icons-material';
import LoginModal from '../auth/LoginModal';
import { useAuth } from '../auth/AuthContext';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const SidebarMenu = ({
  drawerWidth,
  openProjectManagement, setOpenProjectManagement,
  openProjects, setOpenProjects,
  openPerformanceEdge, setOpenPerformanceEdge,
  openApprovals, setOpenApprovals,
  openAdmin, setOpenAdmin, isMobile, mobileOpen, toggleDrawer
}) => {
  const { user, logout } = useAuth();
  const [openLogin, setOpenLogin] = useState(false);

  return (
  <>
    {isMobile && (
        <IconButton onClick={toggleDrawer} sx={{ position: 'absolute', top: 16, left: 16, zIndex: 2000 }}>
          <MenuIcon />
        </IconButton>
      )
    }
    <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
      sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid #E0E0E0',
            bgcolor: '#F5F5F7',
          },
        }}

    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333366' }}>
          JMAN GROUP
        </Typography>
      </Box>
      <Divider />
      <List sx={{ p: 1 }}>
        <ListItem disablePadding>
          <ListItemButton sx={{ borderRadius: 1 }}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => setOpenProjectManagement(!openProjectManagement)} sx={{ borderRadius: 1 }}>
            <ListItemIcon><BusinessIcon /></ListItemIcon>
            <ListItemText primary="Project Management" />
            {openProjectManagement ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openProjectManagement} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/projects"
                onClick={() => setOpenProjects(prev => !prev)}
                sx={{ borderRadius: 1 }}
              >
                <ListItemIcon><BusinessIcon /></ListItemIcon>
                <ListItemText primary="Projects" />
                {openProjects ? <ExpandMoreIcon /> : <ChevronRightIcon />}
              </ListItemButton>
            </ListItem>

            <Collapse in={openProjects} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  component={Link}
                  to="/projects/internal"
                  sx={{ pl: 4, borderRadius: 1 }}
                >
                  <ListItemText primary="Internal Projects" />
                </ListItemButton>
              </List>
            </Collapse>

            
            <ListItemButton sx={{ pl: 4, borderRadius: 1 }}>
              <ListItemText primary="Timesheet" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4, borderRadius: 1 }}>
              <ListItemText primary="Resourcing" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton onClick={() => setOpenPerformanceEdge(!openPerformanceEdge)} sx={{ borderRadius: 1 }}>
            <ListItemIcon><AssessmentIcon /></ListItemIcon>
            <ListItemText primary="Performance Edge" />
            {openPerformanceEdge ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openPerformanceEdge} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4, borderRadius: 1 }}>
              <ListItemText primary="Forms" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4, borderRadius: 1 }}>
              <ListItemText primary="Admin Survey" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4, borderRadius: 1 }}>
              <ListItemText primary="KRA-KPI Forms" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4, borderRadius: 1 }}>
              <ListItemText primary="Survey" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton onClick={() => setOpenApprovals(!openApprovals)} sx={{ borderRadius: 1 }}>
            <ListItemIcon><ChecklistIcon /></ListItemIcon>
            <ListItemText primary="Approvals" />
            {openApprovals ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openApprovals} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4, borderRadius: 1 }}>
              <ListItemText primary="Travel Approval" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4, borderRadius: 1 }}>
              <ListItemText primary="Timesheet Approval" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4, borderRadius: 1 }}>
              <ListItemText primary="Expenses Approval" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4, borderRadius: 1 }}>
              <ListItemText primary="Pay Expenses" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4, borderRadius: 1 }}>
              <ListItemText primary="KRA Review" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton sx={{ borderRadius: 1 }}>
            <ListItemIcon><TravelIcon /></ListItemIcon>
            <ListItemText primary="Travel" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton sx={{ borderRadius: 1 }}>
            <ListItemIcon><ExpensesIcon /></ListItemIcon>
            <ListItemText primary="Expenses" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => setOpenAdmin(!openAdmin)} sx={{ borderRadius: 1 }}>
            <ListItemIcon><AdminIcon /></ListItemIcon>
            <ListItemText primary="Admin" />
            {openAdmin ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </ListItemButton>
        </ListItem>
      </List>

      <Box sx={{ mt: 'auto', p: 2 }}>
        <ListItem disablePadding>
          <ListItemButton sx={{ borderRadius: 1 }}>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText
              primary={user ? user.username : 'Guest'}
              secondary={user ? (
                <span onClick={logout} style={{ cursor: 'pointer', color: 'red' }}>Logout</span>
              ) : (
                <span onClick={() => setOpenLogin(true)} style={{ cursor: 'pointer', color: 'blue' }}>Login</span>
              )}
              primaryTypographyProps={{ fontWeight: 'bold', variant: 'body2' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </ListItemButton>
        </ListItem>
            
        <LoginModal open={openLogin} handleClose={() => setOpenLogin(false)} />
      </Box>
      </Drawer>
    </>
  );
};

export default SidebarMenu;