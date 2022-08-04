// Import Stuff
import displayMessage from "../-useful-stuff-/createMessage.js"

// Get HTML Elements
const enterNumberBtn = document.querySelector('.enterButton')
const enterNumberText = document.querySelector('.typeNumber')
const answerQuestionBtn = document.querySelector('.answerQuestion')
const answerQuestionText = document.querySelector('.typeAnswer')

// IMPORTANT: Div That Contains The Actual Squares That Are Generated
const squareContainer = document.querySelector('.squareContainer')

// Main Logic
let answer = 0

enterNumberBtn.addEventListener('click', () => {
    if (isNaN(enterNumberText.value)) {
        displayMessage("Please Only Type Numbers", "warning")
        return
    }
    answer = calculateSquares(enterNumberText.value)
    createSquares(enterNumberText.value)
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