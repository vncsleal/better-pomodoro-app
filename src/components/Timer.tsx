"use client";

import React, { useState, useEffect } from "react";
import { PlayCircle, StopCircle, Settings2 } from "lucide-react";

interface TimerProps {
  task: { id: string; Name: string };
  workDuration: number;
  shortBreak: number;
  longBreak: number;
  onSaveSession: (session: {
    StartTime: string;
    EndTime: string;
    WorkDuration: number;
    ShortBreakDuration: number;
    LongBreakDuration: number;
    WorkRounds: number;
    TotalSessionDuration: number;
  }) => void;
}

const Timer: React.FC<TimerProps> = ({
  task,
  workDuration: initialWorkDuration,
  shortBreak: initialShortBreak,
  longBreak: initialLongBreak,
  onSaveSession,
}) => {
  const [workDuration, setWorkDuration] = useState(initialWorkDuration);
  const [shortBreakDuration, setShortBreakDuration] = useState(initialShortBreak);
  const [longBreakDuration, setLongBreakDuration] = useState(initialLongBreak);
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<"work" | "short-break" | "long-break">("work");
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(id);
            handlePhaseSwitch();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setIntervalId(id);

      return () => clearInterval(id);
    }
  }, [isRunning, currentPhase, workDuration, shortBreakDuration, longBreakDuration]);

  useEffect(() => {
    if (!isRunning) {
      if (currentPhase === "work") {
        setTimeLeft(workDuration * 60);
      } else if (currentPhase === "short-break") {
        setTimeLeft(shortBreakDuration * 60);
      } else {
        setTimeLeft(longBreakDuration * 60);
      }
    }
  }, [workDuration, shortBreakDuration, longBreakDuration, currentPhase, isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? `0${secs}` : secs}`;
  };

  const handlePhaseSwitch = () => {
    if (currentPhase === "work") {
      if ((roundsCompleted + 1) % 2 === 0) {
        setCurrentPhase("long-break");
        setTimeLeft(longBreakDuration * 60);
      } else {
        setCurrentPhase("short-break");
        setTimeLeft(shortBreakDuration * 60);
      }
    } else {
      setRoundsCompleted((prev) => prev + 1);
      setCurrentPhase("work");
      setTimeLeft(workDuration * 60);
    }
  };

  const handleStart = () => {
    setIsRunning(true);
    if (!sessionStartTime) {
      setSessionStartTime(new Date());
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    if (intervalId) clearInterval(intervalId);
  };

  const handleEndSession = () => {
    handleStop();

    const sessionEndTime = new Date();
    const totalDuration =
      sessionStartTime && sessionEndTime
        ? Math.floor((sessionEndTime.getTime() - sessionStartTime.getTime()) / 1000)
        : 0;

    onSaveSession({
      StartTime: sessionStartTime?.toISOString() || "",
      EndTime: sessionEndTime.toISOString(),
      WorkDuration: workDuration,
      ShortBreakDuration: shortBreakDuration,
      LongBreakDuration: longBreakDuration,
      WorkRounds: roundsCompleted,
      TotalSessionDuration: totalDuration,
    });

    setTimeLeft(workDuration * 60);
    setIsRunning(false);
    setCurrentPhase("work");
    setRoundsCompleted(0);
    setSessionStartTime(null);
  };

  const handleDurationChange = (
    value: number,
    setter: (value: number) => void
  ) => {
    const newValue = Math.max(1, value);
    setter(newValue);
  };

  return (
    <div className="mx-auto space-y-6 md:space-y-8">
      <div className="relative bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 shadow-lg border border-zinc-100 dark:border-zinc-800 space-y-6 md:space-y-8">
        {/* Timer Settings Button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setShowSettings((prev) => !prev)}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            aria-label="Timer Settings"
          >
            <Settings2 className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
          </button>

          {/* Settings Menu */}
          {showSettings && (
            <div
              className="absolute right-0 mt-2 bg-white dark:bg-zinc-800 border border-zinc-200 
              dark:border-zinc-700 rounded-lg shadow-lg p-4 space-y-4 z-50 w-64"
            >
              <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Timer Settings</h4>
              <div className="space-y-2">
                {[
                  { label: "Work Duration", value: workDuration, setter: setWorkDuration },
                  { label: "Short Break", value: shortBreakDuration, setter: setShortBreakDuration },
                  { label: "Long Break", value: longBreakDuration, setter: setLongBreakDuration },
                ].map(({ label, value, setter }) => (
                  <div key={label} className="flex items-center justify-between">
                    <label className="text-sm text-zinc-600 dark:text-zinc-400">{label}</label>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => handleDurationChange(parseInt(e.target.value) || 1, setter)}
                      className="w-16 text-sm text-zinc-800 dark:text-zinc-200 bg-transparent border border-zinc-300 
                      dark:border-zinc-700 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      min={1}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Timer Content */}
        <div className="flex flex-col items-center space-y-6">
          <h2 className="text-xl font-medium text-zinc-700 dark:text-zinc-300">{task.Name}</h2>
          <div className="text-sm font-medium tracking-wide uppercase text-zinc-500 dark:text-zinc-400">
            {currentPhase === "work" ? "Focus Time" : currentPhase === "short-break" ? "Short Break" : "Long Break"}
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`w-48 h-48 rounded-full ${
                  isRunning ? "border-4 border-zinc-900 dark:border-zinc-100 animate-pulse" : "border-2"
                } border-zinc-100 dark:border-zinc-800 transition-all duration-300`}
              />
            </div>
            <div className="relative flex flex-col items-center justify-center w-48 h-48">
              <span className="font-mono text-5xl font-light tracking-tight text-zinc-800 dark:text-zinc-200">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={!isRunning ? handleStart : handleStop}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                !isRunning
                  ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                  : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
              }`}
            >
              {!isRunning ? <PlayCircle className="inline-block w-5 h-5 mr-2" /> : <StopCircle className="inline-block w-5 h-5 mr-2" />}
              {!isRunning ? "Start" : "Stop"}
            </button>
            <button
              onClick={handleEndSession}
              className="px-6 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
            >
              End Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;