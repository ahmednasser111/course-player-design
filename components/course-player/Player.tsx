'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'

interface PlayerProps {
  videoUrl: string
}

function getYouTubeVideoId(videoUrl: string): string | null {
  const match = videoUrl.match(/embed\/([a-zA-Z0-9_-]+)/)
  return match ? match[1] : null
}

/**
 * Renders as a click-to-play facade (thumbnail + play button) until the user interacts,
 * so the actual YouTube iframe - the heaviest thing on the page - never loads on first
 * paint. Sizing is fully controlled by the parent container (aspect-video, fullscreen, etc).
 */
export function Player({ videoUrl }: PlayerProps) {
  const [playing, setPlaying] = useState(false)
  const videoId = getYouTubeVideoId(videoUrl)

  if (!playing && videoId) {
    return (
      <button
        type="button"
        onClick={() => setPlaying(true)}
        className="relative w-full h-full bg-black flex items-center justify-center group"
        aria-label="Play course video"
      >
        <Image
          src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
          alt=""
          fill
          sizes="(min-width: 1024px) 800px, 100vw"
          className="object-cover opacity-80"
        />
        <span className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-white/90 group-hover:bg-white transition-colors">
          <Play className="w-7 h-7 text-slate-900 ml-1" fill="currentColor" aria-hidden="true" />
        </span>
      </button>
    )
  }

  const src = videoId ? `${videoUrl}${videoUrl.includes('?') ? '&' : '?'}autoplay=1` : videoUrl

  return (
    <iframe
      src={src}
      className="w-full h-full"
      allow="autoplay; encrypted-media; picture-in-picture"
      allowFullScreen
      title="Course Video"
      loading="lazy"
      sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
    />
  )
}
