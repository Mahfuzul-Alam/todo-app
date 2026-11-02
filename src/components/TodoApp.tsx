'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Todo, Priority, FilterStatus } from '@/types/todo';
import { loadTodos, saveTodos, checkStorageAvailability } from '@/lib/storage';
import { TodoHeader } from './TodoHeader';
import { TodoStats } from './TodoStats';
import { TodoForm } from './TodoForm';
import { TodoFilters } from './TodoFilters';
import { TodoItem } from './TodoItem';
import { EmptyState } from './EmptyState';
import { ConfirmModal } from './ConfirmModal';
import { NotificationBanner } from './NotificationBanner';

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [storageNotice, setStorageNotice] = useState<string | null>(null);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  // Load tasks only after mount to prevent hydration mismatch
  useEffect(() => {
    const storageStatus = checkStorageAvailability();
    if (!storageStatus.available && storageStatus.error) {
      setStorageNotice(storageStatus.error);
    }

    const { todos: loaded, error } = loadTodos();
    if (error) {
      setStorageNotice(error);
    }

    setTodos(loaded);
    setIsHydrated(true);
  }, []);

  // Safe helper to update todos and persist to localStorage
  const updateAndPersist = (newTodos: Todo[]) => {
    setTodos(newTodos);
    const { success, error } = saveTodos(newTodos);
    if (!success && error) {
      setStorageNotice(error);
    }
  };

  const handleAddTodo = (title: string, priority: Priority, dueDate?: string): boolean => {
    const newTodo: Todo = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `todo_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      title,
      completed: false,
      priority,
      dueDate,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const nextTodos = [newTodo, ...todos];
    updateAndPersist(nextTodos);
    return true;
  };

  const handleToggleComplete = (id: string) => {
    const nextTodos = todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed, updatedAt: Date.now() } : t
    );
    updateAndPersist(nextTodos);
  };

  const handleDeleteTodo = (id: string) => {
    const nextTodos = todos.filter((t) => t.id !== id);
    updateAndPersist(nextTodos);
  };

  const handleUpdateTodo = (id: string, updates: Partial<Todo>) => {
    const nextTodos = todos.map((t) => (t.id === id ? { ...t, ...updates } : t));
    updateAndPersist(nextTodos);
  };

  const handleClearCompleted = () => {
    const nextTodos = todos.filter((t) => !t.completed);
    updateAndPersist(nextTodos);
    setIsClearModalOpen(false);
  };

  // Counts for tabs
  const counts = useMemo(() => {
    const completed = todos.filter((t) => t.completed).length;
    return {
      all: todos.length,
      active: todos.length - completed,
      completed,
    };
  }, [todos]);

  // Filtered & searched todos
  const filteredTodos = useMemo(() => {
    return todos.filter((t) => {
      // Status filter
      if (filter === 'active' && t.completed) return false;
      if (filter === 'completed' && !t.completed) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return t.title.toLowerCase().includes(query);
      }

      return true;
    });
  }, [todos, filter, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50/60 py-8 px-4 sm:px-6 lg:px-8">
      <main className="max-w-2xl mx-auto">
        <TodoHeader />

        {storageNotice && (
          <NotificationBanner
            message={storageNotice}
            onDismiss={() => setStorageNotice(null)}
          />
        )}

        {/* Client loading state skeleton to avoid jump before mount */}
        {!isHydrated ? (
          <div className="space-y-4 animate-pulse" aria-busy="true" aria-label="Loading tasks">
            <div className="h-16 bg-slate-200/70 rounded-2xl" />
            <div className="h-12 bg-slate-200/50 rounded-xl" />
            <div className="h-20 bg-slate-200/60 rounded-xl" />
            <div className="h-20 bg-slate-200/60 rounded-xl" />
          </div>
        ) : (
          <>
            <TodoStats todos={todos} />

            <TodoForm onAddTodo={handleAddTodo} />

            {todos.length > 0 && (
              <TodoFilters
                currentFilter={filter}
                onFilterChange={setFilter}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                counts={counts}
                onOpenClearCompletedModal={() => setIsClearModalOpen(true)}
              />
            )}

            {filteredTodos.length === 0 ? (
              <EmptyState
                totalTasks={todos.length}
                filter={filter}
                searchQuery={searchQuery}
                onResetFilters={() => {
                  setFilter('all');
                  setSearchQuery('');
                }}
              />
            ) : (
              <section id="task-list-panel" aria-label="Tasks list">
                <ul className="space-y-2.5" role="list">
                  {filteredTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggleComplete={handleToggleComplete}
                      onDelete={handleDeleteTodo}
                      onUpdate={handleUpdateTodo}
                    />
                  ))}
                </ul>
              </section>
            )}

            <ConfirmModal
              isOpen={isClearModalOpen}
              count={counts.completed}
              onConfirm={handleClearCompleted}
              onCancel={() => setIsClearModalOpen(false)}
            />
          </>
        )}

        <footer className="mt-12 text-center text-xs text-slate-400 border-t border-slate-200/70 pt-6">
          <p>
            Zenith Tasks is a standalone, client-side application.
          </p>
          <p className="mt-1">
            All tasks are stored strictly in your browser&apos;s localStorage and never leave your device.
          </p>
        </footer>
      </main>
    </div>
  );
}
