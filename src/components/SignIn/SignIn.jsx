import styles from './sign-in.module.css'
import firebase from 'firebase/compat/app'
import Button from '../Button/Button'

export default function SignIn({ auth }) {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <>
      <Button onClick={signInWithGoogle}>Sign in with Google</Button>
    </>
  )
}