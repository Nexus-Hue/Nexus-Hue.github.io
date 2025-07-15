
  document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector('.NH-background-video-wrapper video');
    const stars = document.querySelector('.line-shape');

    if (!video || !stars) return;

    // Initially hide stars until video plays
    stars.style.display = 'none';

    video.addEventListener('playing', () => {
      stars.style.display = 'block';
    });

    video.addEventListener('stalled', () => {
      stars.style.display = 'none';
    });

    // Also handle pause or waiting events to hide stars
    video.addEventListener('pause', () => {
      stars.style.display = 'none';
    });

    video.addEventListener('waiting', () => {
      stars.style.display = 'none';
    });

    // Just in case video is already playing on load
    if (!video.paused && !video.readyState < 3) {
      stars.style.display = 'block';
    }
  });

