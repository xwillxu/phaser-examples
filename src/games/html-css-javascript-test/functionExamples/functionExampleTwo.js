const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const x = 50;
const y = 60;
const width = 100;
const height = 75;
const color = 'blue';

// Add your code here
let WIDTH = document.documentElement.clientWidth;
let HEIGHT = document.documentElement.clientHeight / 3

function drawASquare(number) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (let i = 0; i < number; i++) {
        ctx.beginPath();
        ctx.fillStyle = `blue`;
        ctx.rect(x, y, width, height)
        ctx.fill();
    }
}

drawASquare()