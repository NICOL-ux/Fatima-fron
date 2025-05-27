export interface History {
  _id?: string;
  tabletCode: string;
  studentDni: string;
  studentName: string;
  action: string;
  previousStatus?: string;
  newStatus?: string;
  observation?: string;
  date: string; // o Date
  createdAt?: string;
  updatedAt?: string;
}
