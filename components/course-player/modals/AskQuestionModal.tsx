'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useAskQuestionDraft } from '@/hooks/useAskQuestionDraft'
import { useCoursePlayerState } from '@/hooks/useCoursePlayerState'

export function AskQuestionModal() {
  const { askQuestionOpen, setAskQuestionOpen } = useCoursePlayerState()
  const { draft, saveDraft, clearDraft } = useAskQuestionDraft()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  // Load draft when modal opens
  useEffect(() => {
    if (askQuestionOpen && draft.title) {
      setTitle(draft.title)
      setDescription(draft.description)
    }
  }, [askQuestionOpen, draft])

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Save draft when closing
      saveDraft({ title, description })
    }
    setAskQuestionOpen(open)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the question to your backend
    console.log('Submitting question:', { title, description })
    clearDraft()
    setTitle('')
    setDescription('')
    setAskQuestionOpen(false)
  }

  return (
    <Dialog open={askQuestionOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ask a Question</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Question Title
            </label>
            <Input
              placeholder="What's your question about?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Question Description
            </label>
            <Textarea
              placeholder="Provide more details about your question..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="w-full resize-none"
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Post Question
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
