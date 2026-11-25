import { TestBed } from '@angular/core/testing';
import { TASK_LIST_CONFIG } from './task-list-config';

describe('TASK_LIST_CONFIG', () => {

  it('usa la configurazione predefinita', () => {
    TestBed.configureTestingModule({});

    const config = TestBed.inject(TASK_LIST_CONFIG);

    expect(config.showPriority).toBe(true);
    expect(config.emptyMessage).toBe(
      'Nessuna attività disponibile.'
    );
  });

  it('consente un override nel test', () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TASK_LIST_CONFIG,

          // useValue sostituisce la factory predefinita.
          useValue: {
            showPriority: false,
            emptyMessage: 'Vuoto'
          }
        }
      ]
    });

    const config = TestBed.inject(TASK_LIST_CONFIG);

    expect(config.showPriority).toBe(false);
    expect(config.emptyMessage).toBe('Vuoto');
  });

});