// Import Stuff
import displayMessage from "../-useful-stuff-/user-inhancements/createMessage/createMessage.js"

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
let currentSquares = 0
let ableAnswer = false
const bannedNumbers = ['0']


enterNumberBtn.addEventListener('click', () => {
    // @ts-ignore
    const text = enterNumberText.value
    // @ts-ignore
    enterNumberText.value = ''

    if (isNaN(text)) {
        displayMessage("Please Only Type Numbers", "warning")
        return
    }
    for (const number of bannedNumbers) {
        if (text == number) {
            displayMessage('Unable To Create Squares.', 'warning')
            alert("test")
            return
        }
    }
    currentSquares = text
    answer = calculateSquares(text)
    createSquares(text)
    ableAnswer = true

})

answerQuestionBtn.addEventListener('click', () => {
    // @ts-ignore
    const text = answerQuestionText.value
    // @ts-ignore
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
        showAnswerBtn()
    } else {
        displayMessage("Your answer was bigger than the actual answer", "sorry")
        showAnswerBtn()
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
    // @ts-ignore
    answerQuestionText.value = ''
    // @ts-ignore
    showAnswer.style.visibility = 'hidden'
    showAnswer.textContent = 'Show Answer'
}

// Show answer
function showAnswerBtn() {
    // @ts-ignore
    showAnswer.style.visibility = 'visible'
}

showAnswer.addEventListener('click', () => {
    // @ts-ignore
    showAnswer.textContent = answer
    ableAnswer = false
    setTimeout(() => displayMessage('You have cheated. You must do another puzzle.', 'warning'), 200)
    // @ts-ignore
    bannedNumbers.push(currentSquares)
    setTimeout(() => reset(), 2200)

})

// Finished Amount Of Squares.