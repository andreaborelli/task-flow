
import { Component } from '@angular/core';
import { MOCK_TASKS } from '../../../data/mock-tasks';
import type { Task } from '../../../models/task.model';

@Component({
  selector: 'app-task-summary',
  templateUrl: './task-summary.html',
  styleUrl: './task-summary.scss'
})
export class TaskSummary {

  // Crea copie dei dati mock originali.
  tasks: Task[] = MOCK_TASKS.map(task => ({ ...task }));

  // Controlla la visibilità del messaggio.
  showMessage = false;

  // Restituisce il numero totale delle attività.
  get totalTasks(): number {
    return this.tasks.length;
  }

  // Conta le attività completate.
  get completedTasks(): number {
    return this.tasks.filter(
      task => task.status === 'completed'
    ).length;
  }

  // Conta le attività ancora da completare.
  get pendingTasks(): number {
    return this.tasks.filter(
      task => task.status !== 'completed'
    ).length;
  }

  // Conta le attività con priorità alta.
  get highPriorityTasks(): number {
    return this.tasks.filter(
      task => task.priority === 'high'
    ).length;
  }

  // Verifica se lo stato corrente è diverso
  // dai dati mock originali.
  get hasChanges(): boolean {
    return JSON.stringify(this.tasks) !==
      JSON.stringify(MOCK_TASKS);
  }

  // Completa la prima attività disponibile.
  completeNextTask(): void {
    const index = this.tasks.findIndex(
      task => task.status !== 'completed'
    );

    if (index === -1) {
      return;
    }

    // map crea un nuovo array senza modificare
    // direttamente gli oggetti esistenti.
    this.tasks = this.tasks.map((task, taskIndex) =>
      taskIndex === index
        ? { ...task, status: 'completed' }
        : task
    );

    this.showMessage = true;
  }

  // Nasconde il messaggio di conferma.
  dismissMessage(): void {
    this.showMessage = false;
  }

  // Ripristina i dati mock originali.
  restoreTasks(): void {

    // Crea nuove copie degli oggetti iniziali.
    this.tasks = MOCK_TASKS.map(task => ({ ...task }));

    // Nasconde il messaggio di conferma.
    this.showMessage = false;
  }
}
