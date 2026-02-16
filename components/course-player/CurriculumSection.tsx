'use client'

import { useState } from 'react'
import { ChevronDown, PlayCircle, HelpCircle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

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

interface CurriculumSectionProps {
  weeks: CurriculumWeek[]
  isMobile?: boolean
  ref?: React.RefObject<HTMLDivElement>
}

export function CurriculumSection({
  weeks,
  isMobile = false,
  ref,
}: CurriculumSectionProps) {
  const [expandedWeeks, setExpandedWeeks] = useState<Set<string>>(new Set(['week-1']))

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
    <div ref={ref} className="w-full">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Curriculum</h2>

      <div className="space-y-4">
        {weeks.map((weekGroup, idx) => {
          const weekId = `week-${idx}`
          const isExpanded = expandedWeeks.has(weekId)

          return (
            <div key={weekId} className="border border-slate-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleWeek(weekId)}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
              >
                <h3 className="font-semibold text-slate-900">{weekGroup.week}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-slate-600 transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isExpanded && (
                <div className="border-t border-slate-200 bg-slate-50">
                  {weekGroup.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 p-4 border-b last:border-b-0 border-slate-200 hover:bg-white transition-colors"
                    >
                      <div className="mt-1">
                        {item.type === 'quiz' ? (
                          <HelpCircle className="w-5 h-5 text-orange-500" />
                        ) : (
                          <PlayCircle className="w-5 h-5 text-blue-500" />
                        )}
                      </div>

                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{item.title}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                          {item.duration && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {item.duration}
                            </div>
                          )}
                          {item.questions && (
                            <div className="flex items-center gap-1">
                              <HelpCircle className="w-4 h-4" />
                              {item.questions} questions
                            </div>
                          )}
                        </div>
                      </div>

                      {item.completed && (
                        <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
