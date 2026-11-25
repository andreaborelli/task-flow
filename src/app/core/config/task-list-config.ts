import { InjectionToken } from '@angular/core';

// Definisce la struttura della configurazione.
export interface TaskListConfig {
  readonly showPriority: boolean;
  readonly emptyMessage: string;
}

// InjectionToken identifica una dipendenza
// che non è rappresentata da una classe.
export const TASK_LIST_CONFIG =
  new InjectionToken<TaskListConfig>(
    // Descrizione utile per il debug.
    // L'identità del token è l'oggetto creato
    // con new InjectionToken().
    'TASK_LIST_CONFIG',
    {
      // Rende disponibile la configurazione
      // a livello globale nell'applicazione.
      providedIn: 'root',

      // Factory restituisce la configurazione
      // predefinita quando Angular risolve il token.
      factory: () => ({
        showPriority: true,
        emptyMessage: 'Nessuna attività disponibile.'
      })
    }
  );