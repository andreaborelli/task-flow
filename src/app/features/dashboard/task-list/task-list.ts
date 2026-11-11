import { Component, computed, input, output, signal } from '@angular/core';

import type { Task, TaskStatus } from '../../../models/task.model';

type TaskFilter = 'all' | TaskStatus;

interface TaskFilterOption {
  readonly id: TaskFilter;
  readonly label: string;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList {
  // Dati ricevuti dal genitore.
  readonly tasks = input.required<readonly Task[]>();

  // Eventi emessi verso il genitore.
  // Il tipo string indica che inviamo l'ID del task.
  readonly taskCompleted = output<string>();
  readonly taskRemoved = output<string>();

  readonly filters: readonly TaskFilterOption[] = [
    { id: 'all', label: 'Tutte' },
    { id: 'todo', label: 'Da fare' },
    { id: 'in-progress', label: 'In corso' },
    { id: 'completed', label: 'Completate' },
  ];

  // signal memorizza il filtro attualmente selezionato.
  readonly selectedFilter = signal<TaskFilter>('all');

  // computed legge sia l'input sia il filtro.
  readonly filteredTasks = computed(() => {
    const filter = this.selectedFilter();

    if (filter === 'all') {
      return this.tasks();
    }

    return this.tasks().filter((task) => task.status === filter);
  });

  setFilter(filter: TaskFilter): void {
    // set assegna un nuovo valore al signal.
    this.selectedFilter.set(filter);
  }

  completeTask(taskId: string): void {
    // Non modifica direttamente i task.
    // Comunica al genitore quale attività completare.
    this.taskCompleted.emit(taskId);
  }

  removeTask(taskId: string): void {
    this.taskRemoved.emit(taskId);
  }

  readonly taskStarted = output<string>();

  startTask(taskId: string): void {
    this.taskStarted.emit(taskId);
  }
}
