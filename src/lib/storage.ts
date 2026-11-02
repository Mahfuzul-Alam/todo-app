import { Todo, StorageStatus } from '@/types/todo';

const STORAGE_KEY = 'zenith_todos_v1';

/**
 * Checks whether localStorage is supported and accessible in the current browser.
 */
export function checkStorageAvailability(): StorageStatus {
  if (typeof window === 'undefined') {
    return { available: true };
  }

  try {
    const testKey = '__zenith_storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return { available: true };
  } catch (err) {
    const message =
      err instanceof DOMException &&
      (err.code === 22 ||
        err.code === 1014 ||
        err.name === 'QuotaExceededError' ||
        err.name === 'NS_ERROR_DOM_QUOTA_REACHED')
        ? 'Browser storage quota is full.'
        : 'Browser storage is disabled or unavailable in this window.';
    return { available: false, error: message };
  }
}

/**
 * Validates and sanitizes a raw task item.
 * Ensures the app handles missing, outdated, or malformed fields safely.
 */
function sanitizeTodo(raw: unknown): Todo | null {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  const candidate = raw as Partial<Todo>;

  if (typeof candidate.id !== 'string' || !candidate.id.trim()) {
    return null;
  }

  if (typeof candidate.title !== 'string') {
    return null;
  }

  const validPriorities = ['low', 'medium', 'high'] as const;
  const priority = validPriorities.includes(candidate.priority as (typeof validPriorities)[number])
    ? candidate.priority!
    : 'medium';

  const completed = Boolean(candidate.completed);
  const createdAt = typeof candidate.createdAt === 'number' && !Number.isNaN(candidate.createdAt)
    ? candidate.createdAt
    : Date.now();
  const updatedAt = typeof candidate.updatedAt === 'number' && !Number.isNaN(candidate.updatedAt)
    ? candidate.updatedAt
    : createdAt;

  let dueDate: string | undefined = undefined;
  if (typeof candidate.dueDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(candidate.dueDate)) {
    dueDate = candidate.dueDate;
  }

  return {
    id: candidate.id,
    title: candidate.title,
    completed,
    priority,
    dueDate,
    createdAt,
    updatedAt,
  };
}

/**
 * Loads tasks safely from localStorage.
 * Returns an empty array if storage is empty, corrupted, or unavailable.
 */
export function loadTodos(): { todos: Todo[]; error?: string } {
  if (typeof window === 'undefined') {
    return { todos: [] };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { todos: [] };
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return { todos: [] };
    }

    const sanitized: Todo[] = [];
    for (const item of parsed) {
      const valid = sanitizeTodo(item);
      if (valid) {
        sanitized.push(valid);
      }
    }

    return { todos: sanitized };
  } catch (err) {
    console.warn('Zenith Todo: Failed to read from localStorage.', err);
    return {
      todos: [],
      error: 'Unable to load previously saved tasks. Local storage may be corrupted or blocked.',
    };
  }
}

/**
 * Persists tasks safely to localStorage.
 * Returns false and an error string if saving fails (e.g. storage full).
 */
export function saveTodos(todos: Todo[]): { success: boolean; error?: string } {
  if (typeof window === 'undefined') {
    return { success: true };
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    return { success: true };
  } catch (err) {
    console.error('Zenith Todo: Failed to write to localStorage.', err);
    const message =
      err instanceof DOMException &&
      (err.code === 22 ||
        err.code === 1014 ||
        err.name === 'QuotaExceededError' ||
        err.name === 'NS_ERROR_DOM_QUOTA_REACHED')
        ? 'Cannot save tasks: browser storage is full. Please clear space.'
        : 'Cannot save tasks: browser storage access was denied.';
    return { success: false, error: message };
  }
}
