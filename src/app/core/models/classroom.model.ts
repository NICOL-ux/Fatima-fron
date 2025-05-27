// src/app/core/models/classroom.model.ts
export interface Classroom {
  _id: string;
  name: string;
  grade: number;
  section: string;
  capacity: number;
  // ... otros campos según tu schema
}