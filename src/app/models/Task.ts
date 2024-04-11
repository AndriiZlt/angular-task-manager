export interface Task {
  taskId: number;
  title: string;
  description: string;
  status: 'completed' | 'undone';
}
