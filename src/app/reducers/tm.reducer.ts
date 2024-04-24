import { Action } from '@ngrx/store';
import { Subtask } from '../models/Subtask.model';
import * as SubtaskActions from './../actions/tm.actions';

export function sutaskReducer(
  state: Subtask[] = [],
  action: SubtaskActions.Actions
) {
  switch (action.type) {
    case SubtaskActions.ADD_SUBTASK:
      return [...state, action.payload];
    case SubtaskActions.REMOVE_SUBTASK:
      return [...state.filter((s) => s.id !== action.payload)];
    case SubtaskActions.UPDATE_SUBTASK:
      return [...action.payload];
    default:
      return state;
  }
}
