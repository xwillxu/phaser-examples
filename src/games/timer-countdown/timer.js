import displayMessage from '../-useful-stuff-/createMessage'

let currentTimeout;

export default function setupTimer() {
    // Create / Get HTML Elements
    const container = document.createElement('div')
    const htmlBody = document.querySelector('body')
    const textbox = document.createElement('input')
    const button = document.createElement('button')

    // Get sound element and add sound
    const sound = document.createElement('audio')
    sound.src = '/sound/jingle-bells.mp3'
    sound.loop = true

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
        clearTimeout(currentTimeout)
        sound.pause()
        sound.currentTime = 0

        const text = Math.floor(Number(textbox.value))
        if (text == 0) {
            generateTimer("30")
        } else if (text < 0) {
            displayMessage('No negative numbers or 0', 'sorry')
        } else {
            generateTimer(text)
        }
        textbox.value = ''
    })

    // Function 1: Generate Everything
    function generateTimer(min, second = 0) {
        min = Math.floor(min)
        const startTimerImage = min + ':' + String(second).padStart(2, '0')
        const newPara = document.createElement('p')
        newPara.className = 'timer'
        newPara.textContent = startTimerImage
        timerContainer.innerHTML = ''
        timerContainer.appendChild(newPara)
        const amountOfSeconds = min * 60 + second
        startCountdown(min, second, amountOfSeconds)
    }

    // Function 2: Start Countdown
    function startCountdown(min, second, seconds) {
        currentTimeout = setTimeout(() => {
            if (seconds <= 0) {
                sound.play()
                setTimeout(() => {
                    sound.pause()
                    sound.currentTime = 0
                }, 60000)
                return
            } else if (second == 0) {
                min -= 1
                second = 59
            } else {
                second -= 59
                seconds -= 59
            }
            generateTimer(min, second)
        }, 1000)
    }
}



// Create The Timer Setup
setupTimer()