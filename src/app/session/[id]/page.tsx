// app/[id]/page.tsx
import { getTasks, Task, saveSessionLog } from "@/lib/notion";
import Timer from "@/components/Timer";
import { AlertCircle } from "lucide-react";
import TaskHeader from "@/components/TaskHeader";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function SessionPage({ params }: PageProps) {
  const { id: taskId } = await params;
  const tasks: Task[] = await getTasks(process.env.TASKS_DATABASE_ID!);
  const task = tasks.find((t) => t.id === taskId);

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
    if (!task) return;
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

  if (!task) {
    return (
      <div className="bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center p-8">
        <div className="bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-200 dark:border-zinc-700 shadow-lg p-12 text-center space-y-4 max-w-md w-full">
          <AlertCircle className="w-12 h-12 text-zinc-400 dark:text-zinc-500 mx-auto" />
          <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">Task Not Found</h2>
          <p className="text-zinc-500 dark:text-zinc-400">Please return to the tasks page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto max-w-4xl p-4 md:p-8 space-y-4 md:space-y-8">
        <Timer
          task={task}
          workDuration={25}
          shortBreak={5}
          longBreak={15}
          onSaveSession={handleSaveSession}
        />
        <TaskHeader
          task={{
            Name: task.Name,
            DueDate: task.DueDate ?? undefined,
            Priority: task.Priority ?? undefined,
            Status: task.Status ?? undefined,
          }}
        />
      </div>
    </div>
  );
}
