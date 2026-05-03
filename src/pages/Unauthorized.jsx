import { useNavigate } from 'react-router-dom'
import { ShieldOff } from 'lucide-react'
import styles from './Unauthorized.module.css'

export default function Unauthorized() {
  const navigate = useNavigate()
  return (
    <div className={styles.page}>
      <ShieldOff size={48} className={styles.icon} />
      <h1 className={styles.title}>Access Denied</h1>
      <p className={styles.message}>You don't have permission to view this page.</p>
      <button className={styles.btn} onClick={() => navigate('/')}>Go to Dashboard</button>
    </div>
  )
}