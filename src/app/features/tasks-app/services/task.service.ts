import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskToAdd } from '../models/TaskToAdd.model';
import { Task } from '../models/Task.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get(environment.apiUrl + 'api/v1/Task/gettasks');
  }

  addTask(task: TaskToAdd) {
    return this.http.post(environment.apiUrl + 'api/v1/Task/addtask', task);
  }

  deleteTask(taskId: number) {
    return this.http.delete(
      environment.apiUrl + `api/v1/Task/deletetask?taskId=${taskId}`
    );
  }

  updateStatus(taskId: number) {
    return this.http.put(
      environment.apiUrl + `api/v1/Task/updatestatus?taskId=${taskId}`,
      taskId
    );
  }

  updateTask(task: Task) {
    return this.http.put(environment.apiUrl + 'api/v1/Task/updatetask', task);
  }
}
