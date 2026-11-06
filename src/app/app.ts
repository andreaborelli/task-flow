import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { TaskSummary } from './features/dashboard/task-summary/task-summary';
import { Footer } from './shared/footer/footer';

@Component({
  imports: [RouterOutlet, Header, TaskSummary, Footer],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
readonly pageTitle = 'La tua dashboard';
  }
