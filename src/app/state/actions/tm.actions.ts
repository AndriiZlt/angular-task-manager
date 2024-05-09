import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Subtask } from '../../models/Subtask.model';

export const ADD_SUBTASK = '[SUBTASK] Add';

export const REMOVE_SUBTASK = '[SUBTASK] Remove';

export const UPDATE_SUBTASK = '[SUBTASK] Update';

export class AddSubtask implements Action {
  readonly type = ADD_SUBTASK;
  constructor(public payload: Subtask) {}
}

export class RemoveSubtask implements Action {
  readonly type = REMOVE_SUBTASK;
  constructor(public payload: number) {}
}

export class UpdateSubtask implements Action {
  readonly type = UPDATE_SUBTASK;
  constructor(public payload: Subtask[]) {}
}

export type Actions = AddSubtask | RemoveSubtask | UpdateSubtask;
