export interface Friend {
  id: number;
  age: number;
  email: string;
  gender: 'unknown' | 'male' | 'female' | 'other';
  fName: string;
  lName: string;
  dateCreated: string;
  picture: string;
}
