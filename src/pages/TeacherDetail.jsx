import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { ArrowLeft, User, Phone, BookOpen, Users } from 'lucide-react'
import Badge from '../components/ui/Badge'
import styles from './TeacherDetail.module.css'

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-ZM', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}

export default function TeacherDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { teachers, classes, students, branches } = useApp()

  const teacher = teachers.find((t) => t.id === Number(id))

  if (!teacher) {
    return (
      <div className={styles.notFound}>
        <p>Teacher not found.</p>
        <button onClick={() => navigate('/teachers')} className={styles.backBtn}>
          ← Back to Teachers
        </button>
      </div>
    )
  }

  const branch = branches.find((b) => b.id === teacher.branchId)
  const teacherClasses = classes.filter((c) => c.teacherId === teacher.id)
  const teacherStudents = students.filter((s) =>
    teacherClasses.some((c) => c.id === s.classId)
  )

  const initials = teacher.name
    .split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className={`${styles.page} page-enter`}>
      {/* Back */}
      <button className={styles.backBtn} onClick={() => navigate('/teachers')}>
        <ArrowLeft size={16} /> Back to Teachers
      </button>

      {/* Profile Header */}
      <div className={styles.profileCard}>
        <div className={styles.avatar}>{initials}</div>
        <div className={styles.profileInfo}>
          <h1 className={styles.name}>{teacher.name}</h1>
          <div className={styles.profileMeta}>
            <Badge color="purple">{teacher.subject}</Badge>
            <Badge color={teacher.status === 'Active' ? 'success' : 'neutral'}>{teacher.status}</Badge>
            {teacher.employeeId && <span className={styles.metaItem}>🪪 {teacher.employeeId}</span>}
            <span className={styles.metaItem}>🏫 {branch?.name || '—'}</span>
            <span className={styles.metaItem}>📅 Joined {formatDate(teacher.joinedDate)}</span>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Personal Info */}
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <User size={16} />
            <h2>Personal Information</h2>
          </div>
          <div className={styles.infoList}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Full Name</span>
              <span className={styles.infoValue}>{teacher.name}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Employee ID</span>
              <span className={styles.infoValue}>{teacher.employeeId || '—'}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Subject</span>
              <Badge color="purple">{teacher.subject}</Badge>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Status</span>
              <Badge color={teacher.status === 'Active' ? 'success' : 'neutral'}>{teacher.status}</Badge>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Joined</span>
              <span className={styles.infoValue}>{formatDate(teacher.joinedDate)}</span>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <Phone size={16} />
            <h2>Contact Information</h2>
          </div>
          <div className={styles.infoList}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Phone</span>
              <span className={styles.infoValue}>{teacher.phone || '—'}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Email</span>
              <span className={styles.infoValue}>{teacher.email || '—'}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Branch</span>
              <span className={styles.infoValue}>{branch?.name || '—'}</span>
            </div>
          </div>
        </div>

        {/* Teaching Summary */}
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <BookOpen size={16} />
            <h2>Teaching Summary</h2>
          </div>
          <div className={styles.infoList}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Classes Assigned</span>
              <span className={styles.infoValue}>{teacherClasses.length}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Total Students</span>
              <span className={styles.infoValue}>{teacherStudents.length}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Subject</span>
              <span className={styles.infoValue}>{teacher.subject || '—'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Classes Table */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Classes Assigned</h2>
        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Class Name</th>
                <th>Grade</th>
                <th>Room</th>
                <th>Students</th>
                <th>Capacity</th>
              </tr>
            </thead>
            <tbody>
              {teacherClasses.length === 0 ? (
                <tr><td colSpan="5" className={styles.empty}>No classes assigned.</td></tr>
              ) : (
                teacherClasses.map((c) => {
                  const count = students.filter((s) => s.classId === c.id).length
                  return (
                    <tr key={c.id}>
                      <td className={styles.bold}>{c.name}</td>
                      <td>{c.grade}</td>
                      <td>{c.room}</td>
                      <td>{count}</td>
                      <td>{c.capacity}</td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Students Table */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Students</h2>
        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Grade</th>
                <th>Gender</th>
                <th>Class</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {teacherStudents.length === 0 ? (
                <tr><td colSpan="5" className={styles.empty}>No students found.</td></tr>
              ) : (
                teacherStudents.map((s) => {
                  const cls = classes.find((c) => c.id === s.classId)
                  return (
                    <tr key={s.id}>
                      <td className={styles.bold}>{s.name}</td>
                      <td>{s.grade}</td>
                      <td>{s.gender}</td>
                      <td>{cls?.name || '—'}</td>
                      <td><Badge color={s.status === 'Active' ? 'success' : 'neutral'}>{s.status}</Badge></td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}