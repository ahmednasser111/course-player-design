export interface MotivationalMessage {
  message: string
  emoticon: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

const motivationalMessages: MotivationalMessage[] = [
  // Beginner Messages (0-20%)
  {
    level: 'beginner',
    message: "You got this! Every expert was once a beginner. Keep pushing forward!",
    emoticon: ":) <lightbulb emoji description>"
  },
  {
    level: 'beginner',
    message: "Welcome to your journey! Small steps lead to big achievements.",
    emoticon: ":D <happy face with big smile>"
  },
  {
    level: 'beginner',
    message: "You're stronger than you think. Don't give up now!",
    emoticon: ":) <determined face>"
  },
  {
    level: 'beginner',
    message: "Starting is half the battle. You're doing amazing!",
    emoticon: "^_^ <cheerful eyes>"
  },
  {
    level: 'beginner',
    message: "Every question you ask brings you closer to mastery.",
    emoticon: ":) <thinking face>"
  },

  // Intermediate Messages (21-50%)
  {
    level: 'intermediate',
    message: "Keep pushing! You're building real skills now. Don't lose momentum!",
    emoticon: "o_o <determined look>"
  },
  {
    level: 'intermediate',
    message: "Your progress is real. Keep grinding, the breakthrough is coming!",
    emoticon: "(Y) <thumbs up>"
  },
  {
    level: 'intermediate',
    message: "You're halfway there! This is where it gets interesting.",
    emoticon: "💪 <muscle>"
  },
  {
    level: 'intermediate',
    message: "The struggle is the path. You're exactly where you need to be.",
    emoticon: ":] <slight smile>"
  },
  {
    level: 'intermediate',
    message: "Consistency beats intensity. You're building something real.",
    emoticon: "^_^ <eyes up>"
  },

  // Advanced Messages (51-80%)
  {
    level: 'advanced',
    message: "You're in the zone now! Time to master the fundamentals completely.",
    emoticon: "|:) <focused face>"
  },
  {
    level: 'advanced',
    message: "Advanced learner alert! Challenge yourself - go deeper, go harder.",
    emoticon: ":O <ambitious>"
  },
  {
    level: 'advanced',
    message: "You've earned this level. Now show the world what you're made of!",
    emoticon: "8-) <confident>"
  },
  {
    level: 'advanced',
    message: "Excellence is a habit, not a destination. Keep raising your standards.",
    emoticon: ":] <satisfied>"
  },
  {
    level: 'advanced',
    message: "You're operating at a higher level now. Don't settle - DOMINATE!",
    emoticon: "|:O <fierce>"
  },

  // Expert Messages (81-100%)
  {
    level: 'expert',
    message: "You're unstoppable! You've achieved mastery. Now teach others!",
    emoticon: ":D <ultimate satisfaction>"
  },
  {
    level: 'expert',
    message: "CHAMPION! You didn't just learn - you conquered. Legend status unlocked!",
    emoticon: "\\O/ <celebration>"
  },
  {
    level: 'expert',
    message: "You've reached the summit. Share your knowledge with the world!",
    emoticon: ":D <triumphant>"
  },
  {
    level: 'expert',
    message: "Expert level achieved! You are the master now. Keep inspiring others!",
    emoticon: "\\(^_^)/ <ultimate victory>"
  },
  {
    level: 'expert',
    message: "You didn't just finish - you dominated! This is just the beginning!",
    emoticon: ":] <boundless confidence>"
  }
]

export function getMotivationalMessage(progressPercentage: number): MotivationalMessage {
  let level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  
  if (progressPercentage <= 20) {
    level = 'beginner'
  } else if (progressPercentage <= 50) {
    level = 'intermediate'
  } else if (progressPercentage <= 80) {
    level = 'advanced'
  } else {
    level = 'expert'
  }

  const levelMessages = motivationalMessages.filter(m => m.level === level)
  const randomIndex = Math.floor(Math.random() * levelMessages.length)
  
  return levelMessages[randomIndex]
}
