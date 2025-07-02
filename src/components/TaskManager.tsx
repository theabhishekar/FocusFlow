import React, { useState } from 'react';
import { Plus, Check, Trash2, Clock, Crown } from 'lucide-react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  pomodoroCount: number;
}

type UserType = 'guest' | 'free' | 'premium';

interface TaskManagerProps {
  tasks: Task[];
  onTaskComplete: (taskId: number) => void;
  onTaskDelete: (taskId: number) => void;
  onTaskAdd: (text: string) => void;
  userType: UserType;
}

export function TaskManager({ tasks, onTaskComplete, onTaskDelete, onTaskAdd, userType }: TaskManagerProps) {
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      // Free users limited to 10 tasks
      if (userType === 'free' && tasks.length >= 10) {
        alert('Free users are limited to 10 tasks. Upgrade to Premium for unlimited tasks!');
        return;
      }
      onTaskAdd(newTask.trim());
      setNewTask('');
    }
  };

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-6 lg:mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-coral-600 to-orange-600 bg-clip-text text-transparent mb-2">
          Task Manager
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600">Organize your work and track your progress</p>
        {userType === 'free' && (
          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-amber-600">
            <Crown size={16} />
            <span>Free: {tasks.length}/10 tasks used</span>
          </div>
        )}
      </div>

      {/* Add Task Form */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg border border-white/20 mb-6 lg:mb-8">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What would you like to work on?"
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent bg-white/90 text-sm sm:text-base"
          />
          <button
            type="submit"
            disabled={userType === 'free' && tasks.length >= 10}
            className={`px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base min-w-[140px] ${
              userType === 'free' && tasks.length >= 10
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-gradient-to-r from-coral-500 to-orange-500 text-white hover:shadow-xl'
            }`}
          >
            <Plus size={18} />
            <span>Add Task</span>
          </button>
        </form>
      </div>

      {/* Task Lists */}
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Pending Tasks */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <Clock size={20} className="text-coral-500" />
            <span>Pending ({pendingTasks.length})</span>
          </h3>
          
          <div className="space-y-3">
            {pendingTasks.map(task => (
              <div
                key={task.id}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onTaskComplete(task.id)}
                    className="w-6 h-6 rounded-full border-2 border-coral-400 hover:border-coral-500 transition-colors duration-300 flex items-center justify-center hover:bg-coral-50 flex-shrink-0"
                  >
                    {task.completed && <Check size={16} className="text-coral-500" />}
                  </button>
                  
                  <span className="text-gray-800 font-medium text-sm sm:text-base flex-1 min-w-0 break-words">
                    {task.text}
                  </span>
                  
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="bg-coral-100 text-coral-700 px-2 py-1 rounded-lg text-xs sm:text-sm font-medium">
                      {task.pomodoroCount} 🍅
                    </div>
                    <button
                      onClick={() => onTaskDelete(task.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {pendingTasks.length === 0 && (
              <div className="text-center py-8 lg:py-12 text-gray-500">
                <Clock size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-sm sm:text-base">No pending tasks. Add one above!</p>
              </div>
            )}
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <Check size={20} className="text-emerald-500" />
            <span>Completed ({completedTasks.length})</span>
          </h3>
          
          <div className="space-y-3">
            {completedTasks.map(task => (
              <div
                key={task.id}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 opacity-80"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onTaskComplete(task.id)}
                    className="w-6 h-6 rounded-full bg-emerald-500 border-2 border-emerald-500 transition-colors duration-300 flex items-center justify-center flex-shrink-0"
                  >
                    <Check size={16} className="text-white" />
                  </button>
                  
                  <span className="text-gray-600 font-medium line-through text-sm sm:text-base flex-1 min-w-0 break-words">
                    {task.text}
                  </span>
                  
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg text-xs sm:text-sm font-medium">
                      {task.pomodoroCount} 🍅
                    </div>
                    <button
                      onClick={() => onTaskDelete(task.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {completedTasks.length === 0 && (
              <div className="text-center py-8 lg:py-12 text-gray-500">
                <Check size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-sm sm:text-base">No completed tasks yet. Keep going!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}