// Import stuff from outside of file
import random from '../../-useful-stuff-/math/randomMinimumMaximum'
import { randomRGB } from '../../-useful-stuff-/color'

// Set up canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// Classes
class Shape {
    constructor(x, y, velX, velY) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
    }
}

class Ball extends Shape {
    constructor(x, y, velX, velY, color, size) {
        super(x, y, velX, velY)
        this.color = color;
        this.size = size;
        this.exists = true
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX);
        }

        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }

        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY);
        }

        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetect() {
        for (const ball of balls) {
            if (!(this === ball) && ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.color = this.color = randomRGB();
                }
            }
        }
    }

}

class EvilCircle extends Shape {
    constructor(x, y) {
        super(x, y, 20, 20)
        this.color = 'white'
        this.size = 10

        this.keyPressed = {
            'a': false,
            'ArrowLeft': false,
            'd': false,
            'ArrowRight': false,
            'w': false,
            'ArrowUp': false,
            's': false,
            'ArrowDown': false,
        }

        window.addEventListener('keydown', (e) => {
            this.keyPressed[e.key] = true;
        })

        window.addEventListener('keyup', (e) => {
            this.keyPressed[e.key] = false;
        })
    }

    checkKeys() {
        if (this.keyPressed['a'] || this.keyPressed['ArrowLeft']) {
            this.x -= this.velX;
        }

        if (this.keyPressed['d'] || this.keyPressed['ArrowRight']) {
            this.x += this.velX;
        }
        if (this.keyPressed['w'] || this.keyPressed['ArrowUp']) {
            this.y -= this.velY;
        }

        if (this.keyPressed['s'] || this.keyPressed['ArrowDown']) {
            this.y += this.velY;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }

    checkBounds() {
        if ((this.x + this.size) >= width) {
            this.x = width - this.size
        }

        if ((this.x - this.size) <= 0) {
            this.x = this.size
        }

        if ((this.y + this.size) >= height) {
            this.y = height - this.size
        }

        if ((this.y - this.size) <= 0) {
            this.y = this.size
        }
    }
}

const balls = [];

while (balls.length < 25) {
    const size = random(10, 20);
    const ball = new Ball(
        random(size, width - size),
        random(size, height - size),
        random(-10, 10),
        random(-10, 10),
        randomRGB(),
        size
    );

    balls.push(ball);
}


const evilBall = new EvilCircle(random(10, width - 10), random(10, width - 10))


function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls) {
        ball.draw();
        ball.update();
        ball.collisionDetect();
    }
    evilBall.checkBounds()
    evilBall.checkKeys()
    evilBall.draw()
    requestAnimationFrame(loop);
}

loop();