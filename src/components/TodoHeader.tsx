import React from 'react';

export function TodoHeader() {
  return (
    <header className="mb-8 text-center sm:text-left sm:flex sm:items-end sm:justify-between border-b border-slate-200 pb-6">
      <div>
        <div className="flex items-center justify-center sm:justify-start gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-sm shadow-brand-500/20">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Zenith Tasks
          </h1>
        </div>
        <p className="mt-1.5 text-sm text-slate-500">
          A calm, focused task manager designed for clarity and daily momentum.
        </p>
      </div>

      <div className="mt-4 sm:mt-0 flex items-center justify-center sm:justify-end">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200"
          title="Tasks are stored securely on this browser and device only"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
          Saved on your device
        </span>
      </div>
    </header>
  );
}
