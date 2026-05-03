import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, GraduationCap,
  BookOpen, ClipboardCheck, School, LogOut
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import styles from './Sidebar.module.css'

// Define which roles can see each nav item
const NAV_ITEMS = [
  { to: '/',           icon: LayoutDashboard, label: 'Dashboard',  roles: ['owner','branch_admin','finance','teacher','student','parent'] },
  { to: '/students',   icon: Users,           label: 'Students',   roles: ['owner','branch_admin','finance','teacher'] },
  { to: '/teachers',   icon: GraduationCap,   label: 'Teachers',   roles: ['owner','branch_admin','finance'] },
  { to: '/classes',    icon: BookOpen,        label: 'Classes',    roles: ['owner','branch_admin','teacher'] },
  { to: '/attendance', icon: ClipboardCheck,  label: 'Attendance', roles: ['owner','branch_admin','teacher'] },
]

const ROLE_COLORS = {
  owner:        '#7c3aed',
  branch_admin: '#2563eb',
  finance:      '#16a34a',
  teacher:      '#d97706',
  student:      '#0891b2',
  parent:       '#db2777',
}

const ROLE_LABELS = {
  owner:        'School Owner',
  branch_admin: 'Branch Admin',
  finance:      'Finance',
  teacher:      'Teacher',
  student:      'Student',
  parent:       'Parent',
}

export default function Sidebar() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  // Only show nav items the current user's role can access
  const visibleItems = NAV_ITEMS.filter(item =>
    currentUser && item.roles.includes(currentUser.role)
  )

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo}>
        <School size={24} />
        <span>EduManage</span>
      </div>

      {/* Role Badge */}
      {currentUser && (
        <div className={styles.roleBadge} style={{ background: ROLE_COLORS[currentUser.role] + '22', borderColor: ROLE_COLORS[currentUser.role] + '44' }}>
          <span className={styles.roleDot} style={{ background: ROLE_COLORS[currentUser.role] }} />
          <span style={{ color: ROLE_COLORS[currentUser.role] }}>{ROLE_LABELS[currentUser.role]}</span>
        </div>
      )}

      {/* Navigation */}
      <nav className={styles.nav}>
        <p className={styles.navLabel}>MAIN MENU</p>
        {visibleItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className={styles.footer}>
        {currentUser && (
          <div className={styles.userRow}>
            <div className={styles.userAvatar} style={{ background: ROLE_COLORS[currentUser.role] }}>
              {currentUser.name.charAt(0)}
            </div>
            <div className={styles.userInfo}>
              <p className={styles.userName}>{currentUser.name}</p>
              <p className={styles.userEmail}>{currentUser.email}</p>
            </div>
          </div>
        )}
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}