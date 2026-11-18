import { Injectable, computed, signal } from '@angular/core';
import { MOCK_TASKS } from '../../data/mock-tasks';
import type { Task } from '../../models/task.model';

@Injectable({
  // Angular registra il servizio nell'injector root.
  providedIn: 'root',
})
export class TaskStore {
  // Lo stato è privato: solo il servizio può modificarlo.
  private readonly _tasks = signal<readonly Task[]>(MOCK_TASKS.map((task) => ({ ...task })));

  // asReadonly espone il Signal senza i metodi
  // set() e update() ai consumatori esterni.
  readonly tasks = this._tasks.asReadonly();

  // computed ricalcola il conteggio quando cambiano i task.
  readonly completedCount = computed(
    () => this.tasks().filter((task) => task.status === 'completed').length,
  );

  readonly completionPercentage = computed(() => {
    const total = this.tasks().length;

    // Evitiamo una divisione per zero.
    return total === 0 ? 0 : Math.round((this.completedCount() / total) * 100);
  });

  private nextDemoId = 1;

  startTask(taskId: string): void {
    this._tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === taskId && task.status === 'todo' ? { ...task, status: 'in-progress' } : task,
      ),
    );
  }

  completeTask(taskId: string): void {
    // map crea un nuovo array senza mutare l'originale.
    this._tasks.update((tasks) =>
      tasks.map((task) => (task.id === taskId ? { ...task, status: 'completed' } : task)),
    );
  }

  removeTask(taskId: string): void {
    this._tasks.update((tasks) => tasks.filter((task) => task.id !== taskId));
  }

  addDemoTask(): void {
    const newTask: Task = {
      id: `demo-${this.nextDemoId++}`,
      title: 'Nuova attività dimostrativa',
      status: 'todo',
      priority: 'medium',
      createdAt: new Date().toISOString(),
      dueDate: null,
    };

    // Lo spread aggiunge un elemento in un nuovo array.
    this._tasks.update((tasks) => [...tasks, newTask]);
  }

  resetTasks(): void {
    // Ricrea gli oggetti iniziali e sostituisce lo stato.
    this._tasks.set(MOCK_TASKS.map((task) => ({ ...task })));
  }
}
