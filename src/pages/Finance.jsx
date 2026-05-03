import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Search } from 'lucide-react'
import Badge from '../components/ui/Badge'
import styles from './ListPage.module.css'
import finStyles from './Finance.module.css'

export default function Finance() {
  const { payments, branches, students, classes } = useApp()
  const [search, setSearch] = useState('')
  const [branchFilter, setBranchFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filtered = payments.filter((p) => {
    const student = students.find((s) => s.id === p.studentId)
    const branch = branches.find((b) => b.id === p.branchId)
    const matchSearch =
      p.paymentId.toLowerCase().includes(search.toLowerCase()) ||
      (student?.name || '').toLowerCase().includes(search.toLowerCase())
    const matchBranch = branchFilter ? p.branchId === Number(branchFilter) : true
    const matchStatus = statusFilter ? p.status === statusFilter : true
    return matchSearch && matchBranch && matchStatus
  })

  const outstandingByBranch = branches.map((branch) => {
    const outstanding = payments.filter((p) => p.branchId === branch.id && p.status === 'Outstanding')
    const studentIds = [...new Set(outstanding.map((p) => p.studentId))]
    const totalBalance = outstanding.reduce((sum, p) => sum + p.amount, 0)
    return { branch, studentCount: studentIds.length, totalBalance }
  })

  return (
    <div className={`${styles.page} page-enter`}>
      {/* Section 1: Filters */}
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={16} className={styles.searchIcon} />
          <input
            placeholder="Search by payment ID or student"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <select
          className={finStyles.filter}
          value={branchFilter}
          onChange={(e) => setBranchFilter(e.target.value)}
        >
          <option value="">All Branches</option>
          {branches.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
        <select
          className={finStyles.filter}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option>Paid</option>
          <option>Outstanding</option>
        </select>
      </div>

      {/* Section 2: Payments */}
      <div className={styles.card}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Branch</th>
              <th>Student</th>
              <th>Class</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="7" className={styles.empty}>No payments found.</td></tr>
            ) : (
              filtered.map((p) => {
                const student = students.find((s) => s.id === p.studentId)
                const branch = branches.find((b) => b.id === p.branchId)
                const cls = classes.find((c) => c.id === p.classId)
                return (
                  <tr key={p.id}>
                    <td className={styles.name}>{p.paymentId}</td>
                    <td>{branch?.name || <span className={styles.muted}>—</span>}</td>
                    <td>{student?.name || <span className={styles.muted}>—</span>}</td>
                    <td>{cls?.name || <span className={styles.muted}>—</span>}</td>
                    <td className={finStyles.amount}>K {p.amount.toLocaleString()}</td>
                    <td>{p.date}</td>
                    <td>
                      <Badge color={p.status === 'Paid' ? 'success' : 'warning'}>{p.status}</Badge>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Section 3: Outstanding */}
      <div>
        <h2 className={finStyles.sectionTitle}>Outstanding Payments by Branch</h2>
        <div className={styles.card}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Branch</th>
                <th>Students Outstanding</th>
                <th>Total Balance</th>
              </tr>
            </thead>
            <tbody>
              {outstandingByBranch.map(({ branch, studentCount, totalBalance }) => (
                <tr key={branch.id}>
                  <td className={styles.name}>{branch.name}</td>
                  <td>{studentCount}</td>
                  <td className={finStyles.outstanding}>K {totalBalance.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}