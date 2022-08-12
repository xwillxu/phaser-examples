const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

function drawCircle(x, y, size) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();
}

let x = 50;
let y = 50;
const size = 30;

drawCircle(x, y, size);

// Add your code here
canvas.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            y -= 2
            break
        case 'a':
            x -= 2
            break
        case 's':
            y += 2
            break
        case 'd':
            x += 2
            break
        default:
            break
    }

    drawCircle(x, y, size)
})