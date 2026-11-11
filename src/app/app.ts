import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { TaskSummary } from './features/dashboard/task-summary/task-summary';
import { TaskList } from './features/dashboard/task-list/task-list';
import { MOCK_TASKS } from './data/mock-tasks';
import type { Task } from './models/task.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, TaskSummary, TaskList],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly pageTitle = 'La tua dashboard';

  // Fonte unica dei dati utilizzati dai componenti.
  // signal rende reattivo il riferimento all'array.
  readonly tasks = signal<readonly Task[]>(MOCK_TASKS.map((task) => ({ ...task })));

  completeTask(taskId: string): void {
    // update riceve il valore attuale e restituisce
    // quello nuovo. Creiamo un array aggiornato.
    this.tasks.update((tasks) =>
      tasks.map((task) => (task.id === taskId ? { ...task, status: 'completed' } : task)),
    );
  }

  removeTask(taskId: string): void {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== taskId));
  }

  // Ripristina le attività ai valori iniziali
  resetTasks(): void {
    this.tasks.set(MOCK_TASKS.map((task) => ({ ...task })));
  }
  onTaskStarted(taskId: string): void {
    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === taskId && task.status === 'todo'
          ? { ...task, status: 'in-progress' as const }
          : task,
      ),
    );
  }
}
