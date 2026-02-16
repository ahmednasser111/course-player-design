import { useState, useCallback } from 'react'

export interface QuestionDraft {
  title: string
  description: string
}

const DRAFT_STORAGE_KEY = 'course-ask-question-draft'

export function useAskQuestionDraft() {
  const [draft, setDraft] = useState<QuestionDraft>(() => {
    try {
      const stored = sessionStorage.getItem(DRAFT_STORAGE_KEY)
      return stored ? JSON.parse(stored) : { title: '', description: '' }
    } catch {
      return { title: '', description: '' }
    }
  })

  const saveDraft = useCallback((newDraft: QuestionDraft) => {
    setDraft(newDraft)
    try {
      sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(newDraft))
    } catch (error) {
      console.error('Failed to save draft:', error)
    }
  }, [])

  const clearDraft = useCallback(() => {
    setDraft({ title: '', description: '' })
    try {
      sessionStorage.removeItem(DRAFT_STORAGE_KEY)
    } catch (error) {
      console.error('Failed to clear draft:', error)
    }
  }, [])

  return { draft, saveDraft, clearDraft }
}
