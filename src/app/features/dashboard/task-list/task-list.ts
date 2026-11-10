
import { Component } from '@angular/core';
import { MOCK_TASKS } from '../../../data/mock-tasks';
import type {
  Task,
  TaskStatus
} from '../../../models/task.model';

// Tipo che rappresenta le opzioni del filtro.
type TaskFilter = 'all' | TaskStatus;

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskList {
  // Creiamo copie dei task per evitare di modificare
  // direttamente gli oggetti originali del mock.
  tasks: Task[] = MOCK_TASKS.map(task => ({ ...task }));

  // Il filtro iniziale mostra tutte le attività.
  selectedFilter: TaskFilter = 'all';

  // Getter: ricalcola i risultati quando Angular
  // legge questa proprietà dal template.
  get filteredTasks(): Task[] {
    if (this.selectedFilter === 'all') {
      return this.tasks;
    }

    // filter restituisce solo i task che rispettano
    // la condizione indicata.
    return this.tasks.filter(
      task => task.status === this.selectedFilter
    );
  }

  // Cambia il filtro selezionato.
  setFilter(filter: TaskFilter): void {
    this.selectedFilter = filter;
  }

  // Segna un'attività come completata.
  completeTask(taskId: string): void {
    this.tasks = this.tasks.map(task =>
      task.id === taskId
        ? { ...task, status: 'completed' }
        : task
    );
  }
    // Segna un'attività come completata.
  inProgressTask(taskId: string): void {
    this.tasks = this.tasks.map(task =>
      task.id === taskId
        ? { ...task, status: 'in-progress' }
        : task
    );
  }

  // Rimuove un'attività dall'elenco locale.
  removeTask(taskId: string): void {
    this.tasks = this.tasks.filter(
      task => task.id !== taskId
    );
  }
}
