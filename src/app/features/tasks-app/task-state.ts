import { Injectable } from '@angular/core';
import { Task } from './models/Task.model';
import { Action, State, StateContext } from '@ngxs/store';
import { AddTaskAction, ToggleTaskAction } from './task-actions';

export interface TaskStateModel {
  items: Task[];
}

@State<TaskStateModel>({
  name: 'tasks',
  defaults: {
    items: [],
  },
})
@Injectable()
export class TaskState {
  @Action(AddTaskAction)
  addTask(ctx: StateContext<TaskStateModel>, action: AddTaskAction) {
    const { task } = action;
    if (!task) {
      return;
    }
    const state = ctx.getState();

    ctx.setState({
      ...state,
      items: [...state.items, task],
    });

    console.log('Updated state:', ctx.getState());
  }

  @Action(ToggleTaskAction)
  toggleTask(stx: StateContext<TaskStateModel>, action: ToggleTaskAction) {}
}
