import displayMessage from '../-useful-stuff-/createMessage'

let currentTimeout;

export default function setupTimer() {
    // Create / Get HTML Elements
    const container = document.createElement('div')
    const htmlBody = document.querySelector('body')
    const mintext = document.createElement('input')
    const button = document.createElement('button')

    // Get sound element and add sound
    const sound = document.createElement('audio')
    sound.src = '/sound/jingle-bells.mp3'
    sound.loop = true

    // Extra text boxs and buttons    
    const sectext = document.createElement('input')
    const hourtext = document.createElement('input')

    // Timer Div
    const timerContainer = document.createElement('div')

    // Give Attributes / Style To Stuff
    button.textContent = 'Enter'
    loopA(['placeholder', 'type'], [0, 'number'], [sectext, hourtext])
    loopA(['placeholder', 'type'], [30, 'number'], [mintext])

    // Append Elements To Container
    container.appendChild(hourtext)
    container.appendChild(mintext)
    container.appendChild(sectext)
    container.appendChild(button)


    for (const item of container.children) {
        item.className = 'flippedColor'
    }

    // Append Container To Body
    htmlBody.appendChild(container)
    htmlBody.appendChild(timerContainer)

    // Loop function method
    function loopM(method, methodAnswer, stuff) {

    }
    // Loop function attribute
    function loopA(attributes, attributeAnswers, stuff) {
        for (const item of stuff) {
            let index = 0
            for (const attribute of attributes) {
                const answer = attributeAnswers[index]
                item[attribute] = answer
                index++;
            }
        }
    }

    // Call function 1
    button.addEventListener('click', () => {
        clearTimeout(currentTimeout)
        sound.pause()
        sound.currentTime = 0
        const mtext = Math.floor(Number(mintext.value))
        const htext = Math.floor(Number(hourtext.value))
        const stext = Math.floor(Number(sectext.value))
        if (mtext < 0 || htext < 0 || stext < 0) {
            displayMessage('No negative numbers or 0', 'sorry')
        } else if (mtext == 0 && htext == 0 && stext == 0) {
            generateTimer(30)
        } else {
            generateTimer(mtext, htext, stext)
        }
        loopA(['value'], [''], [mintext, hourtext, sectext])
    })

    // Function 1: Generate Everything
    function generateTimer(min, hour = 0, second = 0) {
        min = Math.floor(min)
        hour = Math.floor(hour)
        second = Math.floor(second)
        const startTimerImage = hour + ':' + String(min).padStart(2, '0') + ':' + String(second).padStart(2, '0')
        const newPara = document.createElement('p')
        newPara.className = 'timer'
        newPara.textContent = startTimerImage
        timerContainer.innerHTML = ''
        timerContainer.appendChild(newPara)
        const amountOfSeconds = hour * 3600 + min * 60 + second
        startCountdown(min, hour, second, amountOfSeconds)
    }

    // Function 2: Start Countdown
    function startCountdown(min, hour, second, seconds) {
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
                if (min < 0) {
                    hour -= 1
                    min = 59
                }
            } else {
                second -= 1
                seconds -= 1
            }
            generateTimer(min, hour, second)
        }, 1000)
    }
}



// Create The Timer Setup
setupTimer()