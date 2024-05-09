import { Subtask } from './models/Subtask.model';

export interface AppState {
  readonly subtask: Subtask[];
}
