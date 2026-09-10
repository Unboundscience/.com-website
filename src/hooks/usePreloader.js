import { useState, useEffect, useRef } from 'react'

const BASE_URL = import.meta.env.BASE_URL || '/'

// Frame folders in /public, in the order their frames are stitched together.
// Folder names contain a space, so each is URL-encoded when building the src.
const FRAME_GROUPS = [
  { target: 'hero', folder: 'video 1', frames: 26 },
  { target: 'hero', folder: 'video 2', frames: 26 },
  { target: 'breakthrough', folder: 'video 3', frames: 51 },
  { target: 'breakthrough', folder: 'video 4', frames: 51 },
  { target: 'growth', folder: 'video 6', frames: 51 },
  { target: 'growth', folder: 'video 7', frames: 51 }
]

export function usePreloader() {
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const imagesRef = useRef({
    hero: [],
    breakthrough: [],
    growth: []
  })

  useEffect(() => {
    const totalImages = FRAME_GROUPS.reduce((sum, group) => sum + group.frames, 0)
    let loadedCount = 0

    const handleLoad = () => {
      loadedCount++
      setProgress(Math.round((loadedCount / totalImages) * 100))

      if (loadedCount === totalImages) {
        setIsLoaded(true)
      }
    }

    for (const { target, folder, frames } of FRAME_GROUPS) {
      for (let i = 1; i <= frames; i++) {
        const img = new Image()
        const frameNum = String(i).padStart(3, '0')
        img.src = `${BASE_URL}${encodeURIComponent(folder)}/ezgif-frame-${frameNum}.jpg`
        img.onload = handleLoad
        img.onerror = handleLoad
        imagesRef.current[target].push(img)
      }
    }

  }, [])

  return {
    progress,
    isLoaded,
    images: imagesRef.current
  }
}
