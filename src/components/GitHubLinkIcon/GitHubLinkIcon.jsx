import styles from './github-link-icon.module.css'

export default function GitHubLinkIcon() {
  return (
    <a href="https://github.com/Orelba/firechat">
      <img
        src="GitHub-Mark-Light-32px.png"
        alt="Github Link Icon"
        height={25}
        width={25}
        className={styles['github-img']}
      />
    </a>
  )
}