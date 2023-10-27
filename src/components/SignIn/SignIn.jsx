import styles from './sign-in.module.css'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import Logo from '../Logo/Logo'
import Button from '../Button/Button'

export default function SignIn({ auth }) {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }

  return (
    <div className={styles['sign-in']}>
      <div>
        <h1 className={styles.thin}>Welcome to</h1>
        <Logo />
      </div>
      <h2 className={styles.thin}>Real-time Chat powered by Firebase</h2>
      <Button onClick={signInWithGoogle}>Sign in with Google</Button>
    </div>
  )
}