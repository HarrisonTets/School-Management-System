import { useLocation } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import styles from './Header.module.css'

const PAGE_TITLES = {
  '/': 'Dashboard',
  '/dashboard': 'Dashboard',
  '/owner-dashboard': 'Dashboard',
  '/branches': 'Branches',
  '/students': 'Students',
  '/teachers': 'Teachers',
  '/classes': 'Classes',
  '/attendance': 'Attendance',
  '/finance': 'Finance',
}

export default function Header() {
  const { pathname } = useLocation()
  const { currentUser } = useAuth()

  const title =
  PAGE_TITLES[pathname] ||
  (pathname.startsWith('/branches/') ? 'Branch Detail' : '') ||
  (pathname.startsWith('/students/') ? 'Student Profile' : 'School Management')
  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.date}>
          {new Date().toLocaleDateString('en-ZM', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
      <div className={styles.actions}>
        <button className={styles.iconBtn} aria-label="Notifications">
          <Bell size={18} />
        </button>
        {currentUser && (
          <div className={styles.greeting}>
            👋 <span>Hi, {currentUser.name.split(' ')[0]}</span>
          </div>
        )}
      </div>
    </header>
  )
}