import { useRef, useCallback } from 'react'
import { useScrollVideoGrowth } from '../hooks/useScrollVideoGrowth'
import styles from './Growth.module.css'

export function Growth() {
  const sectionRef = useRef(null)
  const { initCanvas } = useScrollVideoGrowth(sectionRef)

  const canvasRef = useCallback((node) => {
    if (node) {
      initCanvas(node)
    }
  }, [initCanvas])

  return (
    <section className={styles.section} id="growth" ref={sectionRef}>
      <div className={styles.sticky}>
        <div className={styles.canvasWrapper}>
          <canvas ref={canvasRef} className={styles.canvas}></canvas>
        </div>
        <div className={styles.overlay}></div>
      </div>
    </section>
  )
}
