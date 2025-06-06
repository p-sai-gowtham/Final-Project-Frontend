import axios from 'axios';
import { getToken } from './auth/auth';

// setting the base usrl
const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// if token is present then adding it to every request
API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// fetch the projects according to the parameters 
export const fetchProjects = (limit, offset, sortField, sortOrder, searchTerm, typeFilter, statusFilter) => {
  const params = {
    limit,
    offset,
  };

  if (sortField && sortOrder) {
    params.ordering = sortOrder === 'asc' ? sortField : `-${sortField}`;
  }

  if (searchTerm) {
    params.search = searchTerm;
  }
  if (typeFilter) {
    params.type = typeFilter;
  }
  if (statusFilter) {
    params.status = statusFilter;
  }

  return API.get('/projects/', { params });
};


export const addProject = (project) => API.post('/projects/', project);
export const editProject = (projectId, project) => API.put(`/projects/${projectId}/`, project);
