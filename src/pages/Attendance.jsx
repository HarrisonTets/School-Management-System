import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Save } from 'lucide-react'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { Select } from '../components/ui/FormField'
import styles from './Attendance.module.css'

export default function Attendance() {
  const { classes, students, attendance, saveAttendance } = useApp()
  const today = new Date().toISOString().split('T')[0]
  const [selectedClass, setSelectedClass] = useState(classes[0]?.id || '')
  const [date,          setDate]          = useState(today)
  const [records,       setRecords]       = useState({})

  const classStudents = students.filter(s => s.classId === Number(selectedClass))

  // Load existing attendance when class/date changes
  function initRecords(classId, d) {
    const existing = attendance.find(a => a.classId === Number(classId) && a.date === d)
    if (existing) {
      const map = {}
      existing.records.forEach(r => { map[r.studentId] = r.status })
      setRecords(map)
    } else {
      const map = {}
      students.filter(s => s.classId === Number(classId)).forEach(s => { map[s.id] = 'Present' })
      setRecords(map)
    }
  }

  function handleClassChange(e) {
    setSelectedClass(e.target.value)
    initRecords(e.target.value, date)
  }
  function handleDateChange(e) {
    setDate(e.target.value)
    initRecords(selectedClass, e.target.value)
  }
  function setStatus(studentId, status) {
    setRecords(r => ({ ...r, [studentId]: status }))
  }
  function handleSave() {
    saveAttendance({
      date, classId: Number(selectedClass),
      records: Object.entries(records).map(([studentId, status]) => ({ studentId: Number(studentId), status }))
    })
    alert('Attendance saved!')
  }

  const presentCount = Object.values(records).filter(s => s === 'Present').length
  const absentCount  = Object.values(records).filter(s => s === 'Absent').length
  const lateCount    = Object.values(records).filter(s => s === 'Late').length

  return (
    <div className={`${styles.page} page-enter`}>
      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label className={styles.controlLabel}>Class</label>
          <Select value={selectedClass} onChange={handleClassChange} style={{ minWidth: 160 }}>
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </Select>
        </div>
        <div className={styles.controlGroup}>
          <label className={styles.controlLabel}>Date</label>
          <input type="date" value={date} onChange={handleDateChange} className={styles.dateInput} max={today} />
        </div>
        <Button icon={<Save size={16} />} onClick={handleSave} disabled={classStudents.length === 0}>
          Save Attendance
        </Button>
      </div>

      {/* Summary */}
      <div className={styles.summary}>
        <div className={styles.summaryCard}><span className={styles.summaryNum} style={{color:'var(--color-success)'}}>{presentCount}</span><span>Present</span></div>
        <div className={styles.summaryCard}><span className={styles.summaryNum} style={{color:'var(--color-danger)'}}>{absentCount}</span><span>Absent</span></div>
        <div className={styles.summaryCard}><span className={styles.summaryNum} style={{color:'var(--color-warning)'}}>{lateCount}</span><span>Late</span></div>
        <div className={styles.summaryCard}><span className={styles.summaryNum}>{classStudents.length}</span><span>Total</span></div>
      </div>

      {/* Attendance Table */}
      <div className={styles.card}>
        {classStudents.length === 0
          ? <p className={styles.empty}>No students in this class. Assign students first.</p>
          : (
            <table className={styles.table}>
              <thead>
                <tr><th>#</th><th>Student Name</th><th>Status</th><th>Mark</th></tr>
              </thead>
              <tbody>
                {classStudents.map((s, i) => (
                  <tr key={s.id}>
                    <td className={styles.num}>{i + 1}</td>
                    <td className={styles.name}>{s.name}</td>
                    <td>
                      <Badge color={
                        records[s.id] === 'Present' ? 'success' :
                        records[s.id] === 'Absent'  ? 'danger'  : 'warning'
                      }>{records[s.id] || 'Present'}</Badge>
                    </td>
                    <td>
                      <div className={styles.statusBtns}>
                        {['Present','Absent','Late'].map(status => (
                          <button
                            key={status}
                            className={`${styles.statusBtn} ${records[s.id] === status ? styles[status.toLowerCase()] : ''}`}
                            onClick={() => setStatus(s.id, status)}
                          >{status}</button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        }
      </div>
    </div>
  )
}