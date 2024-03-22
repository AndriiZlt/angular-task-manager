import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskManagerService {
  constructor() {}

  private eventSubject = new BehaviorSubject<any>(undefined);

  triggerEvent(param: any): void {
    console.log('triggered event', param);
    this.eventSubject.next(param);
  }

  getEvent(): BehaviorSubject<any> {
    return this.eventSubject;
  }
}
