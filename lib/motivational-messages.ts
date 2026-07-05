export type StudentLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert'

export interface MotivationalMessage {
  message: string
  emoticon: string
  level: StudentLevel
}

// Written in the voice of Eng. Ali Shaheen - encouraging, a little pushy, always in
// plain keyboard emoticons (no Unicode emoji), matching the course's playful tone.
const motivationalMessages: MotivationalMessage[] = [
  // Beginner Messages (0-20%)
  { level: 'beginner', message: 'You got this! Every expert was once a beginner. Keep pushing forward!', emoticon: ':)' },
  { level: 'beginner', message: 'Welcome to your journey! Small steps lead to big achievements.', emoticon: ':D' },
  { level: 'beginner', message: "You're stronger than you think. Don't give up now!", emoticon: ':)' },
  { level: 'beginner', message: "Starting is half the battle. You're doing amazing!", emoticon: '^_^' },
  { level: 'beginner', message: 'Every question you ask brings you closer to mastery.', emoticon: ':)' },

  // Intermediate Messages (21-50%)
  { level: 'intermediate', message: "Keep pushing! You're building real skills now. Don't lose momentum!", emoticon: 'o_o' },
  { level: 'intermediate', message: 'Your progress is real. Keep grinding, the breakthrough is coming!', emoticon: '(Y)' },
  { level: 'intermediate', message: "You're halfway there! This is where it gets interesting.", emoticon: ':)' },
  { level: 'intermediate', message: "The struggle is the path. You're exactly where you need to be.", emoticon: ':]' },
  { level: 'intermediate', message: "Consistency beats intensity. You're building something real.", emoticon: '^_^' },

  // Advanced Messages (51-80%)
  { level: 'advanced', message: "You're in the zone now! Time to master the fundamentals completely.", emoticon: '|:)' },
  { level: 'advanced', message: 'Advanced learner alert! Challenge yourself - go deeper, go harder.', emoticon: ':O' },
  { level: 'advanced', message: "You've earned this level. Now show the world what you're made of!", emoticon: '8-)' },
  { level: 'advanced', message: 'Excellence is a habit, not a destination. Keep raising your standards.', emoticon: ':]' },
  { level: 'advanced', message: "You're operating at a higher level now. Don't settle - DOMINATE!", emoticon: '|:O' },

  // Expert Messages (81-100%)
  { level: 'expert', message: "You're unstoppable! You've achieved mastery. Now teach others!", emoticon: ':D' },
  { level: 'expert', message: "CHAMPION! You didn't just learn - you conquered. Legend status unlocked!", emoticon: '\\O/' },
  { level: 'expert', message: "You've reached the summit. Share your knowledge with the world!", emoticon: ':D' },
  { level: 'expert', message: 'Expert level achieved! You are the master now. Keep inspiring others!', emoticon: '\\(^_^)/' },
  { level: 'expert', message: "You didn't just finish - you dominated! This is just the beginning!", emoticon: ':]' },
]

export function getStudentLevel(progressPercentage: number): StudentLevel {
  if (progressPercentage <= 20) return 'beginner'
  if (progressPercentage <= 50) return 'intermediate'
  if (progressPercentage <= 80) return 'advanced'
  return 'expert'
}

/**
 * Deterministic (not random) so the result is stable across server and client
 * render passes for the same progressPercentage - avoids a hydration mismatch.
 */
export function getMotivationalMessage(progressPercentage: number): MotivationalMessage {
  const level = getStudentLevel(progressPercentage)
  const levelMessages = motivationalMessages.filter((m) => m.level === level)
  const index = progressPercentage % levelMessages.length
  return levelMessages[index]
}
