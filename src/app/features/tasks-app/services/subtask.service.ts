import { Injectable } from '@angular/core';
import { SubtaskToAdd } from '../models/SubtaskToAdd.model';
import { Subtask } from '../models/Subtask.model';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class SubtaskApiService extends ApiService {
  apiName = 'Subtask';
  v = 1;

  getSubtasks(): Observable<Subtask[]> {
    return this.get<Subtask[]>('getsubtasks');
  }

  addSubtask<Subtask>(subtask: SubtaskToAdd): Observable<Subtask> {
    console.log('Http Posted subtask:', subtask);
    return this.post<Subtask>('addsubtask', subtask);
  }

  deleteSubtask<Subtask>(subtaskId: number): Observable<Subtask> {
    return this.delete<Subtask>(`deletesubtask?taskId=${subtaskId}`);
  }

  updateStatusSubtask<Subtask>(subtaskId: number): Observable<Subtask> {
    return this.put<Subtask>(`updatestatus?taskId=${subtaskId}`, subtaskId);
  }

  updateSubtask<Subtask>(subtask: Subtask): Observable<Subtask> {
    return this.put<Subtask>('updatesubtask', subtask);
  }
}
