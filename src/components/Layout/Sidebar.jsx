import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, GraduationCap,
  BookOpen, ClipboardCheck, Building2, DollarSign, LogOut, School
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import styles from './Sidebar.module.css'

const NAV_ITEMS = [
  { to: '/dashboard',       icon: LayoutDashboard, label: 'Dashboard', roles: ['branch_admin','finance','teacher','student','parent'] },
  { to: '/owner-dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['owner'] },
  { to: '/branches',        icon: Building2,       label: 'Branches',  roles: ['owner'] },
  { to: '/students',        icon: Users,           label: 'Students',  roles: ['owner','branch_admin','finance','teacher'] },
  { to: '/teachers',        icon: GraduationCap,   label: 'Teachers',  roles: ['owner','branch_admin','finance'] },
  { to: '/classes',         icon: BookOpen,        label: 'Classes',   roles: ['branch_admin','teacher'] },
  { to: '/attendance',      icon: ClipboardCheck,  label: 'Attendance',roles: ['branch_admin','teacher'] },
  { to: '/finance',         icon: DollarSign,      label: 'Finance',   roles: ['owner','finance'] },
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

  const visibleItems = NAV_ITEMS.filter(item =>
    currentUser && item.roles.includes(currentUser.role)
  )

  const initials = currentUser?.name
    ? currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : '?'

  const avatarColor = ROLE_COLORS[currentUser?.role] || '#7c3aed'

  return (
    <aside className={styles.sidebar}>
      {/* Brand */}
      <div className={styles.brand}>
        <div className={styles.brandIcon}>
          <School size={18} />
        </div>
        <div>
          <p className={styles.brandName}>EduManage</p>
          <p className={styles.brandSub}>{ROLE_LABELS[currentUser?.role] || 'Portal'}</p>
        </div>
      </div>

      {/* Nav */}
      <nav className={styles.nav}>
        {visibleItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              <Icon size={17} className={styles.navIcon} />
              {item.label}
            </NavLink>
          )
        })}
      </nav>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.userCard}>
          <div
            className={styles.avatar}
            style={{ background: avatarColor }}
          >
            {initials}
          </div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>{currentUser?.name}</p>
            <p className={styles.userRole}>{ROLE_LABELS[currentUser?.role]}</p>
          </div>
        </div>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}