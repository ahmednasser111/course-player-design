'use client'

import { Button } from '@/components/ui/button'
import { BookOpen, MessageCircle, HelpCircle, Trophy } from 'lucide-react'

interface PlayerControlsProps {
  isMobile: boolean
  onCurriculumClick: () => void
  onCommentsClick: () => void
  onAskQuestionClick: () => void
  onLeaderboardClick: () => void
}

export function PlayerControls({
  isMobile,
  onCurriculumClick,
  onCommentsClick,
  onAskQuestionClick,
  onLeaderboardClick,
}: PlayerControlsProps) {

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-3 sm:p-4 bg-gradient-to-b from-black/10 to-transparent">
      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onCurriculumClick}
        className="flex items-center gap-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100"
      >
        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden sm:inline text-xs sm:text-sm">Curriculum</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onCommentsClick}
        className="flex items-center gap-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100"
      >
        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden sm:inline text-xs sm:text-sm">Comments</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onAskQuestionClick}
        className="flex items-center gap-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100"
      >
        <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden sm:inline text-xs sm:text-sm">Ask Q</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onLeaderboardClick}
        className="flex items-center gap-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100"
      >
        <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden sm:inline text-xs sm:text-sm">Leaderboard</span>
      </Button>


    </div>
  )
}
