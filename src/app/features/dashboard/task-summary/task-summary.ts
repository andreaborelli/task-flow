import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-task-summary',
  styleUrl: './task-summary.scss',
  templateUrl: './task-summary.html',
})
export class TaskSummary {

    readonly totalTasks = 20;
  readonly completedTasks = 8;

  get pendingTasks(): number {
    return this.totalTasks - this.completedTasks;
  }

}
