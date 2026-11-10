import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './shared/footer/footer';
import { Header } from './shared/header/header';
import { TaskSummary } from './features/dashboard/task-summary/task-summary';
import { TaskList } from './features/dashboard/task-list/task-list';

@Component({
  selector: 'app-root',
  // I componenti standalone usati nel template
  // devono essere dichiarati in imports.
  imports: [RouterOutlet, Header, TaskSummary, TaskList, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly pageTitle = 'La tua dashboard';
}
