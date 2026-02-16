'use client'

import { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface Comment {
  id: string
  author: string
  date: string
  content: string
  avatar?: string
}

interface CommentsSectionProps {
  comments: Comment[]
  ref?: React.RefObject<HTMLDivElement>
}

export function CommentsSection({ comments, ref }: CommentsSectionProps) {
  const [newComment, setNewComment] = useState('')
  const [displayComments, setDisplayComments] = useState(comments)

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      author: 'You',
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      content: newComment,
      avatar: undefined,
    }

    setDisplayComments([comment, ...displayComments])
    setNewComment('')
  }

  return (
    <div ref={ref} className="w-full">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Comments</h2>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-8 p-6 bg-slate-50 rounded-lg border border-slate-200">
        <label className="block text-sm font-medium text-slate-700 mb-3">
          Write a comment
        </label>
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts on this course..."
          rows={3}
          className="mb-3 resize-none"
        />
        <Button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white"
          disabled={!newComment.trim()}
        >
          Submit Review
        </Button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {displayComments.map((comment) => (
          <div key={comment.id} className="flex gap-4 pb-6 border-b border-slate-200 last:border-b-0">
            <Avatar className="w-10 h-10 flex-shrink-0">
              <AvatarImage src={comment.avatar} alt={comment.author} />
              <AvatarFallback className="bg-blue-500 text-white">
                {comment.author.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-slate-900">{comment.author}</p>
                <p className="text-xs text-slate-500">{comment.date}</p>
              </div>
              <p className="text-slate-700 leading-relaxed">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      {displayComments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  )
}
