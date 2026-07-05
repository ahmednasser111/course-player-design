'use client'

import { useCallback, useEffect, useState } from 'react'

interface ExamProgressState {
  currentIndex: number
  answers: Record<string, string>
}

const STORAGE_PREFIX = 'course-exam-progress-'
const DEFAULT_PROGRESS: ExamProgressState = { currentIndex: 0, answers: {} }

function loadProgress(examId: string): ExamProgressState {
  try {
    const stored = sessionStorage.getItem(STORAGE_PREFIX + examId)
    return stored ? JSON.parse(stored) : DEFAULT_PROGRESS
  } catch {
    return DEFAULT_PROGRESS
  }
}

function saveProgress(examId: string, state: ExamProgressState) {
  try {
    sessionStorage.setItem(STORAGE_PREFIX + examId, JSON.stringify(state))
  } catch {
    // sessionStorage unavailable (private browsing, etc.) - progress just won't persist.
  }
}

/** Persists exam answers + current question per exam id so reopening resumes where the student left off. */
export function useExamProgress(examId: string | null) {
  const [progress, setProgress] = useState<ExamProgressState>(DEFAULT_PROGRESS)

  useEffect(() => {
    setProgress(examId ? loadProgress(examId) : DEFAULT_PROGRESS)
  }, [examId])

  const setAnswer = useCallback(
    (questionId: string, value: string) => {
      if (!examId) return
      setProgress((prev) => {
        const next = { ...prev, answers: { ...prev.answers, [questionId]: value } }
        saveProgress(examId, next)
        return next
      })
    },
    [examId],
  )

  const setCurrentIndex = useCallback(
    (index: number) => {
      if (!examId) return
      setProgress((prev) => {
        const next = { ...prev, currentIndex: index }
        saveProgress(examId, next)
        return next
      })
    },
    [examId],
  )

  const reset = useCallback(() => {
    if (!examId) return
    try {
      sessionStorage.removeItem(STORAGE_PREFIX + examId)
    } catch {
      // ignore
    }
    setProgress(DEFAULT_PROGRESS)
  }, [examId])

  return { progress, setAnswer, setCurrentIndex, reset }
}
