
import type { Task } from '../models/task.model';

// Mock locale: sarà sostituito dai dati Firebase.
export const MOCK_TASKS: readonly Task[] = [
  {
    id: 'task-001',
    title: 'Creare il layout principale',
    description: 'Header e struttura dashboard',
    status: 'completed',
    priority: 'high',
    createdAt: '2026-11-05',
    dueDate: null
  },
  {
    id: 'task-002',
    title: 'Definire i modelli TypeScript',
    status: 'in-progress',
    priority: 'high',
    createdAt: '2026-11-06',
    dueDate: '2026-11-10'
  },
  {
    id: 'task-003',
    title: 'Preparare la pagina progetti',
    status: 'todo',
    priority: 'medium',
    createdAt: '2026-11-07',
    dueDate: null
  },
    {
    id: 'task-004',
    title: 'Preparare la pagina progetti',
    status: 'completed',
    priority: 'low',
    createdAt: '2026-11-07',
    dueDate: null
  }
];
