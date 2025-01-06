"use client";

import React from "react";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { Task } from "@/lib/notion"; // Corrected import path

interface TaskCardProps {
  task: Task;
  editTaskId: string | null;
  setEditTaskId: React.Dispatch<React.SetStateAction<string | null>>;
  editTaskName: string;
  setEditTaskName: React.Dispatch<React.SetStateAction<string>>;
  editTaskDueDate: string;
  setEditTaskDueDate: React.Dispatch<React.SetStateAction<string>>;
  editTaskPriority: string;
  setEditTaskPriority: React.Dispatch<React.SetStateAction<string>>;
  editTaskStatus: string;
  setEditTaskStatus: React.Dispatch<React.SetStateAction<string>>;
  updateTask: (
    id: string,
    newName: string,
    dueDate: string,
    priority: string,
    status: string
  ) => void;
}

const formatDate = (dateString: string): string => {
  if (!dateString) return "No due date";
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const name = task.Name || "";
  const dueDate = task.DueDate || "No due date";
  const priority = task.Priority || "Medium";

  const getPriorityColor = () => {
    switch (priority) {
      case "High":
        return "text-red-600 dark:text-red-400";
      case "Medium":
        return "text-yellow-600 dark:text-yellow-400";
      case "Low":
        return "text-green-600 dark:text-green-400";
      default:
        return "text-zinc-600 dark:text-zinc-400";
    }
  };

  return (
    <Link href={`/session/${task.id}`}>
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 h-52 border border-zinc-100 dark:border-zinc-800 shadow-lg flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
        <div className="space-y-4">
          <h3 className="text-xl font-medium text-zinc-700 dark:text-zinc-300 truncate">
            {name}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-zinc-500 dark:text-zinc-400">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(dueDate)}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${getPriorityColor()}`}>
            {priority} Priority
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TaskCard;