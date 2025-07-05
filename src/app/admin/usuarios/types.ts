export interface User {
  _id: string;
  nombre: string;
  email: string;
  role: string;
  activo?: boolean;
}
