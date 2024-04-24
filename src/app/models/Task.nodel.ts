export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'undone';
  dateCreated: string;
  dateDue: string;
  dateCompleted: string;
}
