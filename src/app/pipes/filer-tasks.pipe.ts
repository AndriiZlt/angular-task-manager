import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../app.component';

@Pipe({
  name: 'filter',
})
export class FilterTasksformPipe implements PipeTransform {
  transform(allTasks: Task[], filter: string) {
    switch (filter) {
      case 'all':
        return allTasks;
      case 'unfinished':
        return allTasks.filter((task) => task.completed === false);
      case 'completed':
        return allTasks.filter((task) => task.completed === true);

      default:
        return allTasks;
    }
  }
}
