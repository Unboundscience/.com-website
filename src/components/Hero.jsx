import { useRef, useCallback } from 'react'
import { useScrollVideo } from '../hooks/useScrollVideo'
import styles from './Hero.module.css'

export function Hero() {
  const heroRef = useRef(null)
  const { contentOpacity, initCanvas } = useScrollVideo(heroRef)

  const canvasRef = useCallback((node) => {
    if (node) {
      initCanvas(node)
    }
  }, [initCanvas])

  return (
    <section className={styles.hero} id="hero" ref={heroRef}>
      <div className={styles.sticky}>
        <div className={styles.canvasWrapper}>
          <canvas ref={canvasRef} className={styles.canvas}></canvas>
        </div>
        <div className={styles.overlay}></div>
        <div className={styles.content} style={{ opacity: contentOpacity }}>
          <h1 className={styles.title}>Science shouldn't need permission</h1>
          <p className={styles.subtitle}>
            The first platform where inventors fund, protect, and distribute breakthrough technology — without gatekeepers.
          </p>
          <div className={styles.buttons}>
            <a href="https://demo.unboundscience.io" className={styles.btnSecondary}>
              I'm a Scientist
            </a>
            <a href="https://demo.unboundscience.io" className={styles.btnPrimary}>
              I'm a Donor
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
