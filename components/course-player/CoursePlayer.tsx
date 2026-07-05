'use client'

import { useRef, useState } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { PlayerSection } from './PlayerSection'
import { StickyHeader } from './StickyHeader'
import { CourseMaterials, type CourseMaterialsInfo } from './CourseMaterials'
import { CourseProgress } from './CourseProgress'
import { CurriculumSection } from './CurriculumSection'
import { CommentsSection } from './CommentsSection'
import { AskQuestionModal } from './modals/AskQuestionModal'
import { LeaderboardModal } from './modals/LeaderboardModal'
import { ExamModal } from './modals/ExamModal'
import { PDFViewerModal } from './modals/PDFViewerModal'
import { useCoursePlayerState } from '@/hooks/useCoursePlayerState'
import { getExamById, type ExamData } from '@/lib/mock-exam-data'

interface Comment {
  id: string
  author: string
  date: string
  content: string
  avatar?: string
  rating?: number
}

interface CurriculumItem {
  id: string
  title: string
  duration?: string
  questions?: number
  minutes?: number
  type?: 'lesson' | 'quiz'
  completed?: boolean
  pdfUrl?: string
}

interface CurriculumWeek {
  week: string
  description?: string
  items: CurriculumItem[]
}

interface CoursePlayerProps {
  videoUrl: string
  courseName?: string
  progressPercentage?: number
  curriculum?: CurriculumWeek[]
  comments?: Comment[]
  materials?: CourseMaterialsInfo
  onBack?: () => void
}

interface PdfTarget {
  title: string
  url: string
}

const defaultMaterials: CourseMaterialsInfo = {
  instructor: 'Instructor Name',
  duration: '—',
  lessons: 0,
  enrolled: 0,
  language: 'English',
}

export function CoursePlayer({
  videoUrl,
  courseName = 'Course Name',
  progressPercentage = 45,
  curriculum = [],
  comments = [],
  materials = defaultMaterials,
  onBack,
}: CoursePlayerProps) {
  const { playerMode, setAskQuestionOpen, setLeaderboardOpen } = useCoursePlayerState()
  const isWide = playerMode === 'wide'

  const curriculumRef = useRef<HTMLDivElement>(null)
  const commentsRef = useRef<HTMLDivElement>(null)

  const [activeExam, setActiveExam] = useState<ExamData | null>(null)
  const [examModalOpen, setExamModalOpen] = useState(false)
  const [activePdf, setActivePdf] = useState<PdfTarget | null>(null)
  const [pdfModalOpen, setPdfModalOpen] = useState(false)

  const handleCurriculumClick = () => {
    curriculumRef.current?.scrollIntoView({ behavior: 'smooth' })
    curriculumRef.current?.focus({ preventScroll: true })
  }

  const handleCommentsClick = () => {
    commentsRef.current?.scrollIntoView({ behavior: 'smooth' })
    commentsRef.current?.focus({ preventScroll: true })
  }

  const handleQuizClick = (item: CurriculumItem) => {
    const exam = getExamById(item.id, item.title, item.questions)
    if (!exam) return
    setActiveExam(exam)
    setExamModalOpen(true)
  }

  const handleResourceClick = (item: CurriculumItem) => {
    if (!item.pdfUrl) return
    setActivePdf({ title: item.title, url: item.pdfUrl })
    setPdfModalOpen(true)
  }

  return (
    <>
      <AskQuestionModal />
      <LeaderboardModal courseName={courseName} progressPercentage={progressPercentage} />
      <ExamModal open={examModalOpen} onOpenChange={setExamModalOpen} exam={activeExam} />
      <PDFViewerModal open={pdfModalOpen} onOpenChange={setPdfModalOpen} pdf={activePdf} />

      <div className="min-h-screen bg-white">
        {/* Desktop-only breadcrumb - mobile/tablet use the back chevron in StickyHeader instead */}
        <nav aria-label="Breadcrumb" className="hidden lg:block border-b border-slate-200 bg-white sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Courses</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Course Details</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </nav>

        <div className={`px-4 sm:px-6 py-6 lg:py-8 ${isWide ? 'lg:px-8' : 'lg:max-w-7xl lg:mx-auto lg:px-8'}`}>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6 lg:mb-8">{courseName}</h1>

          <div className={isWide ? 'space-y-16' : 'grid gap-8 grid-cols-1 lg:grid-cols-3'}>
            {/* Video + materials - same row as progress/curriculum on large screens */}
            <div className={isWide ? 'space-y-8' : 'lg:col-span-2 space-y-8'}>
              <StickyHeader onBack={onBack}>
                <PlayerSection
                  videoUrl={videoUrl}
                  onCurriculumClick={handleCurriculumClick}
                  onCommentsClick={handleCommentsClick}
                  onAskQuestionClick={() => setAskQuestionOpen(true)}
                  onLeaderboardClick={() => setLeaderboardOpen(true)}
                />
              </StickyHeader>

              <CourseMaterials {...materials} />
            </div>

            {/* Progress + curriculum - beside the video on large screens, stacked below it on mobile */}
            <div className={isWide ? 'space-y-16' : 'lg:col-span-1 space-y-8'}>
              <CourseProgress progressPercentage={progressPercentage} />
              <CurriculumSection
                weeks={curriculum}
                ref={curriculumRef}
                onQuizClick={handleQuizClick}
                onResourceClick={handleResourceClick}
              />
            </div>

            <div className={isWide ? '' : 'lg:col-span-3'}>
              <CommentsSection comments={comments} ref={commentsRef} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
