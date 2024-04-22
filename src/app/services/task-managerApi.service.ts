import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskToAdd } from '../models/TaskToAdd';
import { Task } from '../models/Task';
import { SubtaskToAdd } from '../models/SubtaskToAdd';
import { FriendToAdd } from '../models/FriendToAdd';

@Injectable({
  providedIn: 'root',
})
export class TaskManagerApiService {
  readonly rootURL = 'https://localhost:7027/api';

  constructor(private http: HttpClient) {}

  // Tasks
  getTasks() {
    return this.http.get(this.rootURL + '/v1/Task/gettasks');
  }

  addTask(task: TaskToAdd) {
    console.log('Http Posted task:', task);
    return this.http.post(this.rootURL + '/v1/Task/addtask', task);
  }

  deleteTask(taskId: number) {
    return this.http.delete(
      this.rootURL + `/v1/Task/deletetask?taskId=${taskId}`
    );
  }

  updateStatus(taskId: number) {
    return this.http.put(
      this.rootURL + `/v1/Task/updatestatus?taskId=${taskId}`,
      taskId
    );
  }

  updateTask(task: Task) {
    return this.http.put(this.rootURL + '/v1/Task/updatetask', task);
  }

  // SubTasks
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

  // FRIENDS

  addFriend(friendToAdd: FriendToAdd) {
    return this.http.post(this.rootURL + `/v1/Friend/addfriend`, friendToAdd);
  }

  getFriends() {
    return this.http.get(this.rootURL + '/v1/Friend/getfriends');
  }

  deleteFriend(friendId: number) {
    return this.http.delete(
      this.rootURL + `/v1/Friend/deletefriend?friendId=${friendId}`
    );
  }
}
