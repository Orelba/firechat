import styles from './topbar.module.css'
import Logo from '../../Logo/Logo'
import Button from '../../Button/Button'
import GitHubLinkIcon from '../../GitHubLinkIcon/GitHubLinkIcon'

export default function TopBar({ auth }) {
  return (
    <div className={styles.topbar}>
      <Logo />
      <div className={styles['topbar-buttons']}>
        <GitHubLinkIcon />
        <SignOut auth={auth} />
      </div>
    </div>
  )
}

function SignOut({ auth }) {
  return auth.currentUser && (
    <Button
      onClick={() => auth.signOut()}
      className={styles.button}
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
