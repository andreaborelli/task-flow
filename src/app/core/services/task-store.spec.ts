import { TestBed } from '@angular/core/testing';
import { TaskStore } from './task-store';

describe('TaskStore', () => {
  let store: TaskStore;

  beforeEach(() => {
    // Configura l'ambiente di Dependency Injection.
    TestBed.configureTestingModule({});

    // Recupera una nuova istanza per ciascun test.
    store = TestBed.inject(TaskStore);
  });

  it('completa un task e aggiorna il conteggio', () => {
    const openTask = store.tasks().find((task) => task.status !== 'completed');

    expect(openTask).toBeDefined();
    if (!openTask) return;

    const before = store.completedCount();

    store.completeTask(openTask.id);

    expect(store.completedCount()).toBe(before + 1);
  });

  it('ripristina i dati iniziali', () => {
    const initialCount = store.tasks().length;

    store.addDemoTask();

    expect(store.tasks().length).toBe(initialCount + 1);

    store.resetTasks();

    expect(store.tasks().length).toBe(initialCount);
  });
});
