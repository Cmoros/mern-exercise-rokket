export default interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export interface ComingUser {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  website?: string;
}