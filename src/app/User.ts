export interface User {
  firstName: string;
  lastName: string;
  phone: string;
  account: {
    email: string;
    confirm: string;
  };
  comments: string;
  
  
}