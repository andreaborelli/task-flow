import {
  Component,
  computed,
  inject,
  input,
  output,
  signal
} from '@angular/core';

import { TASK_LIST_CONFIG } from
  '../../../core/config/task-list-config';

import type {
  Task,
  TaskStatus
} from '../../../models/task.model';

type TaskFilter = 'all' | TaskStatus;

interface TaskFilterOption {
  readonly id: TaskFilter;
  readonly label: string;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskList {

  // Angular risolve la configurazione
  // tramite Dependency Injection.
  readonly config = inject(TASK_LIST_CONFIG);

  // Dati ricevuti dal componente genitore.
  readonly tasks = input.required<readonly Task[]>();

  // Eventi comunicati al componente genitore.
  // Ogni evento trasmette l'ID del task come stringa.
  readonly taskStarted = output<string>();
  readonly taskCompleted = output<string>();
  readonly taskRemoved = output<string>();

  // Opzioni disponibili per filtrare le attività.
  readonly filters: readonly TaskFilterOption[] = [
    { id: 'all', label: 'Tutte' },
    { id: 'todo', label: 'Da fare' },
    { id: 'in-progress', label: 'In corso' },
    { id: 'completed', label: 'Completate' }
  ];

  // Signal che memorizza il filtro selezionato.
  readonly selectedFilter = signal<TaskFilter>('all');

  // Computed dipende dall'input tasks
  // e dal signal selectedFilter.
  // Si aggiorna automaticamente quando
  // una delle dipendenze cambia.
  readonly filteredTasks = computed(() => {
    const filter = this.selectedFilter();

    return filter === 'all'
      ? this.tasks()
      : this.tasks().filter(
          task => task.status === filter
        );
  });

  // Aggiorna il filtro selezionato.
  setFilter(filter: TaskFilter): void {
    this.selectedFilter.set(filter);
  }

  // Comunica al genitore l'ID del task da avviare.
  startTask(taskId: string): void {
    this.taskStarted.emit(taskId);
  }

  // Comunica al genitore l'ID del task da completare.
  completeTask(taskId: string): void {
    this.taskCompleted.emit(taskId);
  }

  // Comunica al genitore l'ID del task da eliminare.
  removeTask(taskId: string): void {
    this.taskRemoved.emit(taskId);
  }
}