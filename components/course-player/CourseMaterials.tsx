import { User, Clock, Layers, Users, Globe } from 'lucide-react'

export interface CourseMaterialsInfo {
  instructor: string
  duration: string
  lessons: number
  enrolled: number
  language: string
}

export function CourseMaterials({ instructor, duration, lessons, enrolled, language }: CourseMaterialsInfo) {
  const items = [
    { icon: User, label: 'Instructor', value: instructor },
    { icon: Clock, label: 'Duration', value: duration },
    { icon: Layers, label: 'Lessons', value: lessons },
    { icon: Users, label: 'Enrolled', value: `${enrolled} students` },
    { icon: Globe, label: 'Language', value: language },
  ]

  return (
    <section aria-labelledby="course-materials-heading">
      <h2 id="course-materials-heading" className="text-2xl font-bold text-slate-900 mb-6">
        Course Materials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 bg-slate-50">
            <Icon className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="text-xs text-slate-500">{label}</p>
              <p className="font-semibold text-slate-900">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
