import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { ArrowLeft, Users, GraduationCap, BookOpen } from 'lucide-react'
import Badge from '../components/ui/Badge'
import styles from './BranchDetail.module.css'

export default function BranchDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { branches, students, teachers, classes } = useApp()

  const branch = branches.find((b) => b.id === Number(id))

  if (!branch) {
    return (
      <div className={styles.notFound}>
        <p>Branch not found.</p>
        <button onClick={() => navigate('/branches')} className={styles.backBtn}>
          ← Back to Branches
        </button>
      </div>
    )
  }

  const branchTeachers = teachers.filter((t) => t.branchId === branch.id)
  const branchClasses = classes.filter((c) => c.branchId === branch.id)
  const branchStudents = students.filter((s) => s.branchId === branch.id)
  const admin = teachers.find((t) => t.id === branch.adminId)

  const stats = [
    { label: 'Teachers', value: branchTeachers.length, icon: GraduationCap, color: 'blue' },
    { label: 'Classes', value: branchClasses.length, icon: BookOpen, color: 'purple' },
    { label: 'Students', value: branchStudents.length, icon: Users, color: 'green' },
  ]

  return (
    <div className={`${styles.page} page-enter`}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <button className={styles.backBtn} onClick={() => navigate('/branches')}>
          <ArrowLeft size={16} /> Back to Branches
        </button>
        <div>
          <h1 className={styles.title}>{branch.name}</h1>
          <p className={styles.sub}>{branch.location} · Admin: {admin ? admin.name : '—'}</p>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className={`${styles.statCard} ${styles[stat.color]}`}>
              <div className={styles.statIcon}><Icon size={20} /></div>
              <div>
                <p className={styles.statValue}>{stat.value}</p>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Teachers */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Teachers</h2>
        <div className={styles.card}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {branchTeachers.length === 0 ? (
                <tr><td colSpan="5" className={styles.empty}>No teachers in this branch.</td></tr>
              ) : (
                branchTeachers.map((t) => (
                  <tr key={t.id}>
                    <td className={styles.name}>{t.name}</td>
                    <td><Badge color="purple">{t.subject}</Badge></td>
                    <td>{t.phone}</td>
                    <td>{t.email}</td>
                    <td><Badge color={t.status === 'Active' ? 'success' : 'neutral'}>{t.status}</Badge></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Classes */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Classes</h2>
        <div className={styles.card}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Class Name</th>
                <th>Grade</th>
                <th>Room</th>
                <th>Teacher</th>
                <th>Students</th>
                <th>Capacity</th>
              </tr>
            </thead>
            <tbody>
              {branchClasses.length === 0 ? (
                <tr><td colSpan="6" className={styles.empty}>No classes in this branch.</td></tr>
              ) : (
                branchClasses.map((c) => {
                  const teacher = teachers.find((t) => t.id === c.teacherId)
                  const count = students.filter((s) => s.classId === c.id).length
                  return (
                    <tr key={c.id}>
                      <td className={styles.name}>{c.name}</td>
                      <td>{c.grade}</td>
                      <td>{c.room}</td>
                      <td>{teacher ? teacher.name : <span className={styles.muted}>—</span>}</td>
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

      {/* Students */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Students</h2>
        <div className={styles.card}>
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
              {branchStudents.length === 0 ? (
                <tr><td colSpan="5" className={styles.empty}>No students in this branch.</td></tr>
              ) : (
                branchStudents.map((s) => {
                  const cls = classes.find((c) => c.id === s.classId)
                  return (
                    <tr key={s.id}>
                      <td className={styles.name}>{s.name}</td>
                      <td><Badge color="primary">{s.grade}</Badge></td>
                      <td>{s.gender}</td>
                      <td>{cls ? cls.name : <span className={styles.muted}>—</span>}</td>
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