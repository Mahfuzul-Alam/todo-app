import React from 'react';
import { AlertCircleIcon, XIcon } from './Icons';

interface NotificationBannerProps {
  message: string;
  onDismiss: () => void;
}

export function NotificationBanner({ message, onDismiss }: NotificationBannerProps) {
  return (
    <div
      role="alert"
      className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start justify-between gap-3 shadow-xs"
    >
      <div className="flex items-start gap-3">
        <AlertCircleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-sm">
          <strong className="font-semibold">Notice: </strong>
          <span>{message}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="p-1 text-amber-600 hover:text-amber-800 rounded-lg hover:bg-amber-100 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
        aria-label="Dismiss notification"
      >
        <XIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
