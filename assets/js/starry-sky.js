function fn() {
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let w, h, hue = 217;
    let stars = [], maxStars = 1200;
    let canvas2 = document.createElement('canvas'), ctx2 = canvas2.getContext('2d');

    canvas2.width = 100;
    canvas2.height = 100;
    let half = canvas2.width / 2;
    let gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, '#fff');
    gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
    gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
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
        if (min > max) {
            const hold = max;
            max = min;
            min = hold;
        }
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
        let x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
        let y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;
        let twinkle = random(10);

        if (twinkle === 1 && this.alpha > 0) this.alpha -= 0.05;
        else if (twinkle === 2 && this.alpha < 1) this.alpha += 0.05;

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
        createStars(); // rebuild with new dimensions
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function animation() {
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'lighter';
        for (let i = 0, l = stars.length; i < l; i++) {
            stars[i].draw();
        }
        window.requestAnimFrame(animation);
    }

    animation();
}
fn();
