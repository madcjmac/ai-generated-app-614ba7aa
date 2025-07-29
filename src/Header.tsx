import React from 'react';
import { CheckCircleIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Header = ({ 
  searchTerm, 
  setSearchTerm, 
  onClearCompleted, 
  onCompleteAll, 
  hasCompletedTasks, 
  hasActiveTasks 
}) => {
  return (
    <div className="mb-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Todo Master
        </h1>
        <p className="text-gray-600 text-lg">
          Organize your life, one task at a time
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          {hasActiveTasks && (
            <button
              onClick={onCompleteAll}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium"
            >
              <CheckCircleIcon className="h-4 w-4" />
              Complete All
            </button>
          )}
          
          {hasCompletedTasks && (
            <button
              onClick={onClearCompleted}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
            >
              <TrashIcon className="h-4 w-4" />
              Clear Completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;