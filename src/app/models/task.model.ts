
/**
 * Stati consentiti per un'attività.
 * La union type evita stringhe arbitrarie.
 */
export type TaskStatus =
  | 'todo'
  | 'in-progress'
  | 'completed';

/**
 * Priorità disponibili.
 */
export type TaskPriority = 'low' | 'medium' | 'high';

/**
 * Contratto dei dati utilizzati nel frontend.
 */
export interface Task {
  readonly id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  dueDate: string | null;
}
