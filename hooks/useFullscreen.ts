'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface FullscreenElement extends HTMLDivElement {
  webkitRequestFullscreen?: () => Promise<void> | void
}

interface FullscreenDocument extends Document {
  webkitExitFullscreen?: () => Promise<void> | void
  webkitFullscreenElement?: Element | null
}

interface LockableOrientation {
  lock?: (orientation: string) => Promise<void>
  unlock?: () => void
}

/**
 * Wraps the native Fullscreen API + Screen Orientation API for the player.
 * `isFullscreen` is optimistic: it flips true as soon as fullscreen is requested,
 * even on browsers (e.g. iOS Safari) where requestFullscreen silently fails, so the
 * CSS overlay presentation still applies as a fallback. It only flips back to false
 * automatically when the browser reports a real native exit (Esc key, back gesture).
 */
export function useFullscreen() {
  const containerRef = useRef<FullscreenElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const doc = document as FullscreenDocument
    const handleChange = () => {
      const fsElement = doc.fullscreenElement ?? doc.webkitFullscreenElement
      if (!fsElement) {
        setIsFullscreen(false)
      }
    }
    document.addEventListener('fullscreenchange', handleChange)
    document.addEventListener('webkitfullscreenchange', handleChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleChange)
      document.removeEventListener('webkitfullscreenchange', handleChange)
    }
  }, [])

  const lockOrientation = useCallback(async () => {
    const orientation = screen.orientation as LockableOrientation | undefined
    if (orientation?.lock) {
      try {
        await orientation.lock('landscape')
      } catch {
        // Orientation lock isn't available on this device/browser - fullscreen still applies.
      }
    }
  }, [])

  const unlockOrientation = useCallback(() => {
    const orientation = screen.orientation as LockableOrientation | undefined
    try {
      orientation?.unlock?.()
    } catch {
      // ignore
    }
  }, [])

  const enterFullscreen = useCallback(async () => {
    const el = containerRef.current
    setIsFullscreen(true)
    try {
      if (el?.requestFullscreen) {
        await el.requestFullscreen()
      } else if (el?.webkitRequestFullscreen) {
        await el.webkitRequestFullscreen()
      }
    } catch {
      // Fullscreen API blocked or unsupported - CSS overlay fallback still applies.
    }
    await lockOrientation()
  }, [lockOrientation])

  const exitFullscreen = useCallback(async () => {
    const doc = document as FullscreenDocument
    const fsElement = doc.fullscreenElement ?? doc.webkitFullscreenElement
    if (fsElement) {
      try {
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen()
        }
      } catch {
        // ignore
      }
    }
    unlockOrientation()
    setIsFullscreen(false)
  }, [unlockOrientation])

  return { containerRef, isFullscreen, enterFullscreen, exitFullscreen }
}
