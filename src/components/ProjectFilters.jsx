import React from 'react';
import {
  Box, TextField, InputAdornment, FormControl,
  InputLabel, Select, MenuItem, IconButton
} from '@mui/material';
import {
  Search as SearchIcon, FilterList as FilterListIcon,
  GetApp as DownloadIcon
} from '@mui/icons-material';

const ProjectFilters = ({
  searchTerm, setSearchTerm,
  typeFilter = 'none', setTypeFilter = () => {},
  statusFilter, setStatusFilter
}) => {

  return (
    <Box sx={{ display: 'flex', mb: 2, gap: 2 }}>
      <TextField
        placeholder="Name / Code"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ flex: 2, bgcolor: 'white', borderRadius: '4px' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="From"
        type="date"
        InputLabelProps={{ shrink: true }}
        size="small"
        sx={{ flex: 1, bgcolor: 'white', borderRadius: '4px' }}
      />

      <TextField
        label="To"
        type="date"
        InputLabelProps={{ shrink: true }}
        size="small"
        sx={{ flex: 1, bgcolor: 'white', borderRadius: '4px' }}
      />

      {typeFilter !== 'none' && (
        <FormControl sx={{ flex: 1 }} size="small">
          <InputLabel>Select Type</InputLabel>
          <Select
            value={typeFilter || ""}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Client Project">Client Project</MenuItem>
            <MenuItem value="Internal Project">Internal Project</MenuItem>
          </Select>
        </FormControl>
      )}

      <FormControl sx={{ flex: 1 }} size="small">
        <InputLabel>Select Status</InputLabel>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          label="Select Status"
          sx={{ bgcolor: 'white', borderRadius: '4px' }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="ACTIVE">Active</MenuItem>
          <MenuItem value="COMPLETE">Complete</MenuItem>
        </Select>
      </FormControl>

      <IconButton sx={{ bgcolor: '#5928E5', color: 'white', '&:hover': { bgcolor: '#4920B5' } }}>
        <FilterListIcon />
      </IconButton>

      <IconButton sx={{ bgcolor: '#5928E5', color: 'white', '&:hover': { bgcolor: '#4920B5' } }}>
        <DownloadIcon />
      </IconButton>
    </Box>
  );
};

export default ProjectFilters;
