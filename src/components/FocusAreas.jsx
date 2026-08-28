import { useInView } from '../hooks/useInView'
import styles from './FocusAreas.module.css'

const areas = [
  {
    icon: '🔥',
    title: 'Clean Energy',
    tam: '$1.2T TAM',
    desc: 'Next-generation fusion, solar, and battery technologies to power humanity sustainably.',
  },
  {
    icon: '💧',
    title: 'Air, Water & Soil',
    tam: '$25B TAM',
    desc: 'Purification systems, regenerative agriculture, and atmospheric restoration.',
  },
  {
    icon: '♻️',
    title: 'Waste Management',
    tam: '$540B TAM',
    desc: 'Circular economy solutions, plastic degradation, and zero-waste systems.',
  },
  {
    icon: '⚛️',
    title: 'Quantum Technology',
    tam: '$106B TAM',
    desc: 'Quantum computing, cryptography, and sensing for the next computing paradigm.',
  },
]

function FocusCard({ icon, title, tam, desc, delay }) {
  const [ref, isInView] = useInView({ once: true, threshold: 0.2 })

  return (
    <div
      ref={ref}
      className={`${styles.card} ${isInView ? styles.visible : ''}`}
      style={{ transitionDelay: `${delay * 100}ms` }}
    >
      <div className={styles.cardIcon}>{icon}</div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <div className={styles.cardTam}>{tam}</div>
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
