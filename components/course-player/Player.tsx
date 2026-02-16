'use client'

import { useCoursePlayerState } from '@/hooks/useCoursePlayerState'

interface PlayerProps {
  videoUrl: string
  isMobile: boolean
}

export function Player({ videoUrl, isMobile }: PlayerProps) {
  const { playerMode } = useCoursePlayerState()

  const getPlayerDimensions = () => {
    if (playerMode === 'fullscreen') {
      return {
        width: '100vw',
        height: '100vh',
        isFullscreen: true,
      }
    }

    if (playerMode === 'wide') {
      return {
        width: '100%',
        height: 'auto',
        aspectRatio: '16 / 9',
        isFullscreen: false,
      }
    }

    // Normal mode
    if (isMobile) {
      return {
        width: '100%',
        height: '250px',
        isFullscreen: false,
      }
    }

    return {
      width: '100%',
      height: '400px',
      isFullscreen: false,
    }
  }

  const dimensions = getPlayerDimensions()

  return (
    <div
      className={`bg-black flex items-center justify-center overflow-hidden ${
        dimensions.isFullscreen ? 'fixed inset-0 z-50' : ''
      }`}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        aspectRatio: (dimensions as any).aspectRatio,
      }}
    >
      {/* Video Embed - Placeholder for actual video player */}
      <iframe
        src={videoUrl}
        className="w-full h-full"
        allowFullScreen
        title="Course Video"
      />
    </div>
  )
}
