'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface Comment {
  id: string
  author: string
  date: string
  content: string
  avatar?: string
  rating?: number
}

interface CommentsSectionProps {
  comments: Comment[]
  ref?: React.RefObject<HTMLDivElement | null>
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={i < rating ? 'w-4 h-4 text-amber-400 fill-amber-400' : 'w-4 h-4 text-slate-200 fill-slate-200'}
          aria-hidden="true"
        />
      ))}
    </div>
  )
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
      rating: 5,
    }

    setDisplayComments([comment, ...displayComments])
    setNewComment('')
  }

  return (
    <div
      ref={ref}
      tabIndex={-1}
      className="w-full scroll-mt-20 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Comments</h2>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-8 p-6 bg-slate-50 rounded-lg border border-slate-200">
        <label htmlFor="new-comment" className="block text-sm font-medium text-slate-700 mb-3">
          Write a comment
        </label>
        <Textarea
          id="new-comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts on this course..."
          rows={3}
          className="mb-3 resize-none"
        />
        <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white" disabled={!newComment.trim()}>
          Submit Review
        </Button>
      </form>

      {/* Comments List */}
      <div className="divide-y divide-slate-200">
        {displayComments.map((comment) => (
          <div key={comment.id} className="flex gap-4 py-6 first:pt-0">
            <Avatar className="w-14 h-14 flex-shrink-0">
              <AvatarImage src={comment.avatar} alt={comment.author} />
              <AvatarFallback className="bg-blue-500 text-white">
                {comment.author.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <StarRating rating={comment.rating ?? 5} />
              <p className="text-sm text-slate-500 mt-2">{comment.date}</p>
              <p className="text-slate-600 leading-relaxed mt-3">{comment.content}</p>
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
