const body = document.querySelector('body')
function wildFire(event) {
    const item = event.target
    item.textContent = "🔥"
    item.style.backgroundColor = 'red'
    setTimeout(() => {
        item.textContent = '💧'
        item.style.backgroundColor = 'blue'
    }, 3600.0)
    setTimeout(() => {
        if (item.textContent = '🔥' && item.style.backgroundColor == 'red') {
            console.log(item)
            return
        }
        console.log(item)
        item.textContent = '🌲'
        item.style.backgroundColor = 'green'
        if (item.textContent = 'true') {
            item.textContent = '🔥'
            item.style.backgroundColor = 'red'
        }
    }, 6000.0)

}
for (let x = 1; x <= 5000; x++) {
    const button = document.createElement('button')
    button.textContent = '🌲'
    button.style.backgroundColor = 'green'
    button.addEventListener('mouseover', wildFire)
    button.style.width = '30px'
    button.style.height = '30px'
    body.appendChild(button)
}