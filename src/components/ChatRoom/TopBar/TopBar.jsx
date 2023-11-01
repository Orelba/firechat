import styles from './topbar.module.css'
import Logo from '../../Logo/Logo'
import Button from '../../Button/Button'

export default function TopBar({ auth }) {
  return (
    <div className={styles.topbar}>
      <Logo />
      <SignOut auth={auth} />
    </div>
  )
}

function SignOut({ auth }) {
  return auth.currentUser && (
    <Button
      onClick={() => auth.signOut()}
      className={styles.button}
      style={{
        padding: '0.4rem',
        backgroundColor: 'transparent'
      }}
    >
      <img
        src="sign-out.png"
        alt="Sign out"
        height={25}
        width={25}
        className={styles['sign-out-img']}
      />
    </Button>
  )
}
