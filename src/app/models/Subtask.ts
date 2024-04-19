export interface Subtask {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'undone';
  dateCreated: string;
  dateCompleted: string;
  taskId: number;
}
