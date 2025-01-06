"use client";

import { useEffect, useState } from "react";
import { Task } from "../lib/notion";
import NavBar from "@/components/NavBar";
import TaskCard from "@/components/TaskCard"; // Import TaskCard
import { AlertCircle } from "lucide-react";

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
/*
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };
  */

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto max-w-4xl p-8 space-y-8">
        <NavBar />

        {/* Header */}
        <div className="bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-200 dark:border-zinc-700 shadow-lg p-8">
          <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-100">Pomodoro Tasks</h1>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-200 dark:border-zinc-700 shadow-lg p-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-zinc-400 dark:border-zinc-500 border-t-transparent rounded-full mx-auto" />
              <p className="mt-4 text-zinc-500 dark:text-zinc-400 font-medium">Loading your tasks...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 space-y-4">
              <AlertCircle className="w-12 h-12 text-zinc-400 dark:text-zinc-500 mx-auto" />
              <div className="text-zinc-500 dark:text-zinc-400 font-medium">{error}</div>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-500 dark:text-zinc-400 font-medium">No tasks found. Add tasks to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>
      </div>
    </div>
  );
}