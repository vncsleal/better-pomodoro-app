"use client";
import React from "react";
import { Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Task } from "@/lib/notion";

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
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric"
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const name = task.Name || "";
  const dueDate = task.DueDate || "No due date";
  const priority = task.Priority || "Medium";
  const status = task.Status || "Not Started";

  const getPriorityStyle = () => {
    switch (priority) {
      case "High":
        return "font-medium text-zinc-900 dark:text-zinc-100";
      case "Medium":
        return "font-normal text-zinc-700 dark:text-zinc-300";
      case "Low":
        return "font-normal text-zinc-500 dark:text-zinc-400";
      default:
        return "font-normal text-zinc-500 dark:text-zinc-400";
    }
  };

  const getStatusDot = () => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500";
      case "in progress":
        return "bg-zinc-400";
      default:
        return "bg-zinc-200 dark:bg-zinc-700";
    }
  };

  return (
    <div className="group relative rounded-lg border border-zinc-100 bg-white transition-all duration-200 hover:border-zinc-200 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
      <div className="p-4">
        {/* Task header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className={`line-clamp-1 text-base ${getPriorityStyle()}`}>
            {name}
          </h3>
          <ChevronRight className="h-4 w-4 text-zinc-300 opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:text-zinc-600" />
        </div>

        {/* Status and date row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${getStatusDot()}`} />
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {status}
            </span>
          </div>
          
          <div className="flex items-center text-xs text-zinc-400 dark:text-zinc-500">
            <Calendar className="mr-1.5 h-3.5 w-3.5" />
            {formatDate(dueDate)}
          </div>
        </div>
      </div>

      {/* Clickable overlay */}
      <Link
        href={`/session/${task.id}`}
        className="absolute inset-0 rounded-lg ring-offset-2 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-500"
      >
        <span className="sr-only">View task details</span>
      </Link>
    </div>
  );
};

export default TaskCard;