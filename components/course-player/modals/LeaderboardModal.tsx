'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useCoursePlayerState } from '@/hooks/useCoursePlayerState'
import { MotivationalMessage } from '../MotivationalMessage'
import { Award, Trophy } from 'lucide-react'

interface LeaderboardEntry {
  rank: number
  name: string
  points: number
  avatar?: string
}

interface LeaderboardModalProps {
  courseName?: string
  progressPercentage?: number
  entries?: LeaderboardEntry[]
}

export function LeaderboardModal({
  courseName = 'Course Name',
  progressPercentage = 45,
  entries = [
    { rank: 1, name: 'Ahmed Hassan', points: 2450 },
    { rank: 2, name: 'Fatima Al-Zahra', points: 2380 },
    { rank: 3, name: 'Muhammad Ali', points: 2310 },
    { rank: 4, name: 'Aisha Mohammed', points: 2190 },
    { rank: 5, name: 'Omar Al-Khattab', points: 2085 },
    { rank: 6, name: 'Zainab Ibrahim', points: 1950 },
  ],
}: LeaderboardModalProps) {
  const { leaderboardOpen, setLeaderboardOpen } = useCoursePlayerState()

  return (
    <Dialog open={leaderboardOpen} onOpenChange={setLeaderboardOpen}>
      <DialogContent className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">{courseName}</DialogTitle>
          <p className="text-center text-lg font-bold text-blue-600 mt-2">Leaderboard</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Motivational Message */}
          <MotivationalMessage progressPercentage={progressPercentage} />

          {/* Leaderboard List */}
          <div className="space-y-3">
            {entries.map((entry) => (
              <div
                key={entry.rank}
                className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-white ${
                      entry.rank === 1
                        ? 'bg-yellow-500'
                        : entry.rank === 2
                          ? 'bg-slate-400'
                          : entry.rank === 3
                            ? 'bg-orange-600'
                            : 'bg-blue-500'
                    }`}
                  >
                    {entry.rank <= 3 ? (
                      <Trophy className="w-5 h-5" />
                    ) : (
                      <span>{entry.rank}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{entry.name}</p>
                    <p className="text-sm text-slate-600">{entry.points} points</p>
                  </div>
                </div>
                {entry.rank <= 3 && (
                  <Award className="w-5 h-5 text-yellow-500" />
                )}
              </div>
            ))}
          </div>

          {/* Close Button */}
          <Button
            onClick={() => setLeaderboardOpen(false)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
