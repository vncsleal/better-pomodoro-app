"use client";

import { Calendar } from "lucide-react";
import React from "react";

interface SelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  icon: Icon,
}) => {
  return (
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Icon size={16} />
        </div>
      )}
      <select
  value={value}
  onChange={onChange}
  className={`appearance-none w-full bg-white border border-gray-200 rounded-lg p-2 ${
    Icon ? "pl-9" : "pl-3"
  } pr-8 text-sm text-gray-800 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    transition-shadow duration-200
    box-border h-10`}
>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
        ▼
      </div>
    </div>
  );
};

interface DateInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  placeholder?: string;
}

export const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  icon: Icon = Calendar,
  placeholder = "Select a date",
}) => (
  <div className="relative">
    {Icon && (
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <Icon size={16} />
      </div>
    )}
    <input
      type="date"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      aria-label="Date input"
      className={`appearance-none w-full bg-white border border-gray-200 rounded-lg p-2 ${
        Icon ? "pl-9" : "pl-3"
      } pr-8 text-sm text-gray-800 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        transition-shadow duration-200
        box-border h-10`}
    />
    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
      ▼
    </div>
  </div>
);