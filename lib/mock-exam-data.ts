export interface ExamQuestion {
  id: string
  text: string
  options: string[]
}

export interface ExamData {
  id: string
  title: string
  questions: ExamQuestion[]
}

const examQuestionBank: Record<string, ExamQuestion[]> = {
  '3': [
    {
      id: 'q1',
      text: 'What does HTML stand for?',
      options: [
        'Hyper Trainer Marking Language',
        'Hyper Text Markup Language',
        'Hyper Text Marketing Language',
        'Hyper Text Markup Leveler',
      ],
    },
    {
      id: 'q2',
      text: 'Which tag is used to link an external CSS file?',
      options: ['<style>', '<script>', '<link>', '<css>'],
    },
    {
      id: 'q3',
      text: 'Which of the following runs directly in the browser?',
      options: ['PHP', 'JavaScript', 'SQL', 'Python'],
    },
    {
      id: 'q4',
      text: 'What does CSS stand for?',
      options: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'],
    },
    {
      id: 'q5',
      text: 'Which company originally developed React?',
      options: ['Google', 'Microsoft', 'Meta (Facebook)', 'Amazon'],
    },
  ],
  '9': [
    {
      id: 'q1',
      text: 'Which keyword returns a value from a JavaScript function?',
      options: ['give', 'return', 'output', 'yield'],
    },
    {
      id: 'q2',
      text: 'What does a function return if no return statement is used?',
      options: ['null', 'undefined', '0', 'an error'],
    },
  ],
}

export function getExamById(id: string, title: string, questionCount?: number): ExamData | null {
  const questions = examQuestionBank[id]
  if (!questions) return null
  return {
    id,
    title,
    questions: questionCount ? questions.slice(0, questionCount) : questions,
  }
}
