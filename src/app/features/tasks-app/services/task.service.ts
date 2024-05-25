import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskToAdd } from '../models/TaskToAdd.model';
import { Task } from '../models/Task.model';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService extends ApiService {
  apiName = 'Task';
  v = 1;

  getTasks(): Observable<Task[]> {
    return this.get<Task[]>('gettasks');
  }

  addTask(task: TaskToAdd): Observable<Task> {
    return this.post<Task>('addtask', task);
  }

  deleteTask(taskId: number): Observable<Task> {
    return this.delete<Task>(`deletetask?${taskId}`);
  }

  updateStatus(taskId: number): Observable<Task> {
    return this.put<Task>(`updatestatus?taskId=${taskId}`, taskId);
  }

  updateTask(task: Task): Observable<Task> {
    return this.put<Task>('updatetask', task);
  }
}
