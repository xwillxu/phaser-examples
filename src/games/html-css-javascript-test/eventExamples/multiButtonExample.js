const body = document.querySelector('body')
function wildFire(event) {
    const item = event.target
    item.textContent = "🔥"
    item.style.backgroundColor = 'red'
    setTimeout(() => {
        item.textContent = '💧'
        item.style.backgroundColor = 'blue'
    }, 4000)
    setTimeout(() => {
        item.textContent = '🌲'
        item.style.backgroundColor = 'green'
    }, 8000)

}
for (let x = 1; x <= 5000; x++) {
    const button = document.createElement('button')
    button.style.backgroundColor = 'green'
    button.textContent = '🌲'
    button.addEventListener('mouseover', wildFire)
    button.style.width = '30px'
    button.style.height = '30px'
    body.appendChild(button)
}