import styles from './sign-out.module.css'
import Button from '../Button/Button'

export default function SignOut({ auth }) {

  return auth.currentUser && (
    <Button onClick={() => auth.signOut()}>Sign Out</Button>
  )
}