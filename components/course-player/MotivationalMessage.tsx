'use client'

import { getMotivationalMessage } from '@/lib/motivational-messages'

interface MotivationalMessageProps {
  progressPercentage: number
}

export function MotivationalMessage({ progressPercentage }: MotivationalMessageProps) {
  const motivationalData = getMotivationalMessage(progressPercentage)

  return (
    <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border border-blue-200">
      <div className="text-center">
        <p className="text-lg font-semibold text-slate-800 mb-3">
          {motivationalData.message}
        </p>
        <p className="text-2xl text-slate-600 font-mono">
          {motivationalData.emoticon}
        </p>
      </div>
    </div>
  )
}
