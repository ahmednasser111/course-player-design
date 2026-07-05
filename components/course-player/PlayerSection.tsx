'use client'

import { Player } from './Player'
import { PlayerControls } from './PlayerControls'
import { useFullscreen } from '@/hooks/useFullscreen'

interface PlayerSectionProps {
  videoUrl: string
  onCurriculumClick: () => void
  onCommentsClick: () => void
  onAskQuestionClick: () => void
  onLeaderboardClick: () => void
}

/**
 * Owns the real Fullscreen API + orientation lock for the player. `isFullscreen` is the
 * single source of truth: it drives both the CSS overlay presentation and the browser's
 * native fullscreen state, so a native Esc/back-gesture exit and our own Maximize button
 * can never disagree with each other.
 */
export function PlayerSection({
  videoUrl,
  onCurriculumClick,
  onCommentsClick,
  onAskQuestionClick,
  onLeaderboardClick,
}: PlayerSectionProps) {
  const { containerRef, isFullscreen, enterFullscreen, exitFullscreen } = useFullscreen()

  const handleMaximizeClick = () => {
    if (isFullscreen) {
      exitFullscreen()
    } else {
      enterFullscreen()
    }
  }

  return (
    <div ref={containerRef} className={isFullscreen ? 'fixed inset-0 z-50 bg-black flex flex-col' : 'w-full'}>
      <div
        className={
          isFullscreen
            ? 'flex-1 min-h-0'
            : 'w-full aspect-video bg-black rounded-lg overflow-hidden border border-slate-200'
        }
      >
        <Player videoUrl={videoUrl} />
      </div>
      <PlayerControls
        isFullscreen={isFullscreen}
        onMaximizeClick={handleMaximizeClick}
        onCurriculumClick={onCurriculumClick}
        onCommentsClick={onCommentsClick}
        onAskQuestionClick={onAskQuestionClick}
        onLeaderboardClick={onLeaderboardClick}
      />
    </div>
  )
}
