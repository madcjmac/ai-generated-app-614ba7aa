import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleTask, onDeleteTask, onEditTask, filter, searchTerm }) => {
  if (tasks.length === 0) {
    const getEmptyMessage = () => {
      if (searchTerm) {
        return {
          emoji: '🔍',
          title: 'No matching tasks',
          description: `No tasks found for "${searchTerm}"`
        };
      }
      
      switch (filter) {
        case 'active':
          return {
            emoji: '🎉',
            title: 'All caught up!',
            description: 'No active tasks remaining'
          };
        case 'completed':
          return {
            emoji: '📋',
            title: 'No completed tasks',
            description: 'Complete some tasks to see them here'
          };
        default:
          return {
            emoji: '🚀',
            title: 'Ready to be productive?',
            description: 'Add your first task to get started'
          };
      }
    };

    const { emoji, title, description } = getEmptyMessage();

    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">{emoji}</div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggleTask(task.id)}
          onDelete={() => onDeleteTask(task.id)}
          onEdit={onEditTask}
          index={index}
        />
      ))}
    </div>
  );
};

export default TaskList;