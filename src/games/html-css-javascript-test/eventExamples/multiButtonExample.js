const body = document.querySelector('body')
for (let x = 1; x <= 5000; x++) {
    const button = document.createElement('button')
    button.textContent = '🌲'
    button.addEventListener('mouseout', () => {
        button.textContent = "🔥"
        setTimeout(() => { button.textContent = '💧' }, 2000)
        setTimeout(() => { button.textContent = '🌲' }, 4000)
    })
    button.style.width = '30px'
    button.style.height = '30px'
    body.appendChild(button)
}