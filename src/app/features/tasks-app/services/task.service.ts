import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskToAdd } from '../models/TaskToAdd.model';
import { Task } from '../models/Task.model';
import { SubtaskToAdd } from '../models/SubtaskToAdd.model';
import { FriendToAdd } from '../../friends-app/models/FriendToAdd.model';
import { Subtask } from '../models/Subtask.model';
import { Observable } from 'rxjs';
import { User } from '../../friends-app/components/friends-view.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskManagerApiService {
  constructor(private http: HttpClient) {}

  // USERS
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + 'api/v1/User/getusers');
  }

  getCurrentUser() {
    return this.http.get(environment.apiUrl + 'api/v1/User/getuser');
  }

  // TASK
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

  // SUBTASK
  getSubtasks() {
    return this.http.get(environment.apiUrl + 'api/v1/Subtask/getsubtasks');
  }

  addSubtask(subtask: SubtaskToAdd) {
    console.log('Http Posted subtask:', subtask);
    return this.http.post(
      environment.apiUrl + 'api/v1/Subtask/addsubtask',
      subtask
    );
  }

  deleteSubtask(subtaskId: number) {
    return this.http.delete(
      environment.apiUrl + `api/v1/Subtask/deletesubtask?taskId=${subtaskId}`
    );
  }

  updateStatusSubtask(subtaskId: number) {
    return this.http.put(
      environment.apiUrl + `api/v1/Subtask/updatestatus?taskId=${subtaskId}`,
      subtaskId
    );
  }

  updateSubtask(subtask: Subtask) {
    return this.http.put(
      environment.apiUrl + 'api/v1/Subtask/updatesubtask',
      subtask
    );
  }

  // FRIENDS

  addFriend(friendToAdd: FriendToAdd) {
    return this.http.post(
      environment.apiUrl + `api/v1/Friend/addfriend`,
      friendToAdd
    );
  }

  getFriends() {
    return this.http.get(environment.apiUrl + 'api/v1/Friend/getfriends');
  }

  deleteFriend(friendId: number) {
    return this.http.delete(
      environment.apiUrl + `api/v1/Friend/deletefriend?friendId=${friendId}`
    );
  }
}
