import React from 'react';

interface YouTubeVideoProps {
  videoId: string;
  title?: string;
  width?: number | string;
  height?: number | string;
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
}

export function YouTubeVideo({
  videoId,
  title = 'YouTube video',
  width = 560,
  height = 315,
  autoplay = false,
  muted = false,
  controls = true,
  className = '',
}: YouTubeVideoProps) {
  // Construct the YouTube embed URL with parameters
  const embedUrl = new URL(`https://www.youtube.com/embed/${videoId}`);

  if (autoplay) embedUrl.searchParams.set('autoplay', '1');
  if (muted) embedUrl.searchParams.set('mute', '1');
  if (!controls) embedUrl.searchParams.set('controls', '0');

  return (
    <div className={`youtube-video-container ${className}`}>
      <iframe
        width={width}
        height={height}
        src={embedUrl.toString()}
        title={title}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowFullScreen
        className='rounded-lg shadow-lg'
      />
    </div>
  );
}

// Helper function to extract video ID from various YouTube URL formats
export function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

// Responsive YouTube component that maintains aspect ratio
export function ResponsiveYouTubeVideo({
  videoId,
  title,
  autoplay = false,
  muted = false,
  controls = true,
  className = '',
}: Omit<YouTubeVideoProps, 'width' | 'height'>) {
  const embedUrl = new URL(`https://www.youtube.com/embed/${videoId}`);

  if (autoplay) embedUrl.searchParams.set('autoplay', '1');
  if (muted) embedUrl.searchParams.set('mute', '1');
  if (!controls) embedUrl.searchParams.set('controls', '0');

  return (
    <div
      className={`relative w-full pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg ${className}`}
    >
      <iframe
        src={embedUrl.toString()}
        title={title}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowFullScreen
        className='absolute top-0 left-0 w-full h-full'
      />
    </div>
  );
}
