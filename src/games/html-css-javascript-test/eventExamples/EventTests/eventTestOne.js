
const btn = document.querySelector('.off');

// Add your code here
let text = 'Machine Is On'
let firstOrSecond = 'first'
btn.addEventListener('click', () => {
    btn.textContent = text
    if (firstOrSecond == 'first') {
        text = 'Machine Is Off'
        firstOrSecond = 'second'
    } else {
        text = 'Machine Is On'
        firstOrSecond = 'first'

    }
})