import React from 'react';
import { FilterStatus } from '@/types/todo';
import { SearchIcon, XIcon, TrashIcon } from './Icons';

interface TodoFiltersProps {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
  onOpenClearCompletedModal: () => void;
}

export function TodoFilters({
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  counts,
  onOpenClearCompletedModal,
}: TodoFiltersProps) {
  const filterOptions: { id: FilterStatus; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: counts.all },
    { id: 'active', label: 'Active', count: counts.active },
    { id: 'completed', label: 'Completed', count: counts.completed },
  ];

  return (
    <div className="mb-4 space-y-3">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <SearchIcon className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks by title..."
          className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-slate-200 rounded-xl placeholder-slate-400 text-slate-800 shadow-xs focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          aria-label="Search tasks by title"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
            aria-label="Clear search query"
          >
            <XIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Tabs & Clear Completed */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <div
          role="tablist"
          aria-label="Task status filters"
          className="inline-flex rounded-xl bg-slate-100/90 p-1 text-slate-600"
        >
          {filterOptions.map((opt) => {
            const isActive = currentFilter === opt.id;
            return (
              <button
                key={opt.id}
                role="tab"
                id={`tab-${opt.id}`}
                aria-selected={isActive}
                aria-controls="task-list-panel"
                onClick={() => onFilterChange(opt.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <span>{opt.label}</span>
                <span
                  className={`text-xs px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-slate-100 text-slate-700' : 'bg-slate-200/60 text-slate-500'
                  }`}
                >
                  {opt.count}
                </span>
              </button>
            );
          })}
        </div>

        {counts.completed > 0 && (
          <button
            type="button"
            onClick={onOpenClearCompletedModal}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-slate-500 hover:text-rose-600 px-2 py-1 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500"
            aria-label={`Clear ${counts.completed} completed task${counts.completed > 1 ? 's' : ''}`}
          >
            <TrashIcon className="w-3.5 h-3.5" />
            <span>Clear completed ({counts.completed})</span>
          </button>
        )}
      </div>
    </div>
  );
}
