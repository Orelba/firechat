import styles from './button.module.css'
import cx from 'classnames'

export default function Button({ onClick, className, children }) {
  return (
    <button
      className={cx(styles.button, className)}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
