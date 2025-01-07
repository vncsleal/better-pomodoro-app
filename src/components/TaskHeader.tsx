// components/TaskHeader.tsx
import React from 'react';
import { Calendar, Flag, CheckSquare } from 'lucide-react';

interface TaskHeaderProps {
  task: {
    Name: string;
    DueDate?: string;
    Priority?: string;
    Status?: string;
  };
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ task }) => {
  const getPriorityColor = (priority?: string) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-blue-500';
      default: return 'text-zinc-500';
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-100 dark:border-zinc-800">
      <div className="p-6">

        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">{task.Name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900/80 transition-colors">
            <Calendar className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
            <div className="flex flex-col">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Due Date</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                {task.DueDate ? new Date(task.DueDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  weekday: 'short'
                }) : "No due date"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900/80 transition-colors">
            <Flag className={`w-5 h-5 ${getPriorityColor(task.Priority)}`} />
            <div className="flex flex-col">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Priority</span>
              <span className={`font-medium ${getPriorityColor(task.Priority)}`}>{task.Priority || "None"}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900/80 transition-colors">
            <CheckSquare className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
            <div className="flex flex-col">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Status</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">{task.Status || "Not specified"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskHeader;
