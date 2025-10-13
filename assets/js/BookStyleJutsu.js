const Rain = document.getElementById("Rain"),
  context = Rain.getContext("2d"),
  drops = [],
  text = [],
  font_size = 5;

const width = window.innerWidth;
const height = window.innerHeight;
Rain.width = width;
Rain.height = height;

// Use mobile-perfect columns by default
let columns = Math.floor(Rain.width / font_size);

// density for large screens
let densityFactor = 3; // default for mobile
if (width >= 1440) densityFactor = 11; // sparse on large desktop
else if (width >= 1024) densityFactor = 7; // medium screens

// Mirror horizontally
context.translate(Rain.width, 0);
context.scale(-1, 1);

const chars = "ネクサス★ヒュー".split("");

// Initialize drops dynamically based on canvas height
for (let i = 0; i < columns; i++) {
  drops[i] = Math.random() * (Rain.height / font_size) - 1;
}

let frameCount = 0;

function draw() {
  frameCount++;

// Instead of clearRect, overlay a semi-transparent dark rectangle
if (frameCount % 150 === 0) {
  context.fillStyle = "rgba(3, 6, 13, 0.5)"; // higher alpha for faster fade
  context.fillRect(0, 0, Rain.width, Rain.height);
}

  context.font = font_size + "px 'Sawarabi Mincho', 'Roboto Mono'";
  context.fillStyle = "rgba(3, 6, 13, 0.23)";
  context.fillRect(0, 0, Rain.width, Rain.height);


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
