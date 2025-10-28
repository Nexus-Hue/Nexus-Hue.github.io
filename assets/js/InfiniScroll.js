console.clear();

// config
const OFFSET = 7; 
const EXTRA_INSET = 2;
const MIN_START_RATIO = 0.8;
const MIN_THUMB = 97;
const STAR_SIZE = 7; // star radius
const STAR_COUNT = 5; // max 5 stars
const DOT_COUNT = 11; // number of sparkle dots along the thumb
const DOT_SIZE = 2; // radius of sparkle dots
const STAR_COLOR = '#FF006A'; // neon pink

document.querySelectorAll('[data-scrollbar]').forEach(container => {
  initStarScrollbar(container);
});

function initStarScrollbar(container) {
  const content = container.querySelector('.scroll-content');

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add('scrollbar-svg');
  svg.setAttribute('aria-hidden', 'true');

  const trackPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  trackPath.classList.add('scrollbar-track');
  svg.appendChild(trackPath);

  // group for stars and dots
  const thumbGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  thumbGroup.classList.add('scrollbar-thumb');
  svg.appendChild(thumbGroup);

  container.appendChild(svg);

  let pathLength = 0;
  let thumbLength = 50;

  function updatePath() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    const r = parseFloat(getComputedStyle(container).borderRadius) || 0;

    const effectiveRadius = Math.max(r - OFFSET, 0);
    const trackX = w - OFFSET;
    const topY = OFFSET;
    const bottomY = h - OFFSET;
    const cornerX = trackX - effectiveRadius;

    const minStartX = w * MIN_START_RATIO;
    let startX = trackX - effectiveRadius * EXTRA_INSET;
    if (startX < minStartX) startX = minStartX;
    if (startX > cornerX) startX = cornerX;

    const d = `
      M ${startX} ${topY}
      L ${cornerX} ${topY}                     
      A ${effectiveRadius} ${effectiveRadius} 0 0 1 ${trackX} ${topY + effectiveRadius} 
      L ${trackX} ${bottomY - effectiveRadius} 
      A ${effectiveRadius} ${effectiveRadius} 0 0 1 ${cornerX} ${bottomY} 
      L ${startX} ${bottomY}
    `;
    trackPath.setAttribute('d', d);

    pathLength = trackPath.getTotalLength();
    const ratio = content.clientHeight / content.scrollHeight;
    thumbLength = Math.max(MIN_THUMB, pathLength * ratio);

    updateThumb();
  }

  function createStar(cx, cy, spikes, outerRadius, innerRadius) {
    const step = Math.PI / spikes;
    let path = "";
    for (let i = 0; i < 2 * spikes; i++) {
      const r = i % 2 === 0 ? outerRadius : innerRadius;
      const x = cx + Math.cos(i * step - Math.PI/2) * r;
      const y = cy + Math.sin(i * step - Math.PI/2) * r;
      path += i === 0 ? `M${x},${y}` : `L${x},${y}`;
    }
    path += "Z";
    return path;
  }

  function updateThumb() {
    const scrollableHeight = content.scrollHeight - content.clientHeight || 1;
    const scrollRatio = content.scrollTop / scrollableHeight;
    const startOffset = (pathLength - thumbLength) * scrollRatio;
    const endOffset = startOffset + thumbLength;

    // clear previous stars/dots
    while (thumbGroup.firstChild) thumbGroup.removeChild(thumbGroup.firstChild);

    // add stars spaced along the thumb
    for (let i = 0; i < STAR_COUNT; i++) {
      const t = startOffset + ((endOffset - startOffset) / (STAR_COUNT - 1)) * i;
      const p = trackPath.getPointAtLength(t);

      const star = document.createElementNS("http://www.w3.org/2000/svg", "path");
      star.setAttribute('d', createStar(p.x, p.y, 5, STAR_SIZE/2, STAR_SIZE/4));

      // flicker: random between white and neon pink
      const flickerColor = Math.random() > 0.5 ? '#FFFFFF' : STAR_COLOR;
      star.setAttribute('fill', flickerColor);
      thumbGroup.appendChild(star);
    }

    // add tiny flickering dots
    for (let i = 0; i < DOT_COUNT; i++) {
      const t = startOffset + Math.random() * (thumbLength);
      const p = trackPath.getPointAtLength(t);

      const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dot.setAttribute('cx', p.x);
      dot.setAttribute('cy', p.y);
      dot.setAttribute('r', Math.random() * DOT_SIZE);
      dot.setAttribute('fill', STAR_COLOR);
      dot.style.opacity = Math.random();
      thumbGroup.appendChild(dot);
    }
  }

  // ------------------- GRAB-TO-SCROLL -------------------
  let isDragging = false;
  let pointerStartY = 0;
  let scrollStart = 0;

  thumbGroup.addEventListener('pointerdown', e => {
    isDragging = true;
    pointerStartY = e.clientY;
    scrollStart = content.scrollTop;
    thumbGroup.setPointerCapture(e.pointerId);
  });

  thumbGroup.addEventListener('pointermove', e => {
    if (!isDragging) return;

    const delta = e.clientY - pointerStartY;
    const scrollableHeight = content.scrollHeight - content.clientHeight;
    const scrollRatio = delta / (pathLength - thumbLength);

    content.scrollTop = scrollStart + scrollableHeight * scrollRatio;
  });

  thumbGroup.addEventListener('pointerup', e => {
    isDragging = false;
    thumbGroup.releasePointerCapture(e.pointerId);
  });

  thumbGroup.addEventListener('pointerleave', e => {
    isDragging = false;
    thumbGroup.releasePointerCapture(e.pointerId);
  });
  // -------------------------------------------------------

  content.addEventListener('scroll', updateThumb);
  window.addEventListener('resize', updatePath);
  const resizeObserver = new ResizeObserver(updatePath);
  resizeObserver.observe(container);

  // flicker interval for stars
  setInterval(updateThumb, 150);

  updatePath();
}
