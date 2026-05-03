import { useApp } from '../context/AppContext'
import { Users, GraduationCap, BookOpen, ClipboardCheck, TrendingUp, UserCheck } from 'lucide-react'
import Badge from '../components/ui/Badge'
import styles from './Dashboard.module.css'

export default function Dashboard() {
  const { students, teachers, classes, attendance } = useApp()

  const activeStudents = students.filter(s => s.status === 'Active').length
  const lastAttendance = attendance[attendance.length - 1]

  const stats = [
    { label: 'Total Students', value: students.length, sub: `${activeStudents} active`, icon: Users,           color: 'blue'  },
    { label: 'Total Teachers', value: teachers.length, sub: 'All active',               icon: GraduationCap,  color: 'green' },
    { label: 'Classes',        value: classes.length,  sub: 'Active classes',            icon: BookOpen,       color: 'purple'},
    { label: 'Attendance Records', value: attendance.length, sub: 'Sessions logged',   icon: ClipboardCheck, color: 'amber' },
  ]
return (
  <div>
    <h1 style={{color:'red'}}>Students: {students.length}</h1>
    {/* rest of your code */}
  </div>
)
  return (
    <div className={`${styles.page} page-enter`}>
      <p className={styles.welcome}>Welcome back! Here's what's happening today.</p>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {stats.map(stat => (
          <div key={stat.label} className={`${styles.statCard} ${styles[stat.color]}`}>
            <div className={styles.statIcon}><stat.icon size={20} /></div>
            <div>
              <p className={styles.statValue}>{stat.value}</p>
              <p className={styles.statLabel}>{stat.label}</p>
              <p className={styles.statSub}>{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.grid2}>
        {/* Recent Students */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <UserCheck size={16} />
            <h2>Recent Students</h2>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Grade</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.slice(-5).reverse().map(s => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td><Badge color="primary">{s.grade}</Badge></td>
                  <td><Badge color={s.status === 'Active' ? 'success' : 'neutral'}>{s.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Classes Summary */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <TrendingUp size={16} />
            <h2>Classes Overview</h2>
          </div>
          {classes.map(cls => {
            const classStudents = students.filter(s => s.classId === cls.id).length
            const teacher = teachers.find(t => t.id === cls.teacherId)
            const pct = Math.round((classStudents / cls.capacity) * 100)
            return (
              
              <div key={cls.id} className={styles.classRow}>
                <div>
                  <p className={styles.className}>{cls.name}</p>
                  <p className={styles.classTeacher}>{teacher ? teacher.name : 'No teacher assigned'}</p>
                </div>
              
                <div className={styles.classRight}>
                  <p className={styles.classCount}>{classStudents}/{cls.capacity}</p>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}