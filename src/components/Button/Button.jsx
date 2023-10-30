import styles from './button.module.css'

export default function Button({ onClick, style, children }) {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  )
}
