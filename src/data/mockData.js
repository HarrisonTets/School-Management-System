export const initialStudents = [
  { id: 1, name: 'Alice Banda', grade: 'Grade 8', gender: 'Female', parent: 'Mrs. Banda', phone: '0977-111-222', status: 'Active', classId: 1, enrolledDate: '2024-01-15' },
  { id: 2, name: 'Brian Mwale', grade: 'Grade 8', gender: 'Male', parent: 'Mr. Mwale', phone: '0966-333-444', status: 'Active', classId: 1, enrolledDate: '2024-01-15' },
  { id: 3, name: 'Chanda Phiri', grade: 'Grade 9', gender: 'Female', parent: 'Mr. Phiri', phone: '0955-555-666', status: 'Active', classId: 2, enrolledDate: '2024-01-16' },
]

export const initialTeachers = [
  { id: 1, name: 'Mr. Joseph Mutale', subject: 'Mathematics', phone: '0977-100-200', email: 'j.mutale@school.zm', status: 'Active', classId: 1 },
  { id: 2, name: 'Mrs. Grace Lungu', subject: 'English', phone: '0966-300-400', email: 'g.lungu@school.zm', status: 'Active', classId: 2 },
]

export const initialClasses = [
  { id: 1, name: 'Grade 8A', grade: 'Grade 8', room: 'Room 101', teacherId: 1, capacity: 40 },
  { id: 2, name: 'Grade 9B', grade: 'Grade 9', room: 'Room 205', teacherId: 2, capacity: 40 },
]

export const initialAttendance = []
export const mockUsers = [
  { id: 1, name: 'Harrison Tets',    role: 'owner',        email: 'owner@school.zm',   password: 'owner123',   studentId: null, teacherId: null },
  { id: 2, name: 'Admin User',       role: 'branch_admin', email: 'admin@school.zm',   password: 'admin123',   studentId: null, teacherId: null },
  { id: 3, name: 'Finance User',     role: 'finance',      email: 'finance@school.zm', password: 'finance123', studentId: null, teacherId: null },
  { id: 4, name: 'Mr. Joseph Mutale',role: 'teacher',      email: 'teacher@school.zm', password: 'teacher123', studentId: null, teacherId: 1    },
  { id: 5, name: 'Alice Banda',      role: 'student',      email: 'alice@school.zm',   password: 'student123', studentId: 1,    teacherId: null },
  { id: 6, name: 'Mrs. Banda',       role: 'parent',       email: 'parent@school.zm',  password: 'parent123',  studentId: null, teacherId: null, childId: 1 },
]