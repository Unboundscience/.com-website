import { useEffect, useState, useRef } from 'react'
import styles from './HowItWorks.module.css'

// Board path - zigzag from bottom-left to top-right
const tiles = [
  // Row 1 - bottom, going right (START)
  { id: 1, row: 0, col: 0, type: 'start' },
  { id: 2, row: 0, col: 1, type: 'path' },
  { id: 3, row: 0, col: 2, type: 'path' },
  { id: 4, row: 0, col: 3, type: 'stop' }, // Stop 1
  { id: 5, row: 0, col: 4, type: 'corner' },
  // Row 2 - going up
  { id: 6, row: 1, col: 4, type: 'path' },
  { id: 7, row: 2, col: 4, type: 'stop' }, // Stop 2
  { id: 8, row: 3, col: 4, type: 'corner' },
  // Row 3 - going left
  { id: 9, row: 3, col: 3, type: 'path' },
  { id: 10, row: 3, col: 2, type: 'stop' }, // Stop 3 (center)
  { id: 11, row: 3, col: 1, type: 'path' },
  { id: 12, row: 3, col: 0, type: 'corner' },
  // Row 4 - going up
  { id: 13, row: 4, col: 0, type: 'path' },
  { id: 14, row: 5, col: 0, type: 'stop' }, // Stop 4
  { id: 15, row: 6, col: 0, type: 'corner' },
  // Row 5 - going right to END
  { id: 16, row: 6, col: 1, type: 'path' },
  { id: 17, row: 6, col: 2, type: 'path' },
  { id: 18, row: 6, col: 3, type: 'path' },
  { id: 19, row: 6, col: 4, type: 'end' }, // END
]

// 5 Stops with info
const stops = [
  {
    id: 0,
    tileId: 1,
    title: 'Dystopia',
    subtitle: 'START HERE',
    text: 'Scientists struggle to get funded. Research is censored. Breakthroughs are buried.',
    icon: '🏚️',
    color: '#ff6b6b',
  },
  {
    id: 1,
    tileId: 4,
    title: 'The Obstacles',
    subtitle: 'CONSPIRACY CARDS',
    text: 'Corruption, stolen IP, gatekept funding. The system works against breakthrough technology.',
    icon: '🃏',
    color: '#ffa94d',
  },
  {
    id: 2,
    tileId: 10,
    title: 'The Platform',
    subtitle: 'UNBOUND HQ',
    text: 'Web3 powered. Scientists keep IP & credit. $8.67T market. Global collaboration.',
    icon: '🏛️',
    color: '#8AEB75',
    features: ['Web3 powered', 'Keep your IP', 'Public voting', '$8.67T TAM'],
  },
  {
    id: 3,
    tileId: 14,
    title: 'The Impact',
    subtitle: 'GREEN ZONE',
    text: 'Clean Energy, Quantum, Waste Management. 8 of 17 UN SDGs met or exceeded.',
    icon: '🌱',
    color: '#66bb6a',
    features: ['Clean oceans', 'Forests regrown', 'Clean water', 'Non-toxic food'],
  },
  {
    id: 4,
    tileId: 19,
    title: 'Utopia',
    subtitle: 'YOU MADE IT',
    text: 'Science unbound. Funded by the people. Owned by the inventors. Your turn now.',
    icon: '🌍',
    color: '#2e7d32',
  },
]

// Get color based on progress through path
function getTileColor(index, totalTiles) {
  const progress = index / (totalTiles - 1)
  if (progress < 0.2) return '#ff6b6b'
  if (progress < 0.4) return '#ffa94d'
  if (progress < 0.6) return '#ffe066'
  if (progress < 0.8) return '#8AEB75'
  return '#4caf50'
}

export function HowItWorks() {
  const sectionRef = useRef(null)
  const [activeStop, setActiveStop] = useState(0)
  const [progress, setProgress] = useState(0)
  const [playerTileIndex, setPlayerTileIndex] = useState(0)

  useEffect(() => {
    if (!sectionRef.current) return

    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      ticking = true

      requestAnimationFrame(() => {
        const section = sectionRef.current
        if (!section) {
          ticking = false
          return
        }

        const rect = section.getBoundingClientRect()
        const scrollTop = -rect.top
        const scrollHeight = section.offsetHeight - window.innerHeight
        const scrollProgress = Math.max(0, Math.min(1, scrollTop / scrollHeight))

        setProgress(scrollProgress)

        // Calculate player position (0 to tiles.length - 1)
        const position = Math.floor(scrollProgress * (tiles.length - 1))
        setPlayerTileIndex(position)

        // Calculate active stop
        const stopIndex = Math.min(4, Math.floor(scrollProgress * 5))
        setActiveStop(stopIndex)

        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const currentStop = stops[activeStop]

  return (
    <section className={styles.section} id="how" ref={sectionRef}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>THE JOURNEY</span>
        <h2 className={styles.title}>From dystopia to utopia</h2>
        <p className={styles.subtitle}>
          Scroll to walk the path
          <span className={styles.dice}>🎲</span>
        </p>
      </div>

      <div className={styles.stickyContainer}>
        {/* 3D Board */}
        <div className={styles.boardWrapper}>
          <div className={styles.board}>
            {tiles.map((tile, index) => (
              <div
                key={tile.id}
                className={`${styles.tile} ${styles[`tile${tile.type.charAt(0).toUpperCase() + tile.type.slice(1)}`]} ${index <= playerTileIndex ? styles.tileVisited : ''}`}
                style={{
                  '--tile-x': tile.col,
                  '--tile-y': tile.row,
                  '--tile-color': getTileColor(index, tiles.length),
                }}
              >
                <div className={styles.tileFace}>
                  {tile.type === 'start' && <span>START</span>}
                  {tile.type === 'end' && <span>END</span>}
                  {tile.type === 'stop' && <span>●</span>}
                </div>
                {index === playerTileIndex && (
                  <div className={styles.player}>
                    <div className={styles.playerGlow}></div>
                    <div className={styles.playerToken}></div>
                  </div>
                )}
              </div>
            ))}

            {/* Path lines connecting tiles */}
            <svg className={styles.pathLines} viewBox="0 0 500 700" preserveAspectRatio="none">
              <path
                d="M 50 650 L 450 650 L 450 450 L 50 450 L 50 250 L 450 250 L 450 50"
                className={styles.pathLine}
              />
              <path
                d="M 50 650 L 450 650 L 450 450 L 50 450 L 50 250 L 450 250 L 450 50"
                className={styles.pathLineProgress}
                style={{ '--progress': progress }}
              />
            </svg>
          </div>
        </div>

        {/* Info Card */}
        <div className={styles.cardContainer}>
          <div className={styles.card} style={{ '--stop-color': currentStop.color }}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>{currentStop.icon}</span>
              <div>
                <span className={styles.cardSubtitle}>{currentStop.subtitle}</span>
                <h3 className={styles.cardTitle}>{currentStop.title}</h3>
              </div>
            </div>

            <p className={styles.cardText}>{currentStop.text}</p>

            {currentStop.features && (
              <ul className={styles.cardFeatures}>
                {currentStop.features.map((feature, i) => (
                  <li key={i} className={styles.cardFeature}>
                    <span className={styles.checkmark}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progress * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
