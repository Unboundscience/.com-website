import { useInView } from '../hooks/useInView'
import styles from './FocusAreas.module.css'

const areas = [
  {
    icon: '🔥',
    title: 'Clean Energy',
    desc: 'Next-generation fusion, solar, and battery technologies to power humanity sustainably.',
  },
  {
    icon: '💧',
    title: 'Air, Water & Soil',
    desc: 'Purification systems, regenerative agriculture, and atmospheric restoration.',
  },
  {
    icon: '♻️',
    title: 'Waste Management',
    desc: 'Cleaning up river and ocean pollution, then processing garbage into rare-earth minerals through nano-fabrication.',
  },
  {
    icon: '⚛️',
    title: 'Quantum Technology',
    desc: 'Quantum biology, resonance diagnostics, and frequency-based therapies to restore human health.',
  },
]

function FocusCard({ icon, title, desc, delay }) {
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

export function FocusAreas() {
  return (
    <section className={styles.section} id="focus">
      <div className={styles.container}>
        <h2 className={styles.title}>Where science meets impact</h2>
        <div className={styles.grid}>
          {areas.map((area, index) => (
            <FocusCard key={area.title} {...area} delay={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
