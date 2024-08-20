export interface User {
  id?:string;
  username: string;
  email: string;
  password: string;
  role: 'PLANNER' | 'CLIENT' | 'STAFF';
}

export interface Credentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  role: string;
  token: string;
  username: string;
  email:string;
  userId:string;

}
