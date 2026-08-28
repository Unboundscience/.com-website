import { useState, useEffect, useRef } from 'react'

const BASE_URL = import.meta.env.BASE_URL || '/'

// All images to preload
const VIDEO1_FRAMES = 26
const VIDEO2_FRAMES = 26
const VIDEO3_FRAMES = 51
const VIDEO4_FRAMES = 51
const VIDEO6_FRAMES = 51
const VIDEO7_FRAMES = 51

export function usePreloader() {
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const imagesRef = useRef({
    hero: [],
    breakthrough: [],
    growth: []
  })

  useEffect(() => {
    const totalImages = VIDEO1_FRAMES + VIDEO2_FRAMES + VIDEO3_FRAMES + VIDEO4_FRAMES + VIDEO6_FRAMES + VIDEO7_FRAMES
    let loadedCount = 0

    const handleLoad = () => {
      loadedCount++
      setProgress(Math.round((loadedCount / totalImages) * 100))

      if (loadedCount === totalImages) {
        setIsLoaded(true)
      }
    }

    // Hero frames (video1 + video2)
    for (let i = 1; i <= VIDEO1_FRAMES; i++) {
      const img = new Image()
      const frameNum = String(i).padStart(3, '0')
      img.src = `${BASE_URL}video1/ezgif-frame-${frameNum}.jpg`
      img.onload = handleLoad
      img.onerror = handleLoad
      imagesRef.current.hero.push(img)
    }

    for (let i = 1; i <= VIDEO2_FRAMES; i++) {
      const img = new Image()
      const frameNum = String(i).padStart(3, '0')
      img.src = `${BASE_URL}video2/ezgif-frame-${frameNum}.jpg`
      img.onload = handleLoad
      img.onerror = handleLoad
      imagesRef.current.hero.push(img)
    }

    // Breakthrough frames (video3 + video4)
    for (let i = 1; i <= VIDEO3_FRAMES; i++) {
      const img = new Image()
      const frameNum = String(i).padStart(3, '0')
      img.src = `${BASE_URL}video3/ezgif-frame-${frameNum}.jpg`
      img.onload = handleLoad
      img.onerror = handleLoad
      imagesRef.current.breakthrough.push(img)
    }

    for (let i = 1; i <= VIDEO4_FRAMES; i++) {
      const img = new Image()
      const frameNum = String(i).padStart(3, '0')
      img.src = `${BASE_URL}video4/ezgif-frame-${frameNum}.jpg`
      img.onload = handleLoad
      img.onerror = handleLoad
      imagesRef.current.breakthrough.push(img)
    }

    // Growth frames (video6 + video7)
    for (let i = 1; i <= VIDEO6_FRAMES; i++) {
      const img = new Image()
      const frameNum = String(i).padStart(3, '0')
      img.src = `${BASE_URL}video6/ezgif-frame-${frameNum}.jpg`
      img.onload = handleLoad
      img.onerror = handleLoad
      imagesRef.current.growth.push(img)
    }

    for (let i = 1; i <= VIDEO7_FRAMES; i++) {
      const img = new Image()
      const frameNum = String(i).padStart(3, '0')
      img.src = `${BASE_URL}video7/ezgif-frame-${frameNum}.jpg`
      img.onload = handleLoad
      img.onerror = handleLoad
      imagesRef.current.growth.push(img)
    }

  }, [])

  return {
    progress,
    isLoaded,
    images: imagesRef.current
  }
}
