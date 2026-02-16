# Course Player Integration Guide

## Overview

The Course Player is a comprehensive, responsive learning platform component that provides an interactive video player with integrated curriculum navigation, comments, questions, and leaderboard features. It's designed to work seamlessly on both desktop and mobile devices.

## Features

### 1. Responsive Video Player
- **Desktop**: Displays at ~65% width with 400px height in normal mode
- **Mobile**: Uses a sticky header pattern (250px height) that remains fixed during scroll
- **Fullscreen Mode**: Expands to 100% viewport on both platforms
- **Wide Mode** (Desktop only): Expands to full width with content below

### 2. Player Controls
- **Curriculum Button**: Smooth scroll to curriculum section
- **Comments Button**: Smooth scroll to comments section
- **Ask Question**: Opens modal for composing questions with draft persistence
- **Leaderboard**: Opens modal showing rankings with motivational messages
- **Maximize Button**: Toggles fullscreen mode
- **Wide Button** (Desktop only): Expands player to full width

### 3. Mobile-Optimized Experience
- **Sticky Header**: Player remains visible at top while content scrolls below
- **Full-Screen Support**: Works regardless of device orientation
- **Touch-Friendly**: 44px+ touch targets for all interactive elements

### 4. Interactive Sections

#### Curriculum
- Collapsible week-based sections
- Lesson and quiz indicators
- Duration and question counts
- Completion tracking with visual checkmarks

#### Comments
- Display existing comments with avatars and timestamps
- Form to submit new comments
- Comment list updates in real-time

#### Ask Question Modal
- Compose questions with title and description
- Draft auto-saves to sessionStorage
- Reopening modal restores previous draft
- Consistent design with comments

#### Leaderboard Modal
- Display top performers
- Motivational messages based on learner progress level
- Points and ranking visualization

### 5. Motivational System
Messages are dynamically generated based on learner progress:
- **Beginner (0-20%)**: Encouraging, supportive messages
- **Intermediate (21-50%)**: Motivational push for continued effort
- **Advanced (51-80%)**: Challenging, mastery-focused messages
- **Expert (81-100%)**: Celebratory, achievement recognition

Each message includes a plain-text emoticon for visual appeal.

## Installation

### 1. Copy Component Files
All component files are pre-installed in `/components/course-player/`:
```
components/course-player/
├── CoursePlayer.tsx (Main component)
├── Player.tsx
├── PlayerControls.tsx
├── StickyHeader.tsx
├── CurriculumSection.tsx
├── CommentsSection.tsx
├── MotivationalMessage.tsx
└── modals/
    ├── AskQuestionModal.tsx
    └── LeaderboardModal.tsx
```

### 2. Copy Hook Files
State management hooks in `/hooks/`:
```
hooks/
├── useCoursePlayerState.ts
└── useAskQuestionDraft.ts
```

### 3. Copy Utility Files
Helper utilities in `/lib/`:
```
lib/
└── motivational-messages.ts
```

## Usage

### Basic Setup

```tsx
'use client'

import { CoursePlayer } from '@/components/course-player/CoursePlayer'
import { CoursePlayerProvider } from '@/hooks/useCoursePlayerState'

export default function CoursePage() {
  const curriculum = [
    {
      week: 'Week 1-4',
      items: [
        {
          id: '1',
          title: 'Introduction',
          duration: '08 min',
          type: 'lesson' as const,
          completed: true,
        },
        // ... more items
      ],
    },
  ]

  const comments = [
    {
      id: '1',
      author: 'Student Name',
      date: 'Oct 10, 2021',
      content: 'Great course!',
    },
    // ... more comments
  ]

  return (
    <CoursePlayerProvider>
      <CoursePlayer
        videoUrl="https://www.youtube.com/embed/VIDEO_ID"
        courseName="Your Course Title"
        progressPercentage={45}
        curriculum={curriculum}
        comments={comments}
        onBack={() => window.history.back()}
      />
    </CoursePlayerProvider>
  )
}
```

### Props Interface

```typescript
interface CoursePlayerProps {
  videoUrl: string              // Embed URL for video player
  courseName?: string           // Course title (default: 'Course Name')
  progressPercentage?: number   // Learner progress 0-100 (default: 45)
  curriculum?: CurriculumWeek[] // Curriculum structure
  comments?: Comment[]          // Existing comments
  onBack?: () => void           // Back button callback
}

interface CurriculumWeek {
  week: string
  items: CurriculumItem[]
}

interface CurriculumItem {
  id: string
  title: string
  duration?: string
  questions?: number
  type?: 'lesson' | 'quiz'
  completed?: boolean
}

interface Comment {
  id: string
  author: string
  date: string
  content: string
  avatar?: string
}
```

