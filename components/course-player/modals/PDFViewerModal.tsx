'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface PdfTarget {
  title: string
  url: string
}

interface PDFViewerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  pdf: PdfTarget | null
}

export function PDFViewerModal({ open, onOpenChange, pdf }: PDFViewerModalProps) {
  if (!pdf) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full h-full max-w-none sm:max-w-none sm:h-screen sm:rounded-none p-0 gap-0 flex flex-col">
        <DialogHeader className="px-4 py-3 border-b border-slate-200">
          <DialogTitle className="text-base">{pdf.title}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 bg-slate-100">
          <iframe src={pdf.url} title={pdf.title} className="w-full h-full" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
