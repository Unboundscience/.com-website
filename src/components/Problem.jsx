import { useInView } from '../hooks/useInView'
import styles from './Problem.module.css'

const problems = [
  {
    icon: '⚠️',
    title: 'Corruption',
    desc: 'Funding decisions made behind closed doors with conflicts of interest.',
  },
  {
    icon: '🔒',
    title: 'Security',
    desc: 'Research stolen, patents blocked, inventors silenced.',
  },
  {
    icon: '📦',
    title: 'Preservation',
    desc: 'Knowledge lost when institutions fail or censor.',
  },
  {
    icon: '💰',
    title: 'Finance',
    desc: 'Grants favor politics over breakthrough potential.',
  },
  {
    icon: '⛓️',
    title: 'Subjugation',
    desc: 'Scientists forced to give up IP rights for funding.',
  },
  {
    icon: '🚫',
    title: 'Distribution',
    desc: 'Life-saving tech blocked from reaching those who need it.',
  },
]

function ProblemCard({ icon, title, desc, delay }) {
  const [ref, isInView] = useInView({ once: true, threshold: 0.2 })

  return (
    <div
      ref={ref}
      className={`${styles.card} ${isInView ? styles.visible : ''}`}
      style={{ transitionDelay: `${delay * 100}ms` }}
    >
      <div className={styles.cardIcon}>{icon}</div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDesc}>{desc}</p>
    </div>
  )
}

export function Problem() {
  return (
    <section className={styles.section} id="problem">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <h2 className={styles.title}>The system wasn't built for you</h2>
            <p className={styles.subtitle}>
              90% of the world's scientists were never invited to traditional science.
              If you're born outside the US or wealthy European nations, you have almost
              zero support. Funding is gatekept. Research is censored. Breakthroughs are buried.
            </p>
          </div>
          <div className={styles.cards}>
            {problems.map((problem, index) => (
              <ProblemCard key={problem.title} {...problem} delay={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
