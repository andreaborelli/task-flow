import { Component, inject } from '@angular/core';
import { Header } from './shared/header/header';
import { TaskSummary } from './features/dashboard/task-summary/task-summary';
import { TaskList } from './features/dashboard/task-list/task-list';
import { TaskStore } from './core/services/task-store';

@Component({
  selector: 'app-root',
  imports: [Header, TaskSummary, TaskList],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly pageTitle = 'La tua dashboard';

  // inject chiede ad Angular l'istanza del servizio.
  readonly taskStore = inject(TaskStore);
}
