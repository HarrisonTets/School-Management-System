export const initialStudents = [
  { id: 1, name: 'Alice Banda', grade: 'Grade 10', gender: 'Female', status: 'Active', classId: 1, parent: 'Mr. Banda', phone: '0977-000-001' },
  { id: 2, name: 'Brian Mwale', grade: 'Grade 9',  gender: 'Male',   status: 'Active', classId: 1, parent: 'Mrs. Mwale', phone: '0977-000-002' },
  { id: 3, name: 'Chanda Phiri', grade: 'Grade 11', gender: 'Female', status: 'Active', classId: 2, parent: 'Mr. Phiri', phone: '0977-000-003' },
]

export const initialTeachers = [
  { id: 1, name: 'Mr. Joseph Mutale', subject: 'Mathematics', phone: '0977-111-001', email: 'j.mutale@school.zm', status: 'Active', classId: 1 },
  { id: 2, name: 'Mrs. Grace Tembo',  subject: 'English',     phone: '0977-111-002', email: 'g.tembo@school.zm',  status: 'Active', classId: 2 },
]

export const initialClasses = [
  { id: 1, name: 'Grade 10A', grade: 'Grade 10', room: 'Room 101', teacherId: 1, capacity: 40 },
  { id: 2, name: 'Grade 9B',  grade: 'Grade 9',  room: 'Room 102', teacherId: 2, capacity: 35 },
]

export const initialAttendance = []