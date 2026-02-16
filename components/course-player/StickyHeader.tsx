'use client'

import { ReactNode } from 'react'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface StickyHeaderProps {
  children: ReactNode
  onBack?: () => void
}

export function StickyHeader({ children, onBack }: StickyHeaderProps) {
  return (
    <div className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex items-center gap-2 p-3 bg-white">
        {onBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2 h-auto"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
        )}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
