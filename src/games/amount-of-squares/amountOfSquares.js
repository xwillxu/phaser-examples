// Import Stuff
import displayMessage from "../-useful-stuff-/createMessage.js"

// Get HTML Elements
const enterNumberBtn = document.querySelector('.enterButton')
const enterNumberText = document.querySelector('.typeNumber')
const answerQuestionBtn = document.querySelector('.answerQuestion')
const answerQuestionText = document.querySelector('.typeAnswer')

// Show Answer
const showAnswer = document.querySelector('.showAnswer')

// IMPORTANT: Div That Contains The Actual Squares That Are Generated
const squareContainer = document.querySelector('.squareContainer')

// Main Logic
let answer = 0
let ableAnswer = false
let correct = false

enterNumberBtn.addEventListener('click', () => {
    const text = enterNumberText.value
    enterNumberText.value = ''
    if (isNaN(text)) {
        displayMessage("Please Only Type Numbers", "warning")

        return
    }
    answer = calculateSquares(text)
    createSquares(text)
    ableAnswer = true

})

answerQuestionBtn.addEventListener('click', () => {
    const text = answerQuestionText.value
    answerQuestionText.value = ''
    if (!ableAnswer == true) {
        displayMessage("Can't Answer", "warning")

        return
    }
    if (text == answer) {
        displayMessage("Wahoo You Got The Answer Correct", "happy")
        setTimeout(() => { reset(), 2000 })
    } else if (text < answer) {
        displayMessage("Your answer was smaller than the actual answer", "sorry")
    } else {
        displayMessage("Your answer was bigger than the actual answer", "sorry")
    }


})

// Calculation
function calculateSquares(number) {
    let result = 0
    for (let x = 1; x <= number; x++) {
        result += x * x
    }
    return result
}

// Create Squares
function createSquares(number) {
    squareContainer.innerHTML = ''
    const squareSideSize = (screen.height - 450) / number
    for (let x = 0; x < number; x++) {
        const row = document.createElement('div')
        row.className = 'row'
        squareContainer.appendChild(row)
        for (let y = 0; y < number; y++) {
            const column = document.createElement('div')
            column.className = 'square'
            column.style.width = squareSideSize + 'px'
            column.style.height = squareSideSize + 'px'
            row.appendChild(column)
        }
    }
}
// Reset Function
function reset() {
    answer = 0
    ableAnswer = false
    squareContainer.innerHTML = ''
    answerQuestionText.value = ''
    showAnswer.style.visibility = 'hidden'
    showAnswer.textContent = 'Show Answer'
}

// Show answer
function showAnswerBtn() {
    showAnswer.style.visibility = 'visible'
}

showAnswer.addEventListener('click', () => {
    showAnswer.textContent = answer
    setTimout(() => displayMessage('You have cheated. You must do another puzzle.', 'warning'), 200)
    setTimout(() => reset(), 2000)
})