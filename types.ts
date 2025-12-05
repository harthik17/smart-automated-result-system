export enum UserRole {
  GUEST = 'GUEST',
  ADMIN = 'ADMIN',
  FACULTY = 'FACULTY',
  STUDENT = 'STUDENT'
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  maxMarks: number;
  credits: number;
}

export interface StudentResult {
  subjectId: string;
  marksObtained: number;
  totalClasses: number;
  attendedClasses: number;
}

export interface Student {
  id: string;
  name: string;
  rollNo: string;
  email: string;
  semester: number;
  department: string;
  results: StudentResult[];
  remarks?: string; // AI Generated or Faculty Manual
}

export interface AppState {
  currentUser: {
    role: UserRole;
    id?: string;
    name?: string;
  } | null;
  students: Student[];
  subjects: Subject[];
}

export type View = 'HOME' | 'FEATURES' | 'ABOUT' | 'DASHBOARD';
