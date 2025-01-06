"use client";

import React, { useState } from "react";
import { Settings2 } from "lucide-react";

interface TimerSettingsProps {
  workDuration: number;
  shortBreak: number;
  longBreak: number;
  setWorkDuration: (value: number) => void;
  setShortBreak: (value: number) => void;
  setLongBreak: (value: number) => void;
}

const TimerSettings: React.FC<TimerSettingsProps> = ({
  workDuration,
  shortBreak,
  longBreak,
  setWorkDuration,
  setShortBreak,
  setLongBreak,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative">
      {/* Settings Icon */}
      <button
        onClick={() => setShowMenu((prev) => !prev)}
        className="absolute top-2 right-2 bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-800 p-2 rounded-full transition"
        aria-label="Timer Settings"
      >
        <Settings2 className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
      </button>

      {/* Settings Menu */}
      {showMenu && (
        <div
          className="absolute top-10 right-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 
          rounded-lg shadow-lg p-4 space-y-4 w-64 z-50"
        >
          <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Timer Settings</h4>
          <div className="space-y-2">
            {[
              { label: "Work Duration", value: workDuration, setter: setWorkDuration },
              { label: "Short Break", value: shortBreak, setter: setShortBreak },
              { label: "Long Break", value: longBreak, setter: setLongBreak },
            ].map(({ label, value, setter }) => (
              <div key={label} className="flex items-center justify-between">
                <label className="text-sm text-zinc-600 dark:text-zinc-400">{label}</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setter(Math.max(1, parseInt(e.target.value) || 1))}
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
  );
};

export default TimerSettings;