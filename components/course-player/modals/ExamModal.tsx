'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useExamProgress } from '@/hooks/useExamProgress'
import type { ExamData } from '@/lib/mock-exam-data'

interface ExamModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  exam: ExamData | null
}

export function ExamModal({ open, onOpenChange, exam }: ExamModalProps) {
  const { progress, setAnswer, setCurrentIndex, reset } = useExamProgress(exam?.id ?? null)

  if (!exam) return null

  const currentIndex = Math.min(progress.currentIndex, exam.questions.length - 1)
  const currentQuestion = exam.questions[currentIndex]
  const isLast = currentIndex === exam.questions.length - 1
  const answeredValue = progress.answers[currentQuestion.id]

  const handleSubmit = () => {
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full h-full max-w-none sm:max-w-none sm:h-screen sm:rounded-none p-0 gap-0 flex flex-col [&>button]:text-white [&>button]:opacity-100 [&>button]:hover:bg-white/10 [&>button]:rounded-full [&>button]:top-4 [&>button]:right-4">
        <DialogHeader className="bg-primary text-primary-foreground px-4 py-4 space-y-3">
          <DialogTitle className="text-primary-foreground text-base font-semibold">{exam.title}</DialogTitle>
          <div role="tablist" aria-label="Question navigator" className="flex items-center justify-center gap-2 flex-wrap">
            {exam.questions.map((q, idx) => {
              const isActive = idx === currentIndex
              const isAnswered = Boolean(progress.answers[q.id])
              return (
                <button
                  key={q.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Question ${idx + 1}${isAnswered ? ', answered' : ', not answered'}`}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-8 h-8 rounded-full text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-white text-primary'
                      : isAnswered
                        ? 'bg-white/70 text-primary'
                        : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {idx + 1}
                </button>
              )
            })}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <fieldset>
            <legend className="text-lg font-semibold text-slate-900 mb-4">{currentQuestion.text}</legend>
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const optionId = `${currentQuestion.id}-opt-${idx}`
                const checked = answeredValue === option
                return (
                  <label
                    key={optionId}
                    htmlFor={optionId}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      checked ? 'border-primary bg-primary/5' : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      id={optionId}
                      name={`question-${currentQuestion.id}`}
                      value={option}
                      checked={checked}
                      onChange={() => setAnswer(currentQuestion.id, option)}
                      className="w-4 h-4"
                    />
                    <span className="text-slate-800">{option}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>
        </div>

        <div className="flex items-center justify-between gap-3 p-4 border-t border-slate-200">
          <Button
            type="button"
            variant="outline"
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
          >
            Previous
          </Button>
          <span className="text-sm text-slate-500">
            Question {currentIndex + 1} of {exam.questions.length}
          </span>
          {isLast ? (
            <Button type="button" onClick={handleSubmit} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Submit Exam
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => setCurrentIndex(Math.min(exam.questions.length - 1, currentIndex + 1))}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Next
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
