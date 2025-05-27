export interface History {
  _id: string;
  entityId: string;
  entityType: 'Student' | 'Tablet' | 'Classroom' | 'User';
  action: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}
