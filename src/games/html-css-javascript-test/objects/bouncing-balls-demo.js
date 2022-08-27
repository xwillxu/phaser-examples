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
    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
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

}
for (let x = 0; x < 100; x++) {
    const size = random(5, 30)
    const newBall = new Ball(random(size, width - size), random(size, height - size), random(-10, 10), random(-10, 10), randomRGB(), size);
    newBall.draw()
    setInterval(() => {

        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.fillRect(0, 0, width, height);
        newBall.update()
        newBall.draw()
    }, 1000 / 60)
}

