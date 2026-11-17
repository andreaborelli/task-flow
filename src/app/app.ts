import { Component, computed, signal } from '@angular/core';
import { Header } from './shared/header/header';
import { TaskSummary } from './features/dashboard/task-summary/task-summary';
import { TaskList } from './features/dashboard/task-list/task-list';
import { MOCK_TASKS } from './data/mock-tasks';
import type { Task } from './models/task.model';

@Component({
  selector: 'app-root',
  imports: [Header, TaskSummary, TaskList],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly pageTitle = 'La tua dashboard';

  // Un'unica fonte reattiva per tutti i componenti.
  readonly tasks = signal<readonly Task[]>(this.copyInitialTasks());

  // computed calcola le attività completate.
  readonly completedCount = computed(
    () => this.tasks().filter((task) => task.status === 'completed').length,
  );

  // Calcola la percentuale, evitando la divisione
  // per zero quando l'array è vuoto.
  readonly completionPercentage = computed(() => {
    const total = this.tasks().length;

    return total === 0 ? 0 : Math.round((this.completedCount() / total) * 100);
  });

  // Contatore per ID univoci nella sola demo locale.
  private nextTaskNumber = 1;

  private copyInitialTasks(): Task[] {
    // Copia ogni oggetto del mock iniziale.
    return MOCK_TASKS.map((task) => ({ ...task }));
  }

  completeTask(taskId: string): void {
    this.tasks.update((tasks) =>
      tasks.map((task) => (task.id === taskId ? { ...task, status: 'completed' } : task)),
    );
  }

  removeTask(taskId: string): void {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== taskId));
  }

  addDemoTask(): void {
    const newTask: Task = {
      id: `demo-${this.nextTaskNumber++}`,
      title: 'Nuova attività dimostrativa',
      status: 'todo',
      priority: 'medium',
      createdAt: new Date().toISOString().slice(0, 10),
      dueDate: null,
    };

    // Lo spread crea un nuovo array e conserva
    // gli elementi precedenti senza modificarli.
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  resetTasks(): void {
    // set sostituisce l'intero valore del Signal.
    this.tasks.set(this.copyInitialTasks());
  }
}
