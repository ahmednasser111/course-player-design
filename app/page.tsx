'use client'

import { CoursePlayer } from '@/components/course-player/CoursePlayer'
import { CoursePlayerProvider } from '@/hooks/useCoursePlayerState'

// Mock data for demonstration
const mockCurriculum = [
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
      {
        id: '2',
        title: 'Course Overview',
        duration: '08 min',
        type: 'lesson' as const,
        completed: true,
      },
      {
        id: '3',
        title: 'Course Overview Quiz',
        questions: 5,
        type: 'quiz' as const,
      },
      {
        id: '4',
        title: 'Course Exercise / Reference Files',
        duration: '08 min',
        type: 'lesson' as const,
      },
      {
        id: '5',
        title: 'Code Editor Installation (Optional)',
        duration: '08 min',
        type: 'lesson' as const,
      },
      {
        id: '6',
        title: 'Embedding PHP in HTML',
        duration: '10 min',
        type: 'lesson' as const,
      },
    ],
  },
  {
    week: 'Week 5-8',
    items: [
      {
        id: '7',
        title: 'Defining functions',
        duration: '08 min',
        type: 'lesson' as const,
      },
      {
        id: '8',
        title: 'Function Parameters',
        duration: '08 min',
        type: 'lesson' as const,
      },
      {
        id: '9',
        title: 'Return Values From Functions',
        duration: '10 min',
        questions: 2,
        type: 'quiz' as const,
      },
      {
        id: '10',
        title: 'Global Variable and Scope',
        duration: '08 min',
        type: 'lesson' as const,
      },
      {
        id: '11',
        title: 'Newer Way of creating a Constant',
        duration: '08 min',
        type: 'lesson' as const,
      },
      {
        id: '12',
        title: 'Constants',
        duration: '08 min',
        type: 'lesson' as const,
      },
    ],
  },
]

const mockComments = [
  {
    id: '1',
    author: 'Student Name Goes Here',
    date: 'Oct 10, 2021',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    avatar: undefined,
  },
  {
    id: '2',
    author: 'Student Name Goes Here',
    date: 'Oct 15, 2021',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    avatar: undefined,
  },
  {
    id: '3',
    author: 'Student Name Goes Here',
    date: 'Oct 19, 2021',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    avatar: undefined,
  },
]

export default function Page() {
  return (
    <CoursePlayerProvider>
      <CoursePlayer
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
        courseName="Starting SEO as your Home"
        progressPercentage={45}
        curriculum={mockCurriculum}
        comments={mockComments}
      />
    </CoursePlayerProvider>
  )
}
