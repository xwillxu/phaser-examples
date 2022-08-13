import displayMessage from '../-useful-stuff-/createMessage'

export default function setupTimer() {
    // Create / Get HTML Elements
    const container = document.createElement('div')
    const htmlBody = document.querySelector('body')
    const textbox = document.createElement('input')
    const button = document.createElement('button')

    // Timer Div
    const timerContainer = document.createElement('div')

    // Give Attributes / Style To Stuff
    button.textContent = 'Enter'
    textbox.placeholder = '30'
    textbox.type = 'number'

    // Append Elements To Container
    container.appendChild(textbox)
    container.appendChild(button)

    for (const item of container.children) {
        item.className = 'flippedColor'
    }

    // Append Container To Body
    htmlBody.appendChild(container)
    htmlBody.appendChild(timerContainer)

    // Call function 1
    button.addEventListener('click', () => {
        const text = textbox.value
        if (text == '') {
            generateTimer("30")
        } else {
            generateTimer(text)
        }
    })

    // Function 1: Generate Everything
    function generateTimer(min, second = 0) {
        const startTimerImage = min + ':' + String(second).padStart(2, '0')
        const newPara = document.createElement('p')
        newPara.className = 'timer'
        newPara.textContent = startTimerImage
        timerContainer.innerHTML = ''
        timerContainer.appendChild(newPara)
    }
}



// Create The Timer Setup
setupTimer()