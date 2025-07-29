import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

const AddTaskForm = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText, priority);
      setTaskText('');
      setPriority('medium');
      setIsExpanded(false);
    }
  };

  const priorityColors = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-green-100 text-green-800 border-green-200'
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-3">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          autoFocus
        />
        <button
          type="submit"
          disabled={!taskText.trim()}
          className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 font-medium"
        >
          <PlusIcon className="h-5 w-5" />
          Add
        </button>
      </div>
      
      {isExpanded && (
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="text-sm font-medium text-gray-700 self-center">Priority:</span>
          {Object.entries({ high: 'High', medium: 'Medium', low: 'Low' }).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setPriority(value)}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200 ${
                priority === value 
                  ? priorityColors[value]
                  : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </form>
  );
};

export default AddTaskForm;