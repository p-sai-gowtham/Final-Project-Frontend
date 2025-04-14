import React from 'react';
import { Paper, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Edit as EditIcon } from '@mui/icons-material';

const ProjectTable = ({ rows, columns, pageSize, setPageSize, page, setPage, rowCount, handleEditProject, handleSortChange }) => {
  const customColumns = columns.map(col =>
    col.field === 'action'
      ? {
          ...col,
          renderCell: (params) => (
            <IconButton size="small" color="primary" onClick={() => handleEditProject(params.row)}>
              <EditIcon />
            </IconButton>
          )
        }
      : col
  );

  return (
    <Paper sx={{ height: 'calc(100vh - 200px)', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={customColumns}
        pagination
        paginationMode="server"
        rowCount={rowCount}
        pageSizeOptions={[5, 10, 20, 50]}
        paginationModel={{ pageSize: pageSize, page: page }}
        onPaginationModelChange={(newModel) => {
          setPage(newModel.page);
          setPageSize(newModel.pageSize);
        }}
        sortingMode="server"
        onSortModelChange={(sortModel) => {
          handleSortChange(sortModel);   // ✅ call parent to update sorting state
        }}
        disableSelectionOnClick
        disableColumnMenu
        sx={{
          '& .MuiDataGrid-columnHeaders': { backgroundColor: 'white', borderBottom: '1px solid #E0E0E0' },
          '& .MuiDataGrid-cell': { borderBottom: '1px solid #E0E0E0' },
          '& .MuiDataGrid-row:hover': { backgroundColor: '#F5F5F5' },
          border: 'none',
        }}
      />
    </Paper>
  );
};


export default ProjectTable;
