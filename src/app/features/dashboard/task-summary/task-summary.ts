
import { Component } from '@angular/core';
import { MOCK_TASKS } from '../../../data/mock-tasks';
import type { Task } from '../../../models/task.model';

@Component({
  selector: 'app-task-summary',
  templateUrl: './task-summary.html',
  styleUrl: './task-summary.scss'
})
export class TaskSummary {
  // L'elenco è tipizzato e non viene modificato
  // direttamente da questo componente.
  readonly tasks: readonly Task[] = MOCK_TASKS;

  // length restituisce il numero di elementi.
  readonly totalTasks = this.tasks.length;

  // filter crea un nuovo array con le attività
  // che rispettano la condizione indicata.
  readonly completedTasks = this.tasks.filter(
    (task) => task.status === 'completed'
  ).length;

  readonly pendingTasks = this.tasks.filter(
    (task) => task.status !== 'completed'
  ).length;

  // reduce accumula un valore attraversando l'array.
  // Partiamo da zero e sommiamo 1 per ogni task high.
  readonly highPriorityTasks = this.tasks.reduce(
    (total, task) =>
      total + (task.priority === 'high' ? 1 : 0),
    0
  );
}
