export interface OnlineUser {
    id: string;
    age: number;
    email: string;
    gender: string;
  
    name: {
      first: string;
      last: string;
    };
    picture: {
      large: string;
      medium: string;
    };
    city: string;
  }