import styles from './Button.module.css'

// variant: 'primary' | 'secondary' | 'ghost' | 'danger'
// size: 'sm' | 'md'
export default function Button({ children, variant = 'primary', size = 'md', onClick, type = 'button', disabled, icon }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.btn} ${styles[variant]} ${styles[size]}`}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  )
}