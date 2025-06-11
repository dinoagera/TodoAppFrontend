import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { getAllTasks, deleteTask, doneTask } from '../api/api';

function Tasks({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const data = await getAllTasks();
      setTasks(data.tasks || []);
    } catch (err) {
      setError(err.message);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []); 

  const handleTaskDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      await fetchTasks(); 
    } catch (err) {
      setError(err.message);
    }
  };

  const handleTaskDone = async (taskId) => {
    try {
      await doneTask(taskId);
      await fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    navigate('/login');
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className="tasks-container">
      <div className="header">
        <h1>Твои задачи</h1>
        <button onClick={handleLogout} className="btn logout-btn">
          Выйти
        </button>
      </div>
      <TaskForm onTaskCreated={fetchTasks} />
      <TaskList 
        tasks={tasks} 
        onTaskDelete={handleTaskDelete}
        onTaskDone={handleTaskDone}
      />
    </div>
  );
}

export default Tasks;