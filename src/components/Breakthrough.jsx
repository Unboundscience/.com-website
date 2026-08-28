import { useRef, useCallback } from 'react'
import { useScrollVideoBreakthrough } from '../hooks/useScrollVideoBreakthrough'
import styles from './Breakthrough.module.css'

export function Breakthrough() {
  const sectionRef = useRef(null)
  const { isLoaded, initCanvas } = useScrollVideoBreakthrough(sectionRef)

  const canvasRef = useCallback((node) => {
    if (node) {
      initCanvas(node)
    }
  }, [initCanvas])

  return (
    <section className={styles.section} id="breakthrough" ref={sectionRef}>
      <div className={styles.sticky}>
        <div className={styles.canvasWrapper}>
          <canvas ref={canvasRef} className={styles.canvas}></canvas>
        </div>
        <div className={styles.overlay}></div>
      </div>
    </section>
  )
}
