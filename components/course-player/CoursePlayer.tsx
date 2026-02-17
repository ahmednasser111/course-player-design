'use client'

import { useRef, useEffect } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import { Player } from './Player'
import { PlayerControls } from './PlayerControls'
import { StickyHeader } from './StickyHeader'
import { CurriculumSection } from './CurriculumSection'
import { CommentsSection } from './CommentsSection'
import { AskQuestionModal } from './modals/AskQuestionModal'
import { LeaderboardModal } from './modals/LeaderboardModal'
import { useCoursePlayerState } from '@/hooks/useCoursePlayerState'

interface Comment {
  id: string
  author: string
  date: string
  content: string
  avatar?: string
}

interface CurriculumItem {
  id: string
  title: string
  duration?: string
  questions?: number
  type?: 'lesson' | 'quiz'
  completed?: boolean
}

interface CurriculumWeek {
  week: string
  items: CurriculumItem[]
}

interface CoursePlayerProps {
  videoUrl: string
  courseName?: string
  progressPercentage?: number
  curriculum?: CurriculumWeek[]
  comments?: Comment[]
  onBack?: () => void
}

export function CoursePlayer({
  videoUrl,
  courseName = 'Course Name',
  progressPercentage = 45,
  curriculum = [],
  comments = [],
  onBack,
}: CoursePlayerProps) {
  const isMobile = useIsMobile()
  const { setScrollTarget, setAskQuestionOpen, setLeaderboardOpen } = useCoursePlayerState()

  const curriculumRef = useRef<HTMLDivElement>(null)
  const commentsRef = useRef<HTMLDivElement>(null)

  const handleCurriculumClick = () => {
    setScrollTarget('curriculum')
    setTimeout(() => {
      curriculumRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 0)
  }

  const handleCommentsClick = () => {
    setScrollTarget('comments')
    setTimeout(() => {
      commentsRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 0)
  }

  const handleAskQuestionClick = () => {
    setAskQuestionOpen(true)
  }

  const handleLeaderboardClick = () => {
    setLeaderboardOpen(true)
  }

  // Desktop Layout
  if (!isMobile) {
    return (
      <>
        <AskQuestionModal />
        <LeaderboardModal courseName={courseName} progressPercentage={progressPercentage} />

        <div className="min-h-screen bg-white">
          {/* Header Navigation */}
          <nav className="border-b border-slate-200 bg-white sticky top-0 z-30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-2">
              <span className="text-sm text-slate-600">Home</span>
              <span className="text-slate-400">/</span>
              <span className="text-sm text-slate-600">Courses</span>
              <span className="text-slate-400">/</span>
              <span className="text-sm font-medium text-slate-900">Course Details</span>
            </div>
          </nav>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">{courseName}</h1>

            {/* Main Content Grid */}
            <div className="grid gap-8 grid-cols-3 lg:grid-cols-4">
              {/* Player and Content Column */}
              <div className="col-span-3">
                {/* Player Container */}
                <div className="rounded-lg overflow-hidden bg-black mb-4 border border-slate-200">
                  <Player videoUrl={videoUrl} isMobile={false} />
                </div>

                {/* Player Controls */}
                <PlayerControls
                  isMobile={false}
                  onCurriculumClick={handleCurriculumClick}
                  onCommentsClick={handleCommentsClick}
                  onAskQuestionClick={handleAskQuestionClick}
                  onLeaderboardClick={handleLeaderboardClick}
                />

                {/* Content Sections */}
                <div className="mt-12 space-y-16">
                  {/* Curriculum Section */}
                  {curriculum.length > 0 && (
                    <CurriculumSection weeks={curriculum} ref={curriculumRef} />
                  )}

                  {/* Comments Section */}
                  {comments.length > 0 && (
                    <CommentsSection comments={comments} ref={commentsRef} />
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="col-span-1 h-fit">
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-4">Topics for This Course</h3>
                  <div className="space-y-3">
                    <div className="h-6 bg-slate-200 rounded w-3/4" />
                    <div className="h-6 bg-slate-200 rounded w-4/5" />
                    <div className="h-6 bg-slate-200 rounded w-2/3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  // Mobile Layout with Sticky Header
  return (
    <>
      <AskQuestionModal />
      <LeaderboardModal courseName={courseName} progressPercentage={progressPercentage} />

      <div className="min-h-screen bg-white pb-20">
        {/* Sticky Player Header */}
        <StickyHeader onBack={onBack}>
          <div className="w-full space-y-2">
            <div className="rounded-lg overflow-hidden bg-black h-40 border border-slate-200">
              <Player videoUrl={videoUrl} isMobile={true} />
            </div>
            <PlayerControls
              isMobile={true}
              onCurriculumClick={handleCurriculumClick}
              onCommentsClick={handleCommentsClick}
              onAskQuestionClick={handleAskQuestionClick}
              onLeaderboardClick={handleLeaderboardClick}
            />
          </div>
        </StickyHeader>

        {/* Page Content */}
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-8">{courseName}</h1>

          <div className="space-y-12">
            {/* Curriculum Section */}
            {curriculum.length > 0 && (
              <CurriculumSection weeks={curriculum} isMobile={true} ref={curriculumRef} />
            )}

            {/* Comments Section */}
            {comments.length > 0 && (
              <CommentsSection comments={comments} ref={commentsRef} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
