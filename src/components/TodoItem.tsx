import React, { useState, useRef, useEffect } from 'react';
import { Todo, Priority } from '@/types/todo';
import {
  CheckIcon,
  TrashIcon,
  EditIcon,
  CalendarIcon,
  AlertCircleIcon,
  FlagIcon,
  XIcon,
} from './Icons';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
}

export function TodoItem({ todo, onToggleComplete, onDelete, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority);
  const [editDueDate, setEditDueDate] = useState<string>(todo.dueDate || '');
  const [editError, setEditError] = useState<string | null>(null);

  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
      editInputRef.current?.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmed = editTitle.trim();
    if (!trimmed) {
      setEditError('Task title cannot be empty.');
      return;
    }

    onUpdate(todo.id, {
      title: trimmed,
      priority: editPriority,
      dueDate: editDueDate || undefined,
      updatedAt: Date.now(),
    });
    setEditError(null);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditPriority(todo.priority);
    setEditDueDate(todo.dueDate || '');
    setEditError(null);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  // Due date formatting & overdue calculation
  const getDueStatus = () => {
    if (!todo.dueDate) return null;

    // Parse YYYY-MM-DD
    const parts = todo.dueDate.split('-');
    if (parts.length !== 3) return null;
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const dueDateObj = new Date(year, month, day);

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const isOverdue = !todo.completed && dueDateObj < today;
    const isToday = dueDateObj.getTime() === today.getTime();

    const formattedDate = dueDateObj.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: dueDateObj.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
    });

    return {
      formattedDate,
      isOverdue,
      isToday,
    };
  };

  const dueStatus = getDueStatus();

  // Priority badge styling
  const priorityConfig = {
    low: {
      label: 'Low',
      bgClass: 'bg-slate-100 text-slate-600 border-slate-200',
    },
    medium: {
      label: 'Medium',
      bgClass: 'bg-amber-50 text-amber-700 border-amber-200/80',
    },
    high: {
      label: 'High Priority',
      bgClass: 'bg-rose-50 text-rose-700 border-rose-200/80 font-semibold',
    },
  }[todo.priority];

  return (
    <li
      className={`group relative p-3 sm:p-4 rounded-xl border transition-all ${
        todo.completed
          ? 'bg-slate-50/70 border-slate-200 text-slate-500'
          : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-xs'
      }`}
    >
      {isEditing ? (
        /* Edit Mode */
        <div className="space-y-3">
          <div>
            <label htmlFor={`edit-task-${todo.id}`} className="sr-only">
              Edit task title
            </label>
            <input
              ref={editInputRef}
              id={`edit-task-${todo.id}`}
              type="text"
              value={editTitle}
              onChange={(e) => {
                setEditTitle(e.target.value);
                if (editError && e.target.value.trim()) setEditError(null);
              }}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              aria-invalid={editError ? 'true' : 'false'}
            />
            {editError && (
              <p className="mt-1 text-xs text-rose-600 font-medium" role="alert">
                {editError}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
            <div className="flex items-center gap-3">
              {/* Edit Priority */}
              <label className="flex items-center gap-1 text-slate-600 font-medium">
                <FlagIcon className="w-3.5 h-3.5" />
                <span className="sr-only">Priority</span>
                <select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value as Priority)}
                  className="px-2 py-1 bg-slate-100 rounded border-none text-slate-800 font-normal focus:ring-2 focus:ring-brand-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </label>

              {/* Edit Due Date */}
              <label className="flex items-center gap-1 text-slate-600 font-medium">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span className="sr-only">Due date</span>
                <input
                  type="date"
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                  className="px-2 py-1 bg-slate-100 rounded border-none text-slate-800 font-normal focus:ring-2 focus:ring-brand-500"
                />
              </label>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Normal Display Mode */
        <div className="flex items-start gap-3">
          {/* Custom Accessible Checkbox */}
          <button
            type="button"
            role="checkbox"
            aria-checked={todo.completed}
            aria-label={`Mark "${todo.title}" as ${todo.completed ? 'active' : 'completed'}`}
            onClick={() => onToggleComplete(todo.id)}
            className={`mt-0.5 w-5 h-5 min-w-[20px] rounded-md border flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${
              todo.completed
                ? 'bg-brand-600 border-brand-600 text-white'
                : 'border-slate-300 hover:border-brand-500 bg-white'
            }`}
          >
            {todo.completed && <CheckIcon className="w-3.5 h-3.5 stroke-[3]" />}
          </button>

          {/* Task Info & Badges */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <span
                className={`text-sm sm:text-base leading-snug break-words select-text ${
                  todo.completed
                    ? 'line-through text-slate-400 font-normal'
                    : 'text-slate-900 font-medium'
                }`}
              >
                {/* Safe string rendering via React JSX */}
                {todo.title}
              </span>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
                  aria-label={`Edit task "${todo.title}"`}
                  title="Edit task"
                >
                  <EditIcon className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(todo.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500"
                  aria-label={`Delete task "${todo.title}"`}
                  title="Delete task"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Badges / Metadata row */}
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              {/* Priority badge */}
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[11px] ${priorityConfig.bgClass}`}
              >
                <FlagIcon className="w-3 h-3" />
                <span>{priorityConfig.label}</span>
              </span>

              {/* Due Date & Overdue Badge */}
              {dueStatus && (
                <div className="inline-flex items-center gap-1.5">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[11px] ${
                      dueStatus.isOverdue
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : dueStatus.isToday
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    <CalendarIcon className="w-3 h-3" />
                    <span>
                      {dueStatus.isToday ? 'Due Today' : `Due ${dueStatus.formattedDate}`}
                    </span>
                  </span>

                  {dueStatus.isOverdue && (
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-600 text-white font-semibold text-[11px] shadow-xs"
                      role="status"
                    >
                      <AlertCircleIcon className="w-3 h-3" />
                      <span>Overdue</span>
                    </span>
                  )}
                </div>
              )}

              {/* Completed Status text for assistive tech */}
              {todo.completed && (
                <span className="sr-only">Status: Completed</span>
              )}
            </div>
          </div>
        </div>
      )}
    </li>
  );
}
