import { Student, Subject } from './types';

export const MOCK_SUBJECTS: Subject[] = [
  { id: 'sub1', name: 'Advanced Mathematics', code: 'MAT-301', maxMarks: 100, credits: 4 },
  { id: 'sub2', name: 'Computer Networks', code: 'CS-302', maxMarks: 100, credits: 3 },
  { id: 'sub3', name: 'Database Management', code: 'CS-303', maxMarks: 100, credits: 4 },
  { id: 'sub4', name: 'Software Engineering', code: 'CS-304', maxMarks: 100, credits: 3 },
  { id: 'sub5', name: 'Artificial Intelligence', code: 'CS-305', maxMarks: 100, credits: 3 },
];

export const MOCK_STUDENTS: Student[] = [
  {
    id: 'stu1',
    name: 'Alex Johnson',
    rollNo: '2023-CS-001',
    email: 'alex@uni.edu',
    semester: 5,
    department: 'Computer Science',
    results: [
      { subjectId: 'sub1', marksObtained: 85, totalClasses: 40, attendedClasses: 38 },
      { subjectId: 'sub2', marksObtained: 72, totalClasses: 35, attendedClasses: 30 },
      { subjectId: 'sub3', marksObtained: 91, totalClasses: 40, attendedClasses: 40 },
      { subjectId: 'sub4', marksObtained: 68, totalClasses: 35, attendedClasses: 25 }, // Low attendance
      { subjectId: 'sub5', marksObtained: 88, totalClasses: 35, attendedClasses: 34 },
    ],
    remarks: "Excellent performance in Mathematics and Databases. Attendance in Software Engineering needs improvement."
  },
  {
    id: 'stu2',
    name: 'Sarah Williams',
    rollNo: '2023-CS-002',
    email: 'sarah@uni.edu',
    semester: 5,
    department: 'Computer Science',
    results: [
      { subjectId: 'sub1', marksObtained: 45, totalClasses: 40, attendedClasses: 35 },
      { subjectId: 'sub2', marksObtained: 60, totalClasses: 35, attendedClasses: 32 },
      { subjectId: 'sub3', marksObtained: 55, totalClasses: 40, attendedClasses: 38 },
      { subjectId: 'sub4', marksObtained: 70, totalClasses: 35, attendedClasses: 33 },
      { subjectId: 'sub5', marksObtained: 65, totalClasses: 35, attendedClasses: 31 },
    ],
    remarks: "Average performance. Consistent effort is needed in Mathematics to improve grades."
  },
  {
    id: 'stu3',
    name: 'Michael Chen',
    rollNo: '2023-CS-003',
    email: 'michael@uni.edu',
    semester: 5,
    department: 'Computer Science',
    results: [
      { subjectId: 'sub1', marksObtained: 95, totalClasses: 40, attendedClasses: 39 },
      { subjectId: 'sub2', marksObtained: 92, totalClasses: 35, attendedClasses: 34 },
      { subjectId: 'sub3', marksObtained: 89, totalClasses: 40, attendedClasses: 38 },
      { subjectId: 'sub4', marksObtained: 90, totalClasses: 35, attendedClasses: 35 },
      { subjectId: 'sub5', marksObtained: 94, totalClasses: 35, attendedClasses: 35 },
    ],
    remarks: "Outstanding academic performance across all subjects. Keep up the great work!"
  }
];
