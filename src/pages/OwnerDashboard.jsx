import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { Building2, Users, GraduationCap, DollarSign } from 'lucide-react'
import styles from './OwnerDashboard.module.css'

export default function OwnerDashboard() {
  const { branches, students, teachers, classes, payments } = useApp()
  const { currentUser } = useAuth()

  const totalRevenue = payments
    .filter((p) => p.status === 'Paid')
    .reduce((sum, p) => sum + p.amount, 0)

  const stats = [
    { label: 'Total Branches', value: branches.length, icon: Building2, color: 'purple' },
    { label: 'Total Teachers', value: teachers.length, icon: GraduationCap, color: 'blue' },
    { label: 'Total Students', value: students.length, icon: Users, color: 'green' },
    { label: 'Total Revenue', value: `K ${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'amber' },
  ]

  return (
    <div className={`${styles.page} page-enter`}>
      <p className={styles.welcome}>
        Welcome, {currentUser?.name}. Here's your school overview.
      </p>

      {/* Section 1: Overview */}
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

      {/* Section 2: Branches */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Branch Performance</h2>
        <div className={styles.card}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Branch</th>
                <th>Classes</th>
                <th>Teachers</th>
                <th>Students</th>
              </tr>
            </thead>
            <tbody>
              {branches.map((branch) => {
                const branchClasses = classes.filter((c) => c.branchId === branch.id)
                const branchTeachers = teachers.filter((t) => t.branchId === branch.id)
                const branchStudents = students.filter((s) => s.branchId === branch.id)
                return (
                  <tr key={branch.id}>
                    <td className={styles.name}>{branch.name}</td>
                    <td>{branchClasses.length}</td>
                    <td>{branchTeachers.length}</td>
                    <td>{branchStudents.length}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 3: Finance */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Financial Performance</h2>
        <div className={styles.card}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Branch</th>
                <th>Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              {branches.map((branch) => {
                const revenue = payments
                  .filter((p) => p.branchId === branch.id && p.status === 'Paid')
                  .reduce((sum, p) => sum + p.amount, 0)
                return (
                  <tr key={branch.id}>
                    <td className={styles.name}>{branch.name}</td>
                    <td className={styles.revenue}>K {revenue.toLocaleString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}