import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { ArrowLeft, User, Phone, BookOpen, CreditCard } from 'lucide-react'
import Badge from '../components/ui/Badge'
import styles from './StudentDetail.module.css'

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-ZM', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}

export default function StudentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { students, classes, branches, teachers, attendance, payments } = useApp()

  const student = students.find((s) => s.id === Number(id))

  if (!student) {
    return (
      <div className={styles.notFound}>
        <p>Student not found.</p>
        <button onClick={() => navigate('/students')} className={styles.backBtn}>
          ← Back to Students
        </button>
      </div>
    )
  }

  const cls = classes.find((c) => c.id === student.classId)
  const branch = branches.find((b) => b.id === student.branchId)
  const teacher = teachers.find((t) => t.id === cls?.teacherId)
  const studentPayments = payments.filter((p) => p.studentId === student.id)
  const studentAttendance = attendance.filter((a) =>
    a.records?.some((r) => r.studentId === student.id)
  )

  const totalPaid = studentPayments
    .filter((p) => p.status === 'Paid')
    .reduce((sum, p) => sum + p.amount, 0)

  const totalOutstanding = studentPayments
    .filter((p) => p.status === 'Outstanding')
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className={`${styles.page} page-enter`}>
      {/* Back button */}
      <button className={styles.backBtn} onClick={() => navigate('/students')}>
        <ArrowLeft size={16} /> Back to Students
      </button>

      {/* Profile Header */}
      <div className={styles.profileCard}>
        <div className={styles.avatar}>
          {student.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
        </div>
        <div className={styles.profileInfo}>
          <h1 className={styles.name}>{student.name}</h1>
          <div className={styles.profileMeta}>
            <Badge color={student.status === 'Active' ? 'success' : 'neutral'}>{student.status}</Badge>
            <span className={styles.metaItem}>📚 {cls?.name || '—'}</span>
            <span className={styles.metaItem}>🏫 {branch?.name || '—'}</span>
            <span className={styles.metaItem}>📅 Enrolled {formatDate(student.enrolledDate)}</span>
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
              <span className={styles.infoValue}>{student.name}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Grade</span>
              <span className={styles.infoValue}>{student.grade}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Gender</span>
              <span className={styles.infoValue}>{student.gender}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Status</span>
              <Badge color={student.status === 'Active' ? 'success' : 'neutral'}>{student.status}</Badge>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Enrolled</span>
              <span className={styles.infoValue}>{formatDate(student.enrolledDate)}</span>
            </div>
          </div>
        </div>

        {/* Parent & Contact */}
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <Phone size={16} />
            <h2>Parent & Contact</h2>
          </div>
          <div className={styles.infoList}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Parent Name</span>
              <span className={styles.infoValue}>{student.parent || '—'}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Phone</span>
              <span className={styles.infoValue}>{student.phone || '—'}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Branch</span>
              <span className={styles.infoValue}>{branch?.name || '—'}</span>
            </div>
          </div>
        </div>

        {/* Class Info */}
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <BookOpen size={16} />
            <h2>Class Information</h2>
          </div>
          <div className={styles.infoList}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Class</span>
              <span className={styles.infoValue}>{cls?.name || '—'}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Grade Level</span>
              <span className={styles.infoValue}>{cls?.grade || '—'}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Room</span>
              <span className={styles.infoValue}>{cls?.room || '—'}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Teacher</span>
              <span className={styles.infoValue}>{teacher?.name || '—'}</span>
            </div>
          </div>
        </div>

        {/* Payments Summary */}
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <CreditCard size={16} />
            <h2>Payment Summary</h2>
          </div>
          <div className={styles.infoList}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Total Paid</span>
              <span className={styles.paid}>K {totalPaid.toLocaleString()}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Outstanding</span>
              <span className={styles.outstanding}>K {totalOutstanding.toLocaleString()}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Transactions</span>
              <span className={styles.infoValue}>{studentPayments.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      {studentPayments.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Payment History</h2>
          <div className={styles.tableCard}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Payment ID</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {studentPayments.map((p) => (
                  <tr key={p.id}>
                    <td className={styles.mono}>{p.paymentId}</td>
                    <td>K {p.amount.toLocaleString()}</td>
                    <td>{formatDate(p.date)}</td>
                    <td><Badge color={p.status === 'Paid' ? 'success' : 'warning'}>{p.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}