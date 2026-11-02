import React from 'react';
import { FilterStatus } from '@/types/todo';

interface EmptyStateProps {
  totalTasks: number;
  filter: FilterStatus;
  searchQuery: string;
  onResetFilters: () => void;
}

export function EmptyState({
  totalTasks,
  filter,
  searchQuery,
  onResetFilters,
}: EmptyStateProps) {
  // Case 1: Brand new user with no tasks at all
  if (totalTasks === 0) {
    return (
      <div className="text-center py-12 px-4 rounded-2xl border-2 border-dashed border-slate-200 bg-white/50">
        <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-3">
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-slate-800">No tasks yet</h3>
        <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
          Add your first task above to start organizing your day with focus and calm.
        </p>
      </div>
    );
  }

  // Case 2: Filter or search returned 0 items
  const filterDescription =
    filter === 'completed'
      ? 'completed tasks'
      : filter === 'active'
      ? 'active tasks'
      : 'tasks';

  return (
    <div className="text-center py-10 px-4 rounded-2xl border border-slate-200 bg-white">
      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2.5">
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <h3 className="text-sm font-semibold text-slate-800">No matching tasks</h3>
      <p className="mt-1 text-xs text-slate-500 max-w-xs mx-auto">
        {searchQuery ? (
          <>
            No {filterDescription} matching &ldquo;<span className="font-medium text-slate-700">{searchQuery}</span>&rdquo;.
          </>
        ) : (
          `You have no ${filterDescription}.`
        )}
      </p>

      <div className="mt-4">
        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          Clear filters & search
        </button>
      </div>
    </div>
  );
}
