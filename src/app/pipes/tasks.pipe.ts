import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../pages/tasks-view/task/task.component';

enum TaskFilterValue {
  'all' = 1,
  'unfinished' = 2,
  'completed' = 3,
}

@Pipe({
  name: 'filter',
})
export class TasksPipe implements PipeTransform {
  transform(allTasks: Task[], filter: TaskFilterValue): Task[] {
    switch (filter) {
      case TaskFilterValue.all:
        return allTasks;
      case TaskFilterValue.unfinished:
        return allTasks.filter((task) => task.status === 'undone');
      case TaskFilterValue.completed:
        return allTasks.filter((task) => task.status === 'completed');

      default:
        return allTasks;
    }
  }
}
