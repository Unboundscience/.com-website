import { useState, useEffect, useRef, useCallback } from 'react'
import { usePreloadedImages } from '../context/PreloadContext'

const TOTAL_FRAMES = 52 // 26 + 26

export function useScrollVideo(heroRef) {
  const images = usePreloadedImages()
  const [contentOpacity, setContentOpacity] = useState(1)
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)
  const rafRef = useRef(null)
  const currentFrameRef = useRef(0)
  const initialDrawDone = useRef(false)

  // Draw frame to canvas
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    const frames = images.hero

    if (!canvas || !ctx || !frames[index] || !frames[index].complete || !frames[index].naturalWidth) return

    const img = frames[index]
    const canvasRatio = canvas.width / canvas.height
    const imgRatio = img.naturalWidth / img.naturalHeight
    const isMobile = window.innerWidth <= 768

    let drawWidth, drawHeight, drawX, drawY

    if (imgRatio > canvasRatio) {
      drawHeight = canvas.height
      drawWidth = img.naturalWidth * (canvas.height / img.naturalHeight)
      // Mobile: focus between left and center, Desktop: center
      const centerX = (canvas.width - drawWidth) / 2
      drawX = isMobile ? centerX / 2 : centerX
      drawY = 0
    } else {
      drawWidth = canvas.width
      drawHeight = img.naturalHeight * (canvas.width / img.naturalWidth)
      drawX = 0
      drawY = (canvas.height - drawHeight) / 2
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)
  }, [images])

  // Handle scroll with RAF throttling
  useEffect(() => {
    if (!heroRef.current) return

    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      ticking = true

      rafRef.current = requestAnimationFrame(() => {
        const hero = heroRef.current
        if (!hero) {
          ticking = false
          return
        }

        const rect = hero.getBoundingClientRect()
        const scrollTop = -rect.top
        const scrollHeight = hero.offsetHeight - window.innerHeight
        const scrollFraction = Math.max(0, Math.min(1, scrollTop / scrollHeight))
        const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(scrollFraction * TOTAL_FRAMES))

        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex
          drawFrame(frameIndex)
        }

        // Calculate content opacity
        const fadeStart = window.innerHeight * 0.3
        const fadeEnd = window.innerHeight * 1
        const opacity = Math.max(0, Math.min(1, 1 - (scrollTop - fadeStart) / (fadeEnd - fadeStart)))
        setContentOpacity(opacity)

        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [heroRef, drawFrame])

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      drawFrame(currentFrameRef.current)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [drawFrame])

  // Initialize canvas and draw first frame immediately
  const initCanvas = useCallback((canvas) => {
    if (!canvas || initialDrawDone.current) return

    canvasRef.current = canvas
    ctxRef.current = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Draw first frame immediately
    if (images.hero[0] && images.hero[0].complete) {
      drawFrame(0)
      initialDrawDone.current = true
    }
  }, [images, drawFrame])

  return {
    contentOpacity,
    initCanvas
  }
}
