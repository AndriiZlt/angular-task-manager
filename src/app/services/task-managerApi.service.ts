import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskToAdd } from '../models/TaskToAdd';

@Injectable({
  providedIn: 'root',
})
export class TaskManagerApiService {
  readonly rootURL = 'https://localhost:7027/api';

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get(this.rootURL + '/v1/Task/gettasks');
  }

  addTask(task: TaskToAdd) {
    return this.http.post(this.rootURL + '/v1/Task/addtask', task);
  }

  deleteTask(taskId: number) {
    return this.http.post(
      this.rootURL + `/v1/Task/deletetask?taskId=${taskId}`,
      taskId
    );
  }

  updateStatus(taskId: number) {
    return this.http.put(
      this.rootURL + `/v1/Task/updatestatus?taskId=${taskId}`,
      taskId
    );
  }
}
