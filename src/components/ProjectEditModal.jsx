import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField,
  FormControl, InputLabel, Select, MenuItem, Button, IconButton, Box, Typography
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const ProjectEditModal = ({ open, handleClose, handleUpdateProject, handleEditInputChange, editingProject }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Edit Project</Typography>
          <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Project Name"
              fullWidth
              variant="outlined"
              value={editingProject?.name || ''}
              onChange={handleEditInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="client"
              label="Client"
              fullWidth
              variant="outlined"
              value={editingProject?.client || ''}
              onChange={handleEditInputChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="startDate"
              label="Start Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              value={editingProject ? editingProject.startDate : ''}
              onChange={handleEditInputChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="endDate"
              label="End Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              value={editingProject ? editingProject.endDate : ''}
              onChange={handleEditInputChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Project Type</InputLabel>
              <Select
                name="type"
                value={editingProject?.type || ''}
                onChange={handleEditInputChange}
                fullWidth
              >
                <MenuItem value="Client Project">Client Project</MenuItem>
                <MenuItem value="Internal Project">Internal Project</MenuItem>
              </Select>

            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={editingProject?.status || ''}
                onChange={handleEditInputChange}
                fullWidth
              >
                <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                <MenuItem value="COMPLETE">COMPLETE</MenuItem>
              </Select>

            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">Cancel</Button>
        <Button
          onClick={handleUpdateProject}
          variant="contained"
          color="primary"
          sx={{ bgcolor: '#5928E5', '&:hover': { bgcolor: '#4920B5' } }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectEditModal;
