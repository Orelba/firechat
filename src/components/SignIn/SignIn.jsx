import styles from './sign-in.module.css'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import Button from '../Button/Button'

export default function SignIn({ auth }) {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }

  return (
    <>
      <Button onClick={signInWithGoogle}>Sign in with Google</Button>
    </>
  )
}