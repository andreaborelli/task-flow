import { Component, computed, input } from '@angular/core';
import type { Task } from '../../../models/task.model';

@Component({
  selector: 'app-task-summary',
  templateUrl: './task-summary.html',
  styleUrl: './task-summary.scss',
})
export class TaskSummary {
  // input.required indica che il genitore deve
  // obbligatoriamente passare l'elenco dei task.
  readonly tasks = input.required<readonly Task[]>();

  // computed calcola il risultato e lo aggiorna
  // quando cambia il signal da cui dipende.
  readonly totalTasks = computed(() => this.tasks().length);

  readonly completedTasks = computed(
    () => this.tasks().filter((task) => task.status === 'completed').length,
  );

  readonly pendingTasks = computed(
    () => this.tasks().filter((task) => task.status !== 'completed').length,
  );

  readonly highPriorityTasks = computed(
    () => this.tasks().filter((task) => task.priority === 'high').length,
  );
}
