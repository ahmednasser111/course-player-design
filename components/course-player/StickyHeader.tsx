'use client'

import { ReactNode } from 'react'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface StickyHeaderProps {
  children: ReactNode
  onBack?: () => void
}

/**
 * Sticks the player to the top of the viewport below the `lg` breakpoint (YouTube-style
 * mobile/tablet behavior). At `lg` and above the player sits in its normal position in the
 * desktop grid instead, matching the non-sticky desktop design.
 */
export function StickyHeader({ children, onBack }: StickyHeaderProps) {
  return (
    <div className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm lg:static lg:z-auto lg:border-0 lg:shadow-none">
      {onBack && (
        <div className="flex items-center gap-2 p-3 lg:hidden">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-2 h-auto" aria-label="Go back">
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </Button>
        </div>
      )}
      {children}
    </div>
  )
}
