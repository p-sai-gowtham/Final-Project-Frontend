import React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const ProjectActions = ({ setOpenAddModal }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
    <Button
      variant="contained"
      startIcon={<AddIcon />}
      sx={{
        bgcolor: '#5928E5',
        '&:hover': { bgcolor: '#4920B5' },
        borderRadius: '8px',
        textTransform: 'none'
      }}
    >
      Show My Projects
    </Button>
    <IconButton
      sx={{ ml: 1, bgcolor: '#5928E5', color: 'white', '&:hover': { bgcolor: '#4920B5' } }}
      onClick={() => setOpenAddModal(true)}
    >
      <AddIcon />
    </IconButton>
  </Box>
);

export default ProjectActions;
