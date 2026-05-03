export const mockUsers = [
  {
    id: 1,
    name: 'System Owner',
    email: 'owner@school.zm',
    password: 'owner123',
    role: 'owner',
  },
  {
    id: 2,
    name: 'Branch Admin',
    email: 'admin@school.zm',
    password: 'admin123',
    role: 'branchadmin',
  },
  {
    id: 3,
    name: 'Finance Officer',
    email: 'finance@school.zm',
    password: 'finance123',
    role: 'finance',
  },
  {
    id: 4,
    name: 'Teacher User',
    email: 'teacher@school.zm',
    password: 'teacher123',
    role: 'teacher',
  },
  {
    id: 5,
    name: 'Student User',
    email: 'alice@school.zm',
    password: 'student123',
    role: 'student',
  },
  {
    id: 6,
    name: 'Parent User',
    email: 'parent@school.zm',
    password: 'parent123',
    role: 'parent',
  },
]

export const initialStudents = [
  {
    id: 1,
    name: 'Alice Banda',
    grade: 'Grade 10',
    gender: 'Female',
    status: 'Active',
    classId: 1,
    parent: 'Mr. Banda',
    phone: '0977-000-001',
  },
  {
    id: 2,
    name: 'Brian Mwale',
    grade: 'Grade 9',
    gender: 'Male',
    status: 'Active',
    classId: 1,
    parent: 'Mrs. Mwale',
    phone: '0977-000-002',
  },
  {
    id: 3,
    name: 'Chanda Phiri',
    grade: 'Grade 11',
    gender: 'Female',
    status: 'Active',
    classId: 2,
    parent: 'Mr. Phiri',
    phone: '0977-000-003',
  },
]

export const initialTeachers = [
  {
    id: 1,
    name: 'Mr. Joseph Mutale',
    subject: 'Mathematics',
    phone: '0977-111-001',
    email: 'j.mutale@school.zm',
    status: 'Active',
    classId: 1,
  },
  {
    id: 2,
    name: 'Mrs. Grace Tembo',
    subject: 'English',
    phone: '0977-111-002',
    email: 'g.tembo@school.zm',
    status: 'Active',
    classId: 2,
  },
]

export const initialClasses = [
  {
    id: 1,
    name: 'Grade 10A',
    grade: 'Grade 10',
    room: 'Room 101',
    teacherId: 1,
    capacity: 40,
  },
  {
    id: 2,
    name: 'Grade 9B',
    grade: 'Grade 9',
    room: 'Room 102',
    teacherId: 2,
    capacity: 35,
  },
]

export const initialAttendance = []

export const initialBranches = [
  {
    id: 1,
    name: 'Lusaka Main',
    location: 'Lusaka, Zambia',
    adminId: 2,
    phone: '0211-000-001',
    email: 'lusaka@school.zm',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Kitwe Branch',
    location: 'Kitwe, Zambia',
    adminId: null,
    phone: '0212-000-002',
    email: 'kitwe@school.zm',
    status: 'Active',
  },
]

export const initialPayments = [
  {
    id: 1,
    paymentId: 'MM-20240101-001',
    branchId: 1,
    studentId: 1,
    classId: 1,
    amount: 1500,
    date: '2024-01-15',
    status: 'Paid',
  },
  {
    id: 2,
    paymentId: 'MM-20240102-002',
    branchId: 1,
    studentId: 2,
    classId: 1,
    amount: 1500,
    date: '2024-01-16',
    status: 'Paid',
  },
  {
    id: 3,
    paymentId: 'MM-20240103-003',
    branchId: 2,
    studentId: 3,
    classId: 2,
    amount: 1200,
    date: '2024-01-17',
    status: 'Outstanding',
  },
]