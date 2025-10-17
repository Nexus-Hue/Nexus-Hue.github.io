document.addEventListener("DOMContentLoaded", () => {
  const Rain = document.getElementById("Rain");
  if (!Rain) return; // only run if #Rain exists

  const context = Rain.getContext("2d");
  const drops = [];
  const text = [];
  const font_size = 5;
  let densityFactor = 3;
  let columns = Math.floor(window.innerWidth / font_size);

  // mirror effect
  context.translate(window.innerWidth, 0);
  context.scale(-1, 1);

  const chars = "ネクサス★ヒュー".split("");

  // Initialize drops dynamically
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * (window.innerHeight / font_size) - 1;
  }

  let frameCount = 0;

  function draw() {
    frameCount++;
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (frameCount % 97 === 0) {
      context.fillStyle = "rgba(4, 9, 18, 0.5)";
      context.fillRect(0, 0, width, height);
    }

    context.font = font_size + "px 'Sawarabi Mincho', 'Roboto Mono'";
    context.fillStyle = "rgba(3, 6, 13, 0.07)";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "#FFF";
    for (let i = 0; i < drops.length; i++) {
      const x = i * font_size * densityFactor;
      context.fillText(text[i], x, drops[i] * font_size);
    }

    context.fillStyle = "#FF006A";
    for (let i = 0; i < drops.length; i++) {
      drops[i]++;
      text[i] = chars[Math.floor(Math.random() * chars.length)];
      const x = i * font_size * densityFactor;
      context.fillText(text[i], x, drops[i] * font_size);

      if (drops[i] * font_size > Rain.height) {
        drops[i] = Math.random() * (Rain.height / font_size) - 1;
      }
    }
  }

  setInterval(draw, 43);

  let lastWidth = window.innerWidth;

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    Rain.width = width * dpr;
    Rain.height = height * dpr;
    Rain.style.width = width + "px";
    Rain.style.height = height + "px";

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.scale(dpr, dpr);

    if (width >= 1440) densityFactor = 27;
    else if (width >= 1024) densityFactor = 11;
    else densityFactor = 3;

    columns = Math.floor(width / font_size);
    drops.length = columns;
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * (height / font_size) - 1;
    }

    // mirror effect
    context.translate(width, 0);
    context.scale(-1, 1);
  }

  window.addEventListener("resize", function() {
    if (window.innerWidth !== lastWidth) {
      lastWidth = window.innerWidth;
      resizeCanvas();
    }
  });

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", function() {
      const height = window.visualViewport.height;
      Rain.style.height = height + "px";
    });
  }

  resizeCanvas();
});
