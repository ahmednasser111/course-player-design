'use client'

import { Button } from '@/components/ui/button'
import { BookOpen, MessageCircle, HelpCircle, Trophy, Maximize2, Minimize2, Maximize, Minimize } from 'lucide-react'
import { useCoursePlayerState } from '@/hooks/useCoursePlayerState'

interface PlayerControlsProps {
  isFullscreen: boolean
  onMaximizeClick: () => void
  onCurriculumClick: () => void
  onCommentsClick: () => void
  onAskQuestionClick: () => void
  onLeaderboardClick: () => void
}

export function PlayerControls({
  isFullscreen,
  onMaximizeClick,
  onCurriculumClick,
  onCommentsClick,
  onAskQuestionClick,
  onLeaderboardClick,
}: PlayerControlsProps) {
  const { playerMode, setPlayerMode } = useCoursePlayerState()
  const isWide = playerMode === 'wide'

  const handleWideToggle = () => {
    setPlayerMode(isWide ? 'normal' : 'wide')
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-3 sm:p-4 bg-gradient-to-b from-black/10 to-transparent">
      <Button
        variant="ghost"
        size="sm"
        onClick={onCurriculumClick}
        aria-label="Open curriculum"
        className="flex items-center gap-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100"
      >
        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
        <span className="hidden sm:inline text-xs sm:text-sm">Curriculum</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onCommentsClick}
        aria-label="Open comments"
        className="flex items-center gap-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100"
      >
        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
        <span className="hidden sm:inline text-xs sm:text-sm">Comments</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onAskQuestionClick}
        aria-label="Ask a question"
        className="flex items-center gap-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100"
      >
        <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
        <span className="hidden sm:inline text-xs sm:text-sm">Ask Q</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onLeaderboardClick}
        aria-label="Open leaderboard"
        className="flex items-center gap-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100"
      >
        <Trophy className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
        <span className="hidden sm:inline text-xs sm:text-sm">Leaderboard</span>
      </Button>

      <div className="h-6 w-px bg-slate-300" aria-hidden="true" />

      <Button
        variant="ghost"
        size="sm"
        onClick={onMaximizeClick}
        className={`flex items-center gap-2 ${
          isFullscreen ? 'text-primary bg-primary/10 hover:bg-primary/20' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
        }`}
        title={isFullscreen ? 'Exit Fullscreen' : 'Maximize'}
        aria-label={isFullscreen ? 'Exit fullscreen mode' : 'Enter fullscreen mode'}
        aria-pressed={isFullscreen}
      >
        {isFullscreen ? (
          <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
        ) : (
          <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
        )}
      </Button>

      {/* Wide Mode - desktop only, hidden below lg since it only affects the desktop grid layout */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleWideToggle}
        className={`hidden lg:flex items-center gap-2 ${
          isWide ? 'text-primary bg-primary/10 hover:bg-primary/20' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
        }`}
        title={isWide ? 'Exit Wide Mode' : 'Wide Mode'}
        aria-label={isWide ? 'Exit wide mode' : 'Enter wide mode'}
        aria-pressed={isWide}
      >
        {isWide ? (
          <Minimize className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
        ) : (
          <Maximize className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
        )}
      </Button>
    </div>
  )
}
