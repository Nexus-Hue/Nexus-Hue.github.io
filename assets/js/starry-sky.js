function fn() {
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let w, h, hue = 217;
    let stars = [], maxStars;
    let canvas2 = document.createElement('canvas'), ctx2 = canvas2.getContext('2d');

    // Pre-render a star to offscreen canvas
    canvas2.width = 100;
    canvas2.height = 100;
    let half = canvas2.width / 2;
    let gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, '#fff');
    gradient2.addColorStop(0.1, `hsl(${hue}, 61%, 33%)`);
    gradient2.addColorStop(0.25, `hsl(${hue}, 64%, 6%)`);
    gradient2.addColorStop(1, 'transparent');
    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();

    function random(min, max) {
        if (arguments.length < 2) {
            max = min;
            min = 0;
        }
        if (min > max) [min, max] = [max, min];
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function maxOrbit(x, y) {
        let max = Math.max(x, y);
        return Math.round(Math.sqrt(max * max + max * max)) / 2;
    }

    let Star = function () {
        this.orbitRadius = random(maxOrbit(w, h));
        this.radius = random(60, this.orbitRadius) / 12;
        this.orbitX = w / 2;
        this.orbitY = h / 2;
        this.timePassed = random(0, maxStars);
        this.speed = random(this.orbitRadius) / 900000;
        this.alpha = random(2, 10) / 10;
    };

    Star.prototype.draw = function () {
        const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
        const y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;
        const twinkle = random(10);

        // minor twinkle only, less frequent
        if (twinkle === 1 && this.alpha > 0) this.alpha -= 0.02;
        else if (twinkle === 2 && this.alpha < 1) this.alpha += 0.02;

        ctx.globalAlpha = this.alpha;
        ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
        this.timePassed += this.speed;
    };

    function createStars() {
        stars = [];
        for (let i = 0; i < maxStars; i++) {
            stars.push(new Star());
        }
    }

    function resizeCanvas() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;

        // Reduce star count for smaller screens
        if (w < 768) maxStars = 400;
        else if (w < 1200) maxStars = 800;
        else maxStars = 1200;

        createStars(); // rebuild with new dimensions
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function animation() {
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = `hsla(${hue}, 64%, 6%, 1)`;
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'lighter';

        // draw stars
        for (let i = 0, l = stars.length; i < l; i++) {
            stars[i].draw();
        }
        window.requestAnimFrame(animation);
    }

    animation();
}
fn();
