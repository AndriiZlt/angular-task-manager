import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskChangeService {
  constructor() {}

  private eventSubject = new BehaviorSubject<any>(undefined);

  triggerEvent(param: any): void {
    this.eventSubject.next(param);
  }

  getEvent(): BehaviorSubject<any> {
    return this.eventSubject;
  }
}
