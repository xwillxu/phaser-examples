import * as workerTimers from 'worker-timers';

let currentTimeout;
let repeatOn = false
let repeatMin = 0
let repeatHour = 0
let repeatSecond = 0
const repeatButton = document.createElement("button")
repeatButton.textContent = "Repeat: False"
repeatButton.addEventListener("click", () => {
    if (!repeatOn) {
        repeatOn = true
        repeatButton.textContent = "Repeat: True"
    } else {
        repeatOn = false
        repeatButton.textContent = "Repeat: False"
    }
})


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
    container.appendChild(repeatButton)

    // Style
    for (const item of container.children) {
        item.className = 'flippedColor'
    }

    // Append Container To Body
    htmlBody.appendChild(container)
    htmlBody.appendChild(timerContainer)
    // Loop function attribute
    function loopA(attributes, attributeAnswers, objects) {
        for (const item of objects) {
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
        if (currentTimeout) workerTimers.clearTimeout(currentTimeout)
        sound.pause()
        sound.currentTime = 0
        createInterval()
        loopA(['value'], [''], [mintext, hourtext, sectext])
    })
    // Display and change the function
    function createInterval() {
        const mtext = Math.floor(Number(mintext.value))
        const htext = Math.floor(Number(hourtext.value))
        const stext = Math.floor(Number(sectext.value))

        currentTimeout = workerTimers.setTimeout(() => {
            console.log(mtext, htext, stext)
            if (mtext <= 0 && htext <= 0 && stext <= 0) {
                timer(30, 0, 0)
                return
            }
            timer(mtext, htext, stext)
            repeatMin = mtext
            repeatHour = htext
            repeatSecond = stext
        }, 1000)
    }

    function setTimeoutCustom(sound, time) {
        workerTimers.setTimeout(() => {
            sound.pause()
            sound.currentTime = 0
        }, time)
    }

    function timer(min, hour = 0, second = 0) {
        const newPara = document.createElement('p')
        const timerDisplay = hour + ':' + String(min).padStart(2, '0') + ':' + String(second).padStart(2, '0')
        newPara.className = 'timer'
        newPara.textContent = timerDisplay
        timerContainer.innerHTML = ''
        timerContainer.appendChild(newPara)

        if (min <= 0 && hour <= 0 && second <= 0) {
            console.log(repeatOn)
            sound.play()
            if (!repeatOn) {
                currentTimeout = setTimeoutCustom(sound, 60000)
            } else {
                currentTimeout = setTimeout(() => {
                    sound.pause()
                    sound.currentTime = 0
                    timer(repeatMin, repeatHour, repeatSecond)
                }, 2000)
            }
            return
        }

        let newMin = min
        let newHour = hour
        let newSecond = second

        newSecond--
        if (newSecond < 0) {
            newMin--
            newSecond = 59
        }

        if (newMin < 0) {
            newHour--
            newMin = 59
        }

        currentTimeout = workerTimers.setTimeout(() => {
            timer(newMin, newHour, newSecond)
        }, 1000)
    }
}

// Create The Timer Setup
setupTimer()