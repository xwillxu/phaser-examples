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
    }, 1000)
}

function timer(min, hour = 0, second = 0) {
    const newPara = document.createElement('p')
    const timerDisplay = hour + ':' + String(min).padStart(2, '0') + ':' + String(second).padStart(2, '0')
    newPara.className = 'timer'
    newPara.textContent = timerDisplay
    timerContainer.innerHTML = ''
    timerContainer.appendChild(newPara)

    if (min <= 0 && hour <= 0 && second <= 0) {
        sound.play()
        currentTimeout = workerTimers.setTimeout(() => {
            sound.pause()
            sound.currentTime = 0
        }, 60000)
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