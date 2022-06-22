let additionQuestion = document.querySelector('.addition')
let subtractionQuestion = document.querySelector('.subtraction')
let multiplicationQuestion = document.querySelector('.multiplication')
let divisionQuestion = document.querySelector('.division')

let multiplicationAnswer;
let multiplicationEquation;
let questionMark = '❔❔❔'

restart()

let restartButton = document.querySelector('.restart')

restartButton.onclick = () => {
    restart()
}

multiplicationQuestion.onclick = () => {
    multiplicationQuestion.textContent = `${multiplicationEquation}${multiplicationAnswer}`
}

function restart() {
    let additionNumber1 = random(500) + 2
    let additionNumber2 = random(500) + 2
    additionQuestion.textContent = `${additionNumber1} +  ${additionNumber2} = ${calculateAddition(additionNumber1, additionNumber2)}`
    let subtractionNumber1 = random(500) + 2
    let subtractionNumber2 = random(500) + 2
    subtractionQuestion.textContent = `${subtractionNumber1} - ${subtractionNumber2} = ${calculateSubtraction(subtractionNumber1, subtractionNumber2)}`
    let multiplicationNumber1 = random(100) + 2
    let multiplicationNumber2 = random(100) + 2
    multiplicationAnswer = `${calculateMultiplication(multiplicationNumber1, multiplicationNumber2)}`
    multiplicationEquation = `${multiplicationNumber1} x ${multiplicationNumber2} = `
    multiplicationQuestion.textContent = `${multiplicationEquation}${questionMark}`
    let divisionNumber1 = random(1000) + 2
    let divisionNumber2 = random(500) + 2
    divisionQuestion.textContent = `${divisionNumber1} ➗ ${divisionNumber2} = ${calculateDivision(divisionNumber1, divisionNumber2)}`

}



function random(range) {
    const number = Math.floor(Math.random() * range)
    return number
}

function calculateAddition(number1, number2) {
    let answer = number1 + number2
    return answer
}

function calculateSubtraction(number1, number2) {
    let answer = number1 - number2
    return answer
}

function calculateMultiplication(number1, number2) {
    let answer = number1 * number2
    return answer
}

function calculateDivision(number1, number2) {
    let answer = number1 / number2
    return answer
}


function calculateEquation(baseNumber, numbers, equation) {
    let currentAnswer = baseNumber
    for (let number of numbers) {
        currentAnswer = eval(`${currentAnswer} ${equation} ${number}`)
    }
    return currentAnswer
}