// Click-to-load video. Nothing from YouTube or Vimeo is requested until the visitor clicks.

export function videoEmbedSrc(provider: string, videoId: string): string | undefined {
  if (!/^[\w-]+$/.test(videoId)) return undefined;
  if (provider === 'youtube') return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
  if (provider === 'vimeo') return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
  return undefined;
}

export function initVideoFacades(doc: Document): void {
  for (const button of doc.querySelectorAll<HTMLElement>('[data-video-facade]')) {
    button.addEventListener(
      'click',
      () => {
        const src = videoEmbedSrc(button.dataset.provider ?? '', button.dataset.videoId ?? '');
        if (!src) return;
        const frame = doc.createElement('iframe');
        frame.src = src;
        frame.title = button.dataset.title ?? 'Video';
        frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        frame.setAttribute('allowfullscreen', '');
        (button.parentElement as HTMLElement).replaceChildren(frame);
        frame.focus();
      },
      { once: true },
    );
  }
}
