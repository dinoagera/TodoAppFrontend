import React, { useState } from 'react';
import { createTask } from '../api/api';

function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(title, description);
      setTitle('');
      setDescription('');
      setError('');
      if (typeof onTaskCreated === 'function') {
        onTaskCreated(); 
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3>Добавить новую задачу</h3>
      {error && <p className="error">{error}</p>}
      <div className="form-group">
        <input
          type="text"
          placeholder="Название задачи"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Описание задачи (опциональное)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit" className="btn">Добавить</button>
    </form>
  );
}

export default TaskForm;