## State Management

### CoursePlayerContext
Manages player mode, modal states, and scroll targets:

```typescript
interface CoursePlayerContextType {
  playerMode: 'normal' | 'wide' | 'fullscreen'
  setPlayerMode: (mode: PlayerMode) => void
  askQuestionOpen: boolean
  setAskQuestionOpen: (open: boolean) => void
  leaderboardOpen: boolean
  setLeaderboardOpen: (open: boolean) => void
  scrollTarget: string | null
  setScrollTarget: (target: string | null) => void
}
```

Use `useCoursePlayerState()` to access context in child components.

### Draft Persistence

Question drafts are stored in `sessionStorage` with key `'course-ask-question-draft'`:

```typescript
const { draft, saveDraft, clearDraft } = useAskQuestionDraft()

// Draft auto-saves when modal closes
// Draft auto-loads when modal reopens
// Draft clears on successful submission
```

## Styling & Customization

### Color Scheme
The component uses Tailwind CSS with the following colors:
- **Primary**: Blue (#3B82F6)
- **Accent**: Green (#16A34A) for buttons
- **Backgrounds**: White (#FFFFFF) and Slate-50 (#F8FAFC)
- **Text**: Slate-900 for headings, Slate-700 for body

### Responsive Breakpoints
```
- Mobile: < 640px (sm)
- Tablet: 640px - 1024px (md, lg)
- Desktop: > 1024px (xl)
```

### Custom Styling
To customize colors, modify component className props or extend Tailwind configuration in `tailwind.config.ts`.

## Accessibility

- All buttons include descriptive labels and ARIA attributes
- Semantic HTML elements (main, section, nav) for screen readers
- Keyboard navigation fully supported
- Color contrast meets WCAG AA standards
- Focus indicators on interactive elements

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (iOS 12+)
- Mobile browsers: ✅ Full support

## Performance Considerations

1. **Lazy Loading**: Curriculum sections load on demand
2. **Smooth Scrolling**: Hardware-accelerated scroll animations
3. **Session Storage**: Efficient draft storage without persistent backend calls
4. **Image Optimization**: Use WebP avatars where possible

## Common Customizations

### Changing Player Size
Modify `Player.tsx` dimensions:
```typescript
// Desktop normal mode
height: '400px'  // Change this value

// Mobile sticky header
height: '250px'  // Change this value
```

### Adding Custom Motivational Messages
Edit `lib/motivational-messages.ts`:
```typescript
{
  level: 'beginner',
  message: "Your custom message here",
  emoticon: ":) <emoticon description>"
},
```

### Custom Video Player
Replace the iframe in `Player.tsx` with your preferred video player (e.g., Vimeo, custom HTML5 video).

## Troubleshooting

### Draft Not Persisting
- Ensure browser allows sessionStorage
- Check browser's incognito/private mode isn't blocking storage
- Verify sessionStorage key matches `'course-ask-question-draft'`

### Sticky Header Not Working
- Verify `useIsMobile()` hook is returning correct value
- Check z-index isn't blocked by parent containers
- Ensure parent container doesn't have `overflow: hidden`

### Smooth Scroll Not Working
- Check browser supports `scrollIntoView({ behavior: 'smooth' })`
- Some browsers may need CSS polyfill for smooth scrolling
- Use `scroll-behavior: smooth` in globals.css as fallback

## API Integration

To connect to a backend:

### Submitting Questions
```typescript
// In AskQuestionModal.tsx handleSubmit()
const response = await fetch('/api/questions', {
  method: 'POST',
  body: JSON.stringify({ title, description }),
})
```

### Loading Comments
```typescript
// In CoursePlayer props
useEffect(() => {
  fetchComments().then(setComments)
}, [courseId])
```

### Fetching Leaderboard
```typescript
// In LeaderboardModal.tsx
useEffect(() => {
  fetchLeaderboard(courseId).then(setEntries)
}, [courseId])
```

## Examples

See `/app/page.tsx` for a complete working example with mock data.

## Support

For issues or questions, refer to the component source files which include detailed comments and TypeScript interfaces.
