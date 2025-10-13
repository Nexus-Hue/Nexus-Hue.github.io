const Rain = document.getElementById("Rain"),
  context = Rain.getContext("2d"),
  drops = [],
  text = [],
  font_size = 5;

//  densityFactor and columns global 
let densityFactor = 3; // mobile
let columns = Math.floor(window.innerWidth / font_size);

// Mirror x
context.translate(window.innerWidth, 0);
context.scale(-1, 1);

const chars = "ネクサス★ヒュー".split("");

// Initializing dynamically
for (let i = 0; i < columns; i++) {
  drops[i] = Math.random() * (window.innerHeight / font_size) - 1;
}

let frameCount = 0;

function draw() {
  frameCount++;

  // transparentish dark mask type shih
  if (frameCount % 150 === 0) {
    context.fillStyle = "rgba(3, 6, 13, 0.5)";
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

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;

  // canvas for retina displays
  Rain.width = width * dpr;
  Rain.height = height * dpr;
  Rain.style.width = width + "px";
  Rain.style.height = height + "px";

  context.setTransform(1, 0, 0, 1, 0, 0); // reset
  context.scale(dpr, dpr); // scale drawing for pixel density

  // densityFactor for dem screen sizes
  if (width >= 1440) densityFactor = 11;
  else if (width >= 1024) densityFactor = 7;
  else densityFactor = 3;

  // drops 
  columns = Math.floor(width / font_size);
  drops.length = columns;
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * (height / font_size) - 1;
  }

  //  mirror effect
  context.translate(width, 0);
  context.scale(-1, 1);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas(); 

