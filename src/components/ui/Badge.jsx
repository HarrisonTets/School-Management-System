import styles from './Badge.module.css'

// color: 'primary' | 'success' | 'warning' | 'danger' | 'purple' | 'neutral'
export default function Badge({ children, color = 'neutral' }) {
  return <span className={`${styles.badge} ${styles[color]}`}>{children}</span>
}