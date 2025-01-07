"use client";

import { useEffect, useState } from "react";
import { Task } from "../lib/notion";
import TaskCard from "@/components/TaskCard";
import { AlertCircle, Plus, ListTodo } from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [editTaskName, setEditTaskName] = useState<string>("");
  const [editTaskDueDate, setEditTaskDueDate] = useState<string>("");
  const [editTaskPriority, setEditTaskPriority] = useState<string>("Medium");
  const [editTaskStatus, setEditTaskStatus] = useState<string>("Not started");

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("/api/tasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const fetchedTasks = await response.json();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Failed to load tasks. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  const updateTask = (
    id: string,
    newName: string,
    dueDate: string,
    priority: string,
    status: string
  ) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, Name: newName, DueDate: dueDate, Priority: priority, Status: status }
          : task
      )
    );
    setEditTaskId(null);
  };

  return (
    <div className=" bg-zinc-50 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col py-8">
          {/* Header Section */}
          <header className="mb-8 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800">
                <ListTodo className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
              </div>
              <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                Pomodoro Tasks
              </h1>
            </div>
          </header>
  
          {/* Main Content */}
          <main className="flex-1">
            {loading ? (
              <div className="flex h-64 flex-col items-center justify-center space-y-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-800/50">
                <div className="h-8 w-8 animate-spin rounded-full border-3 border-zinc-200 border-t-zinc-500 dark:border-zinc-700 dark:border-t-zinc-300" />
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading your tasks...</p>
              </div>
            ) : error ? (
              <div className="flex h-64 flex-col items-center justify-center space-y-4 rounded-xl border border-red-200 bg-white dark:border-red-900/50 dark:bg-red-900/10">
                <AlertCircle className="h-8 w-8 text-red-500 dark:text-red-400" />
                <p className="text-sm font-medium text-red-500 dark:text-red-400">{error}</p>
              </div>
            ) : tasks.length === 0 ? (
              <div className="flex h-64 flex-col items-center justify-center space-y-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-800/50">
                <div className="rounded-full bg-zinc-100 p-3 dark:bg-zinc-800">
                  <Plus className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">No tasks yet</p>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Create your first task to get started</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    editTaskId={editTaskId}
                    setEditTaskId={setEditTaskId}
                    editTaskName={editTaskName}
                    setEditTaskName={setEditTaskName}
                    editTaskDueDate={editTaskDueDate}
                    setEditTaskDueDate={setEditTaskDueDate}
                    editTaskPriority={editTaskPriority}
                    setEditTaskPriority={setEditTaskPriority}
                    editTaskStatus={editTaskStatus}
                    setEditTaskStatus={setEditTaskStatus}
                    updateTask={updateTask}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}