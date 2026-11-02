import React, { useState } from 'react';
import { Priority } from '@/types/todo';
import { PlusIcon, CalendarIcon, FlagIcon } from './Icons';

interface TodoFormProps {
  onAddTodo: (title: string, priority: Priority, dueDate?: string) => boolean;
}

export function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();

    if (!trimmed) {
      setValidationError('Please enter a task title.');
      return;
    }

    setValidationError(null);
    const success = onAddTodo(trimmed, priority, dueDate || undefined);

    if (success) {
      setTitle('');
      setDueDate('');
      setPriority('medium');
      setIsExpanded(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (validationError && e.target.value.trim()) {
      setValidationError(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all"
      aria-label="Add a new task"
    >
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex-1">
          <label htmlFor="new-task-title" className="sr-only">
            Task title
          </label>
          <input
            id="new-task-title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            onFocus={() => setIsExpanded(true)}
            placeholder="Add a new task... (e.g. Prepare presentation notes)"
            className="w-full px-3 py-2 text-sm sm:text-base text-slate-800 placeholder-slate-400 bg-transparent rounded-lg focus:outline-none"
            aria-invalid={validationError ? 'true' : 'false'}
            aria-describedby={validationError ? 'title-error-msg' : undefined}
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-medium text-sm rounded-xl shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      {validationError && (
        <p id="title-error-msg" className="mt-2 text-xs font-medium text-rose-600" role="alert">
          {validationError}
        </p>
      )}

      {/* Optional details (Priority & Due Date) */}
      <div
        className={`mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 ${
          isExpanded || title || dueDate || priority !== 'medium' ? 'block' : 'hidden sm:flex'
        }`}
      >
        {/* Priority Selector */}
        <fieldset className="flex items-center gap-1.5">
          <legend className="text-xs font-medium text-slate-500 mr-2 flex items-center gap-1">
            <FlagIcon className="w-3.5 h-3.5" />
            Priority:
          </legend>
          <div className="flex items-center rounded-lg bg-slate-100 p-0.5" role="radiogroup" aria-label="Task priority">
            {(
              [
                { value: 'low', label: 'Low', activeClass: 'bg-white text-slate-700 shadow-xs' },
                { value: 'medium', label: 'Medium', activeClass: 'bg-white text-amber-700 font-medium shadow-xs' },
                { value: 'high', label: 'High', activeClass: 'bg-white text-rose-700 font-medium shadow-xs' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={priority === opt.value}
                onClick={() => setPriority(opt.value)}
                className={`px-2.5 py-1 text-xs rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                  priority === opt.value
                    ? opt.activeClass
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Due Date Picker */}
        <div className="flex items-center gap-2">
          <label htmlFor="task-due-date" className="text-xs font-medium text-slate-500 flex items-center gap-1 cursor-pointer">
            <CalendarIcon className="w-3.5 h-3.5" />
            Due date:
          </label>
          <input
            id="task-due-date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-slate-200/80 rounded-lg text-slate-700 border-none focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
          />
          {dueDate && (
            <button
              type="button"
              onClick={() => setDueDate('')}
              className="text-xs text-slate-400 hover:text-slate-600 focus:outline-none"
              aria-label="Clear due date"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
