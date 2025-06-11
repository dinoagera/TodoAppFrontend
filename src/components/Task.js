import React from 'react';

function Task({ task, onDelete, onDone }) {
  return (
    <div className={`task ${task.done ? 'done' : ''}`}>
      <div className="task-content">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        <div className="task-meta">
          {/* <span>ID: {task.id}</span> */}
          <span>Статус задачи: {task.done ? 'Сделано' : 'В процессе...'}</span>
        </div>
      </div>
      <div className="task-actions">
        {!task.done && (
          <button 
            onClick={() => onDone(task.id)} 
            className="btn done-btn"
          >
            Задача готова
          </button>
        )}
        <button 
          onClick={() => onDelete(task.id)} 
          className="btn delete-btn"
        >
          Удалить
        </button>
      </div>
    </div>
  );
}

export default Task;