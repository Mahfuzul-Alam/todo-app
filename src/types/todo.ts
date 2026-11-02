export type Priority = 'low' | 'medium' | 'high';

export type FilterStatus = 'all' | 'active' | 'completed';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  dueDate?: string; // Format: YYYY-MM-DD
  createdAt: number;
  updatedAt: number;
}

export interface StorageStatus {
  available: boolean;
  error?: string;
}
