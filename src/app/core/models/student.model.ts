export interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  dni: string;
  grade: number;
  section: string;
  tablet?: string;
  classroom?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
