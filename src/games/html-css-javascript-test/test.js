let inputs = []

let answer = 0

let wonContainer = document.querySelector("#youWon")

let restartButton = document.querySelector("#restart")

restart()


restartButton.onclick = (e) => {

    restart()
}

function restart() {
    answer = parseInt(Math.random() * 100) + 1
    console.log('answer', answer)
    restartButton.hidden = true
    wonContainer.innerHTML = ''
    inputs = []

}

// Send message to room on submit
document.querySelector("#form").onsubmit = function (e) {
    e.preventDefault();

    var input = document.querySelector("#input");

    console.log("input:", input.value);
    let userAnswer = parseInt(input.value)
    console.log(userAnswer)
    let nanVarible = isNaN(userAnswer)
    if (nanVarible == true) {
        return
    }

    console.log('nan', nanVarible)
    inputs.push(userAnswer)

    let highOrLowContainer = document.querySelector('#highOrLow')

    if (userAnswer == answer) {
        let wonVarible = document.createElement('div')
        wonContainer.innerHTML = ''
        wonVarible.innerText = 'Congratulations! You got it right!'
        restartButton.hidden = false
        wonContainer.appendChild(wonVarible)
    } else {
        let wonVarible = document.createElement('div')
        wonContainer.innerHTML = ''
        wonVarible.innerText = 'Wrong!'
        wonContainer.appendChild(wonVarible)

        let hint = ''
        if (userAnswer < answer) {
            hint = 'You answer was too low.'
        } else {
            hint = 'You answer was too high.'
        }
        let highOrLowVarible = document.createElement('div')
        highOrLowContainer.innerHTML = ''
        highOrLowVarible.innerText = hint
        highOrLowContainer.appendChild(highOrLowVarible)
    }


    let display = document.getElementById('answerDisplay')
    display.innerText = `Answer: ${inputs}`



    // clear input
    input.value = "";

}