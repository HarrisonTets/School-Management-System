import { createContext, useContext, useState } from 'react'
import {
  initialStudents,
  initialTeachers,
  initialClasses,
  initialAttendance,
  initialBranches,
  initialPayments,
} from '../data/mockData'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [students, setStudents] = useState(initialStudents)
  const [teachers, setTeachers] = useState(initialTeachers)
  const [classes, setClasses] = useState(initialClasses)
  const [attendance, setAttendance] = useState(initialAttendance)
  const [branches, setBranches] = useState(initialBranches)
  const [payments, setPayments] = useState(initialPayments)

  function addStudent(student) {
    setStudents((prev) => [...prev, { ...student, id: Date.now(), enrolledDate: new Date().toISOString().split('T')[0] }])
  }
  function deleteStudent(id) { setStudents((prev) => prev.filter((s) => s.id !== id)) }
  function updateStudent(id, updates) { setStudents((prev) => prev.map((s) => s.id === id ? { ...s, ...updates } : s)) }

  function addTeacher(teacher) { setTeachers((prev) => [...prev, { ...teacher, id: Date.now() }]) }
  function deleteTeacher(id) { setTeachers((prev) => prev.filter((t) => t.id !== id)) }

  function addClass(cls) { setClasses((prev) => [...prev, { ...cls, id: Date.now() }]) }
  function deleteClass(id) { setClasses((prev) => prev.filter((c) => c.id !== id)) }

  function saveAttendance(record) {
    setAttendance((prev) => {
      const exists = prev.find((a) => a.date === record.date && a.classId === record.classId)
      if (exists) return prev.map((a) => a.date === record.date && a.classId === record.classId ? record : a)
      return [...prev, { ...record, id: Date.now() }]
    })
  }

  function addBranch(branch) { setBranches((prev) => [...prev, { ...branch, id: Date.now() }]) }
  function updateBranch(id, updates) { setBranches((prev) => prev.map((b) => b.id === id ? { ...b, ...updates } : b)) }
  function deleteBranch(id) { setBranches((prev) => prev.filter((b) => b.id !== id)) }

  return (
    <AppContext.Provider
      value={{
        students, teachers, classes, attendance, branches, payments,
        addStudent, deleteStudent, updateStudent,
        addTeacher, deleteTeacher,
        addClass, deleteClass,
        saveAttendance,
        addBranch, updateBranch, deleteBranch,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}