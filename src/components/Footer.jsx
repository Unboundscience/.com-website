import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <span className={styles.logo}>
            U<span>n</span>
          </span>
          <span className={styles.name}>Unbound Science</span>
        </div>
        <div className={styles.links}>
          <a href="#problem">Mission</a>
          <a href="#how">Team</a>
          <a href="https://demo.unboundscience.io">Demo</a>
          <a href="https://twitter.com/unboundscience" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
        </div>
        <div className={styles.copyright}>© 2026 Unbound Science</div>
      </div>
    </footer>
  )
}
