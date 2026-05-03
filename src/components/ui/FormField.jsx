import styles from './FormField.module.css'

export default function FormField({ label, children, required }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      {children}
    </div>
  )
}

export function Input({ ...props }) {
  return <input className={styles.input} {...props} />
}

export function Select({ children, ...props }) {
  return <select className={styles.input} {...props}>{children}</select>
}