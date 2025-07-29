import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import FilterTabs from './components/FilterTabs';
import TaskStats from './components/TaskStats';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Load tasks from localStorage on app start
  useEffect(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const addTask = (taskText, priority = 'medium') => {
    const newTask = {
      id: Date.now() + Math.random(),
      text: taskText.trim(),
      completed: false,
      priority: priority,
      createdAt: new Date().toISOString(),
      dueDate: null
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  // Toggle task completion
  const toggleTask = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId 
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  // Edit task
  const editTask = (taskId, newText, newPriority, newDueDate) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { 
              ...task, 
              text: newText.trim(),
              priority: newPriority,
              dueDate: newDueDate
            }
          : task
      )
    );
  };

  // Clear completed tasks
  const clearCompleted = () => {
    setTasks(prevTasks => prevTasks.filter(task => !task.completed));
  };

  // Mark all tasks as completed
  const completeAll = () => {
    setTasks(prevTasks =>
      prevTasks.map(task => ({ ...task, completed: true }))
    );
  };

  // Filter tasks based on current filter and search term
  const filteredTasks = tasks.filter(task => {
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'active' ? !task.completed :
      filter === 'completed' ? task.completed : true;
    
    const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Sort tasks: incomplete first, then by priority, then by creation date
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    active: tasks.filter(task => !task.completed).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onClearCompleted={clearCompleted}
          onCompleteAll={completeAll}
          hasCompletedTasks={taskStats.completed > 0}
          hasActiveTasks={taskStats.active > 0}
        />
        
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <AddTaskForm onAddTask={addTask} />
          </div>
          
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <FilterTabs 
                currentFilter={filter}
                onFilterChange={setFilter}
                taskStats={taskStats}
              />
              <TaskStats stats={taskStats} />
            </div>
            
            <TaskList
              tasks={sortedTasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              onEditTask={editTask}
              filter={filter}
              searchTerm={searchTerm}
            />
          </div>
        </div>
        
        {tasks.length === 0 && (
          <div className="text-center mt-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No tasks yet
            </h3>
            <p className="text-gray-500">
              Add your first task above to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;