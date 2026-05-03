/* ============================================================
   LOGIN PAGE — src/pages/LoginPage.jsx
   ============================================================ */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { School, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const { login, error } = useAuth()
  const navigate = useNavigate()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading,  setLoading]  = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const success = login(email, password)
    setLoading(false)
    if (success) navigate('/')
  }

  // Quick login helpers for testing
  const quickLogins = [
    { label: 'Owner',        email: 'owner@school.zm',   password: 'owner123',   color: '#7c3aed' },
    { label: 'Branch Admin', email: 'admin@school.zm',   password: 'admin123',   color: '#2563eb' },
    { label: 'Finance',      email: 'finance@school.zm', password: 'finance123', color: '#16a34a' },
    { label: 'Teacher',      email: 'teacher@school.zm', password: 'teacher123', color: '#d97706' },
    { label: 'Student',      email: 'alice@school.zm',   password: 'student123', color: '#0891b2' },
    { label: 'Parent',       email: 'parent@school.zm',  password: 'parent123',  color: '#db2777' },
  ]

  return (
    <div className={styles.page}>
      {/* Left Panel */}
      <div className={styles.left}>
        <div className={styles.leftContent}>
          <div className={styles.logoWrap}>
            <School size={40} color="#fff" />
          </div>
          <h1 className={styles.brand}>EduManage</h1>
          <p className={styles.tagline}>Smart School Management System</p>
          <div className={styles.features}>
            {['Manage students & teachers', 'Track attendance & grades', 'Monitor fees & finance', 'Role-based secure access'].map(f => (
              <div key={f} className={styles.feature}>
                <span className={styles.featureDot} />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className={styles.right}>
        <div className={styles.formWrap}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Welcome back</h2>
            <p className={styles.formSub}>Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {error && <div className={styles.errorBox}>{error}</div>}

            <div className={styles.field}>
              <label className={styles.label}>Email Address</label>
              <div className={styles.inputWrap}>
                <Mail size={16} className={styles.inputIcon} />
                <input
                  type="email"
                  className={styles.input}
                  placeholder="name@school.zm"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <div className={styles.inputWrap}>
                <Lock size={16} className={styles.inputIcon} />
                <input
                  type={showPass ? 'text' : 'password'}
                  className={`${styles.input} ${styles.inputPad}`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPass(p => !p)}
                  aria-label="Toggle password visibility"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          {/* Quick Login for Testing */}
          <div className={styles.quickSection}>
            <p className={styles.quickLabel}>Quick login (for testing)</p>
            <div className={styles.quickGrid}>
              {quickLogins.map(q => (
                <button
                  key={q.label}
                  className={styles.quickBtn}
                  style={{ borderColor: q.color, color: q.color }}
                  onClick={() => { setEmail(q.email); setPassword(q.password) }}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}