import React from 'react';
import Task from './Task';

function TaskList({ tasks, onTaskDelete, onTaskDone }) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>Хватит заниматься прокрастинацией, займись делом!</p>
      ) : (
        tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            onDelete={onTaskDelete}
            onDone={onTaskDone}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;