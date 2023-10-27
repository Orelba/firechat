import styles from './logo.module.css'

export default function Logo() {
  return (
    <div className={styles.logo}>
      <h1>FireChat</h1>
      <img src="lightning.png" alt="Logo" height={30} width={30} />
    </div>
  )
}