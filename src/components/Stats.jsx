import { useInView, useCounter } from '../hooks/useInView'
import styles from './Stats.module.css'

function StatItem({ target, suffix = '', prefix = '', label, isDecimal = false, isText = false, delay }) {
  const [ref, isInView] = useInView({ once: true, threshold: 0.5 })
  const count = useCounter(isText ? 0 : target, isInView && !isText, 2000, isDecimal)

  return (
    <div
      ref={ref}
      className={`${styles.item} ${isInView ? styles.visible : ''}`}
      style={{ transitionDelay: `${delay * 100}ms` }}
    >
      <div className={styles.number}>
        {isText ? target : `${prefix}${count}${suffix}`}
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  )
}

export function Stats() {
  const stats = [
    { target: 4000, suffix: '+', label: 'Community Members' },
    { target: 1500, suffix: '+', label: 'Scientists Identified' },
    { target: 'Alpha Live', label: 'Platform Status', isText: true },
  ]

  return (
    <section className={styles.section} id="stats">
      <div className={styles.container}>
        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <StatItem key={stat.label} {...stat} delay={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
