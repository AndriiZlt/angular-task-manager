import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubtaskToAdd } from '../models/SubtaskToAdd.model';
import { Subtask } from '../models/Subtask.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubtaskApiService {
  readonly rootURL = `${environment.apiUrl}api`;

  constructor(private http: HttpClient) {}

  getSubtasks() {
    return this.http.get(this.rootURL + '/v1/Subtask/getsubtasks');
  }

  addSubtask(subtask: SubtaskToAdd) {
    console.log('Http Posted subtask:', subtask);
    return this.http.post(this.rootURL + '/v1/Subtask/addsubtask', subtask);
  }

  deleteSubtask(subtaskId: number) {
    return this.http.delete(
      this.rootURL + `/v1/Subtask/deletesubtask?taskId=${subtaskId}`
    );
  }

  updateStatusSubtask(subtaskId: number) {
    return this.http.put(
      this.rootURL + `/v1/Subtask/updatestatus?taskId=${subtaskId}`,
      subtaskId
    );
  }

  updateSubtask(subtask: Subtask) {
    return this.http.put(this.rootURL + '/v1/Subtask/updatesubtask', subtask);
  }
}
