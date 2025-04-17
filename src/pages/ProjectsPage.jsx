import React, { useState, useEffect } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import ProjectFilters from '../components/ProjectFilters';
import ProjectActions from '../components/ProjectActions';
import ProjectTable from '../components/ProjectTable';
import ProjectAddModal from '../components/ProjectAddModal';
import ProjectEditModal from '../components/ProjectEditModal';
import { fetchProjects, addProject, editProject } from '../api';

const ProjectsPage = () => {
  const [page, setPage] = useState(0); 
  const [pageSize, setPageSize] = useState(10);
  const [rows, setRows] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const [openAddModal, setOpenAddModal] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', client: '', startDate: '', endDate: '', type: 'Client Project', status: 'ACTIVE' });
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [typeFilter, setTypeFilter] = useState("");
const [statusFilter, setStatusFilter] = useState("");
const [searchTerm, setSearchTerm] = useState("");

  // it will lodes onlu the internal projects adding to that it will change the rows with respective to the the amount of rows per page, page number, the order of the which it needs to show and filter the data according to the term and status of the project
  
  const loadProjects = React.useCallback(() => {
  const offset = page * pageSize;
  fetchProjects(pageSize, offset, sortField, sortOrder, searchTerm, typeFilter, statusFilter) 
    .then((res) => {
      const mappedProjects = res.data.results.map(project => ({
        ...project,
        startDate: project.start_date,
        endDate: project.end_date,
      }));
      setRows(mappedProjects);
      setRowCount(res.data.count);
    })
    .catch(() => setErrorMessage('Failed to fetch projects.'));
}, [page, pageSize, sortField, sortOrder, searchTerm, typeFilter, statusFilter]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  // sorts the selected column
  const handleSortChange = (sortModel) => {
    if (sortModel.length > 0) {
      setSortField(sortModel[0].field);
      setSortOrder(sortModel[0].sort);
    } else {
      setSortField('');
      setSortOrder('');
    }
  };

  // creats a new project
  const handleAddProject = () => {
    const tempId = Date.now();
    const optimisticProject = { id: tempId, ...newProject };
    const previousRows = [...rows];

    setRows((prev) => [...prev, optimisticProject]);
    setOpenAddModal(false);

    addProject({
      name: newProject.name,
      client: newProject.client,
      start_date: newProject.startDate,
      end_date: newProject.endDate,
      type: newProject.type,
      status: newProject.status
    })
      .then((res) => {
        setRows((prev) => prev.map((row) => (row.id === tempId ? { ...res.data } : row)));
      })
      .catch(() => {
        setRows(previousRows);
        setErrorMessage('Failed to add project.');
      });

    setNewProject({ name: '', client: '', startDate: '', endDate: '', type: 'Client Project', status: 'ACTIVE' });
  };

  // edit the project
  const handleEditProject = (project) => {
    setEditingProject({
      ...project,
      startDate: project.startDate || project.start_date,
      endDate: project.endDate || project.end_date,
    });
    setOpenEditModal(true);
  };

  const handleEditInputChange = (e) => setEditingProject(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleUpdateProject = () => {
    const previousRows = [...rows];

    setRows(rows.map(row => row.id === editingProject.id ? editingProject : row));
    setOpenEditModal(false);

    editProject(editingProject.id, editingProject)
      .catch(() => {
        setRows(previousRows);
        setErrorMessage('Failed to update project.');
      });

    setEditingProject(null);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f7' }}>
        <ProjectActions setOpenAddModal={setOpenAddModal} />
        <ProjectFilters
          setTypeFilter={setTypeFilter}
          setStatusFilter={setStatusFilter}
          setSearchTerm={setSearchTerm}
          typeFilter={typeFilter}
          statusFilter={statusFilter}
          searchTerm={searchTerm}

        />
        <ProjectTable
          rows={rows}
          columns={[
            { field: 'name', headerName: 'Project Name', flex: 2 },
            { field: 'client', headerName: 'Client', flex: 1 },
            { field: 'startDate', headerName: 'Start Date', flex: 1 },
            { field: 'endDate', headerName: 'End Date', flex: 1 },
            { field: 'type', headerName: 'Type', flex: 1 },
            {
              field: 'status', headerName: 'Status', flex: 1,
              renderCell: (params) => (
                <span style={{ color: params.value === 'ACTIVE' ? 'green' : 'inherit', fontWeight: params.value === 'ACTIVE' ? 'bold' : 'normal' }}>{params.value}</span>
              )
            },
            { field: 'action', headerName: 'Action', flex: 0.5, sortable: false }
          ]}
          pageSize={pageSize}
          setPageSize={setPageSize}
          page={page}
          setPage={setPage}
          rowCount={rowCount}
          handleEditProject={handleEditProject}
          handleSortChange={handleSortChange}
        />
      </Box>

      <ProjectAddModal
        open={openAddModal}
        handleClose={() => setOpenAddModal(false)}
        handleAddProject={handleAddProject}
        handleInputChange={(e) => setNewProject(prev => ({ ...prev, [e.target.name]: e.target.value }))}
        newProject={newProject}
      />

      <ProjectEditModal
        open={openEditModal}
        handleClose={() => setOpenEditModal(false)}
        handleUpdateProject={handleUpdateProject}
        handleEditInputChange={handleEditInputChange}
        editingProject={editingProject}
      />

      <Snackbar open={!!errorMessage} autoHideDuration={3000} onClose={() => setErrorMessage('')}>
        <Alert severity="error" onClose={() => setErrorMessage('')}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProjectsPage;
