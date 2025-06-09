export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;  // Opcional para evitar problemas al recibir usuarios
  role: 'admin' | 'user';
  createdAt?: string;
  updatedAt?: string;
}