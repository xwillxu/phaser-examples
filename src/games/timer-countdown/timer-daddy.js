import * as workerTimers from 'worker-timers';

const container = document.createElement('div')
const htmlBody = document.querySelector('body')
const mintext = document.createElement('input')
const button = document.createElement('button')
// Timer Div
const timerContainer = document.createElement('div')
// Create / Get HTML Elements


// Get sound element and add sound
const sound = document.createElement('audio')
sound.src = '/sound/jingle-bells.mp3'
sound.loop = true

// Extra text boxs and buttons    
const sectext = document.createElement('input')
const hourtext = document.createElement('input')



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

button.addEventListener('click', () => {
    restart(hourtext.value + ':' + mintext.value + ':' + sectext.value)
})

const data = {
    totalSeconds: 0,
    currentSeconds: 0,
    currentInterval: 0,
}

function covertTimeStringToSeconds(timestring) {
    if (timestring === '0:0:0') timestring = '00:30:00'
    const a = timestring.split(':'); // split it at the colons
    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
}

function convertSecondsToTimerString(seconds) {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
}

function restart(timeString = '00:30:00') {
    data.totalSeconds = covertTimeStringToSeconds(timeString)
    data.currentSeconds = data.totalSeconds
    workerTimers.clearInterval(data.currentInterval)
    startTimer()
}

function displayTimer(seconds) {
    const string = convertSecondsToTimerString(seconds)
    const newPara = document.createElement('p')
    newPara.className = 'timer'
    newPara.textContent = string

    // Display in html
    timerContainer.innerHTML = ''
    timerContainer.appendChild(newPara)
}

function startTimer() {
    data.currentInterval = workerTimers.setInterval(() => {
        data.currentSeconds--
        displayTimer(data.currentSeconds)
    }, 1000)
}
