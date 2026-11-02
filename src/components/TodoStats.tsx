import React from 'react';
import { Todo } from '@/types/todo';
import { CheckCircleIcon } from './Icons';

interface TodoStatsProps {
  todos: Todo[];
}

export function TodoStats({ todos }: TodoStatsProps) {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  if (total === 0) {
    return null;
  }

  const isAllDone = total > 0 && completed === total;

  return (
    <section
      aria-label="Task progress summary"
      className="mb-6 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm"
    >
      <div className="flex items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-800">Progress</span>
          {isAllDone && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircleIcon className="w-3.5 h-3.5" />
              All caught up!
            </span>
          )}
        </div>
        <div className="text-xs font-medium text-slate-500">
          <span className="font-semibold text-slate-900">{completed}</span> of{' '}
          <span className="font-semibold text-slate-900">{total}</span> completed ({percentage}%)
        </div>
      </div>

      <div
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Task completion progress: ${percentage}%`}
        className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"
      >
        <div
          className={`h-full transition-all duration-300 ease-out rounded-full ${
            isAllDone ? 'bg-emerald-500' : 'bg-brand-600'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </section>
  );
}
