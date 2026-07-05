'use client'

import { useState } from 'react'
import { ChevronDown, FileText, Lock } from 'lucide-react'

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

interface CurriculumSectionProps {
  weeks: CurriculumWeek[]
  ref?: React.RefObject<HTMLDivElement | null>
  onQuizClick?: (item: CurriculumItem) => void
  onResourceClick?: (item: CurriculumItem) => void
}

export function CurriculumSection({ weeks, ref, onQuizClick, onResourceClick }: CurriculumSectionProps) {
  const [expandedWeeks, setExpandedWeeks] = useState<Set<string>>(new Set(['week-0']))

  const toggleWeek = (weekId: string) => {
    const newExpanded = new Set(expandedWeeks)
    if (newExpanded.has(weekId)) {
      newExpanded.delete(weekId)
    } else {
      newExpanded.add(weekId)
    }
    setExpandedWeeks(newExpanded)
  }

  return (
    <div
      ref={ref}
      tabIndex={-1}
      className="w-full scroll-mt-20 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Curriculum</h2>

      <div className="space-y-6">
        {weeks.map((weekGroup, idx) => {
          const weekId = `week-${idx}`
          const isExpanded = expandedWeeks.has(weekId)

          return (
            <div key={weekId} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => toggleWeek(weekId)}
                aria-expanded={isExpanded}
                className="w-full flex items-start justify-between gap-4 p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{weekGroup.week}</h3>
                  {weekGroup.description && (
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed max-w-xl">{weekGroup.description}</p>
                  )}
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 mt-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>

              {isExpanded && (
                <div className="border-t border-slate-200 divide-y divide-slate-200">
                  {weekGroup.items.map((item) => {
                    const isQuiz = item.type === 'quiz'
                    const isResource = Boolean(item.pdfUrl)
                    const isClickable = (isQuiz && Boolean(onQuizClick)) || (isResource && Boolean(onResourceClick))

                    const rowContent = (
                      <>
                        <FileText className="w-5 h-5 text-slate-700 shrink-0" aria-hidden="true" />
                        <span className="flex-1 font-medium text-slate-800">{item.title}</span>

                        {isQuiz ? (
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-600 text-xs font-semibold tracking-wide whitespace-nowrap">
                              {item.questions ?? 0} QUESTION
                            </span>
                            {item.minutes != null && (
                              <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-500 text-xs font-semibold tracking-wide whitespace-nowrap">
                                {item.minutes} MINUTES
                              </span>
                            )}
                          </div>
                        ) : isResource ? (
                          <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-semibold tracking-wide whitespace-nowrap shrink-0">
                            VIEW PDF
                          </span>
                        ) : (
                          <Lock className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />
                        )}
                      </>
                    )

                    if (isClickable) {
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => (isQuiz ? onQuizClick?.(item) : onResourceClick?.(item))}
                          className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-slate-50 cursor-pointer transition-colors"
                        >
                          {rowContent}
                        </button>
                      )
                    }

                    return (
                      <div key={item.id} className="flex items-center gap-4 px-6 py-5">
                        {rowContent}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
