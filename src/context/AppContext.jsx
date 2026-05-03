/* ============================================================
   APP CONTEXT — src/context/AppContext.jsx
   This is the "brain" of the app. All data lives here.
   Any page can read or update this data.
   ============================================================ */
import { createContext, useContext, useState } from 'react'
import {
  initialStudents,
  initialTeachers,
  initialClasses,
  initialAttendance,
} from '../data/mockData'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [students,   setStudents]   = useState(initialStudents)
  const [teachers,   setTeachers]   = useState(initialTeachers)
  const [classes,    setClasses]    = useState(initialClasses)
  const [attendance, setAttendance] = useState(initialAttendance)

  // --- STUDENT ACTIONS ---
  function addStudent(student) {
    const newStudent = { ...student, id: Date.now(), enrolledDate: new Date().toISOString().split('T')[0] }
    setStudents(prev => [...prev, newStudent])
  }
  function deleteStudent(id) {
    setStudents(prev => prev.filter(s => s.id !== id))
  }
  function updateStudent(id, updates) {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s))
  }

  // --- TEACHER ACTIONS ---
  function addTeacher(teacher) {
    setTeachers(prev => [...prev, { ...teacher, id: Date.now() }])
  }
  function deleteTeacher(id) {
    setTeachers(prev => prev.filter(t => t.id !== id))
  }

  // --- CLASS ACTIONS ---
  function addClass(cls) {
    setClasses(prev => [...prev, { ...cls, id: Date.now() }])
  }
  function deleteClass(id) {
    setClasses(prev => prev.filter(c => c.id !== id))
  }

  // --- ATTENDANCE ACTIONS ---
  function saveAttendance(record) {
    setAttendance(prev => {
      const exists = prev.find(a => a.date === record.date && a.classId === record.classId)
      if (exists) return prev.map(a => a.date === record.date && a.classId === record.classId ? record : a)
      return [...prev, { ...record, id: Date.now() }]
    })
  }

  return (
    <AppContext.Provider value={{
      students, addStudent, deleteStudent, updateStudent,
      teachers, addTeacher, deleteTeacher,
      classes,  addClass,  deleteClass,
      attendance, saveAttendance,
    }}>
      {children}
    </AppContext.Provider>
  )
}

// Custom hook — use this in any page: const { students } = useApp()
export function useApp() {
  return useContext(AppContext)
}