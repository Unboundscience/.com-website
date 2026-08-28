import styles from './Loader.module.css'

export function Loader({ progress }) {
  return (
    <div className={styles.loader}>
      <div className={styles.content}>
        <div className={styles.logo}>
          U<span className={styles.accent}>n</span>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className={styles.progressText}>{progress}%</div>
      </div>
    </div>
  )
}
