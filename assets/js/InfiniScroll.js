console.clear();

const OFFSET = 10;
const EXTRA_INSET = 2;
const MIN_START_RATIO = 0.8;
const MIN_THUMB = 20;
const STAR_SIZE = 11;
const STAR_COUNT = 5;
const DOT_COUNT = 11;
const DOT_SIZE = 1.27;
const STAR_COLOR = '#FF006A';
const FLICKER_INTERVAL = 127; // ms between dot flickers

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

  const thumbGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  thumbGroup.classList.add('scrollbar-thumb');
  svg.appendChild(thumbGroup);

  container.appendChild(svg);

  let pathLength = 0;
  let thumbLength = 50;

  const stars = [];
  const dots = [];

  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElementNS("http://www.w3.org/2000/svg", "path");
    star.setAttribute('fill', STAR_COLOR);
    thumbGroup.appendChild(star);
    stars.push(star);
  }

  for (let i = 0; i < DOT_COUNT; i++) {
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute('r', DOT_SIZE);
    dot.setAttribute('fill', STAR_COLOR);
    thumbGroup.appendChild(dot);
    dots.push(dot);
  }

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

    requestScrollUpdate();
  }

  function createStarPath(cx, cy, spikes, outerRadius, innerRadius) {
    const step = Math.PI / spikes;
    let path = "";
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? outerRadius : innerRadius;
      const x = cx + Math.cos(i * step - Math.PI / 2) * r;
      const y = cy + Math.sin(i * step - Math.PI / 2) * r;
      path += i === 0 ? `M${x},${y}` : `L${x},${y}`;
    }
    return path + "Z";
  }

  let scrollPending = false;
  function requestScrollUpdate() {
    if (!scrollPending) {
      scrollPending = true;
      requestAnimationFrame(() => {
        updateThumb();
        scrollPending = false;
      });
    }
  }

  function updateThumb() {
    const scrollableHeight = content.scrollHeight - content.clientHeight || 1;
    const scrollRatio = content.scrollTop / scrollableHeight;
    const startOffset = (pathLength - thumbLength) * scrollRatio;
    const endOffset = startOffset + thumbLength;
    const span = endOffset - startOffset;

    // Stars (solid)
    for (let i = 0; i < STAR_COUNT; i++) {
      const t = startOffset + (span * (i / (STAR_COUNT - 1)));
      const p = trackPath.getPointAtLength(t);
      stars[i].setAttribute('d', createStarPath(p.x, p.y, 5, STAR_SIZE / 2, STAR_SIZE / 4));
      stars[i].setAttribute('fill', STAR_COLOR);
      stars[i].setAttribute('opacity', 1);
    }

    // Dots (casino flicker, position randomized per frame)
    for (let i = 0; i < DOT_COUNT; i++) {
      const t = startOffset + (thumbLength * (i / DOT_COUNT));
      const p = trackPath.getPointAtLength(t);
      const dot = dots[i];
      dot.setAttribute('cx', p.x);
      dot.setAttribute('cy', p.y);
    }
  }

  // Dragging
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

  content.addEventListener('scroll', requestScrollUpdate);
  window.addEventListener('resize', updatePath);
  const resizeObserver = new ResizeObserver(updatePath);
  resizeObserver.observe(container);

  updatePath();

  // Dot flicker loop (throttled for speed)
  function animateFlicker() {
    for (const dot of dots) {
      // instant random opacity, controlled interval
      if (Math.random() > 0.5) dot.setAttribute('opacity', 1);
      else dot.setAttribute('opacity', 0.1);
    }
    setTimeout(() => requestAnimationFrame(animateFlicker), FLICKER_INTERVAL);
  }
  animateFlicker();
}
