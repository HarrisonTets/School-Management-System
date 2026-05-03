// ✅ Layout must use Outlet, not {children}
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import styles from './Layout.module.css'

export default function Layout() {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.main}>
        <Header />
        <main className={styles.content}>
          <Outlet />   {/* ← must be Outlet, not {children} */}
        </main>
      </div>
    </div>
  )
}