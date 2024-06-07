import { Task } from './models/Task.model';

export class AddTaskAction {
  static readonly type = '[TASK page] Add task';
  constructor(public task: Task) {}
}

export class ToggleTaskAction {
  static readonly type = '[TASK page] Toggle task';
  constructor(public id: number) {}
}
