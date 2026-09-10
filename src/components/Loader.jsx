import styles from './Loader.module.css'

const LOGO_SRC = `${import.meta.env.BASE_URL || '/'}logo.png`

export function Loader({ progress }) {
  return (
    <div className={styles.loader}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <img src={LOGO_SRC} alt="Unbound Science" />
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
