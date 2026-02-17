'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface CoursePlayerContextType {
  askQuestionOpen: boolean
  setAskQuestionOpen: (open: boolean) => void
  leaderboardOpen: boolean
  setLeaderboardOpen: (open: boolean) => void
  scrollTarget: string | null
  setScrollTarget: (target: string | null) => void
}

const CoursePlayerContext = createContext<CoursePlayerContextType | undefined>(undefined)

export function CoursePlayerProvider({ children }: { children: ReactNode }) {
  const [askQuestionOpen, setAskQuestionOpen] = useState(false)
  const [leaderboardOpen, setLeaderboardOpen] = useState(false)
  const [scrollTarget, setScrollTarget] = useState<string | null>(null)

  return (
    <CoursePlayerContext.Provider
      value={{
        askQuestionOpen,
        setAskQuestionOpen,
        leaderboardOpen,
        setLeaderboardOpen,
        scrollTarget,
        setScrollTarget,
      }}
    >
      {children}
    </CoursePlayerContext.Provider>
  )
}

export function useCoursePlayerState() {
  const context = useContext(CoursePlayerContext)
  if (!context) {
    throw new Error('useCoursePlayerState must be used within CoursePlayerProvider')
  }
  return context
}
