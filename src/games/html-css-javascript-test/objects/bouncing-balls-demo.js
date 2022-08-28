// Import everything from outside of the file
import random from "../../-useful-stuff-/math/randomMinimumMaximum";
import { randomRGB } from "../../-useful-stuff-/color";

// Setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;


// Setting up the classes
class Ball {
    constructor(x, y, velX, velY, color, size, sizeLabel = 'normal') {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
        this.sizeLabel = sizeLabel

        this.collidedWithBiggest = false
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    newVelocity(varible) {
        let velocity = 0
        if (varible < 0) {
            velocity = random(-15, -5)
        } else {
            velocity = random(5, 15)
        }

        return varible
    }

    collisionDetect() {
        for (const ball of balls) {
            if (this !== ball) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    if (this.sizeLabel === 'biggest' || ball.sizeLabel === 'biggest') {
                        if (this.sizeLabel === 'biggest') {
                            ball.color = this.color
                            ball.collidedWithBiggest = true
                        } else {
                            this.color = ball.color
                            this.collidedWithBiggest = true
                        }
                    } else if (!this.collidedWithBiggest && !ball.collidedWithBiggest) {
                        ball.color = this.color = randomRGB();
                    }
                }
            }
        }
    }

    update() {
        if ((this.x + this.size) >= width) {
            this.velX = this.newVelocity(-(this.velX))
        }

        if ((this.x - this.size) <= 0) {
            this.velX = this.newVelocity(-(this.velX))
        }

        if ((this.y + this.size) >= height) {
            this.velY = this.newVelocity(-(this.velY))
        }

        if ((this.y - this.size) <= 0) {
            this.velY = this.newVelocity(-(this.velY))
        }

        this.x += this.velX;
        this.y += this.velY;
    }

}
const balls = []
for (let x = 0; x < 1000; x++) {
    const size = random(5, 30)
    const newBall = new Ball(random(size, width - size), random(size, height - size), random(-7, 7), random(-7, 7), randomRGB(), size);
    balls.push(newBall)
}


// Biggest ball
for (let x = 0; x < 10; x++) {
    const biggestBall = new Ball(random(random(5, 30), width - random(5, 30)), random(random(5, 30), height - random(5, 30)), random(-10, 10), random(-10, 10), 'blue', 50, 'biggest')
    console.log(biggestBall)
    balls.push(biggestBall)
}
function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls) {
        ball.draw();
        ball.update();
        ball.collisionDetect()
    }

    requestAnimationFrame(loop);
}

loop()