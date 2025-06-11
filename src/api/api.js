const API_URL = 'http://localhost:8083'; 
export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }
  
  return await response.json();
};

export const register = async (email, password) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Registration failed');
  }
  
  return await response.json();
};

export const getAllTasks = async () => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_URL}/getalltasks`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.reload();
    }
    throw new Error('Failed to fetch tasks');
  }
  
  return await response.json();
};
export const deleteTask = async (taskId) => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_URL}/deletetask`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: taskId }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
  
  return await response.json();
};
export const doneTask = async (taskId) => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_URL}/donetask`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: taskId }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to mark task as done');
  }
  
  return await response.json();
};
export const createTask = async (title, description) => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_URL}/createtask`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create task');
  }
  
  return await response.json();
};