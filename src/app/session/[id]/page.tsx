import { getTasks, saveSessionLog, Task } from "@/lib/notion";
import Timer from "@/components/Timer";
import { Brain, Calendar, AlertCircle } from "lucide-react";
import NavBar from "@/components/NavBar";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function SessionPage({ params }: PageProps) {
  const { id: taskId } = await params;
  const tasks: Task[] = await getTasks(process.env.TASKS_DATABASE_ID!);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center p-8">
        <div className="bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-200 dark:border-zinc-700 shadow-lg p-12 text-center space-y-4 max-w-md w-full">
          <AlertCircle className="w-12 h-12 text-zinc-400 dark:text-zinc-500 mx-auto" />
          <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">Task Not Found</h2>
          <p className="text-zinc-500 dark:text-zinc-400">Please return to the tasks page.</p>
        </div>
      </div>
    );
  }

  const handleSaveSession = async (session: {
    StartTime: string;
    EndTime: string;
    WorkDuration: number;
    ShortBreakDuration: number;
    LongBreakDuration: number;
    WorkRounds: number;
    TotalSessionDuration: number;
  }) => {
    "use server";
    await saveSessionLog(process.env.SESSIONS_DATABASE_ID!, {
      Name: task.Name,
      StartTime: session.StartTime,
      EndTime: session.EndTime,
      WorkDuration: session.WorkDuration,
      ShortBreakDuration: session.ShortBreakDuration,
      LongBreakDuration: session.LongBreakDuration,
      WorkRounds: session.WorkRounds,
      TotalSessionDuration: session.TotalSessionDuration,
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto max-w-4xl p-8 space-y-8"> {/* Changed from max-w-3xl */}
        <NavBar/>
        {/* Task Header */}
        <div className="bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-200 dark:border-zinc-700 shadow-lg">
          <div className="p-8 space-y-8">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-100">
                  Focus Session
                </h1>
                <div className="inline-flex">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
                    <Brain className="w-4 h-4" />
                    <span className="text-sm font-medium">{task.Name}</span>
                  </div>
                </div>
              </div>

              {/* Task Details */}
                <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6 space-y-6">
                {/* Due Date */}
                <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">
                  {task.DueDate ? (
                    <>Due: <span className="text-zinc-900 dark:text-zinc-100">
                    {new Date(task.DueDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                    </span></>
                  ) : (
                    "No due date"
                  )}
                  </span>
                </div>

                {/* Status Tags */}
                <div className="flex flex-wrap gap-3">
                  <div className="px-4 py-2 rounded-full text-sm font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300">
                    Priority: {task.Priority || "None"}
                  </div>
                  
                  <div className="px-4 py-2 rounded-full text-sm font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300">
                    Status: {task.Status || "Not specified"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timer Section */}
        <Timer
          task={task}
          workDuration={25}
          shortBreak={5}
          longBreak={15}
          onSaveSession={handleSaveSession}
        />
      </div>
    </div>
  );
}