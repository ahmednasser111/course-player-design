'use client'

import { useEffect, useRef, useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { getStudentLevel } from '@/lib/motivational-messages'

interface CourseProgressProps {
  progressPercentage: number
}

/**
 * The fill animation only starts once this widget scrolls into view, rather than on
 * mount, so it reads as a deliberate reveal instead of firing off-screen.
 */
export function CourseProgress({ progressPercentage }: CourseProgressProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [animatedValue, setAnimatedValue] = useState(0)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimatedValue(progressPercentage)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [progressPercentage])

  const level = getStudentLevel(progressPercentage)

  return (
    <div ref={containerRef} className="bg-slate-50 rounded-lg p-6 border border-slate-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-900">Course Progress</h3>
        <span className="text-xs font-semibold uppercase tracking-wide text-primary">{level}</span>
      </div>
      <Progress
        value={animatedValue}
        aria-label="Course progress"
        aria-valuenow={progressPercentage}
        className="h-2 [&>div]:transition-[transform] [&>div]:duration-1000 [&>div]:ease-out"
      />
      <p className="text-sm text-slate-600 mt-2">{progressPercentage}% complete</p>
    </div>
  )
}
