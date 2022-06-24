let additionQuestion = document.querySelector('.addition')
let subtractionQuestion = document.querySelector('.subtraction')
let multiplicationQuestion = document.querySelector('.multiplication')
let divisionQuestion = document.querySelector('.division')

let additionAnswer;
let additionEquation;

let subtractionAnswer;
let subtractionEquation;

let multiplicationAnswer;
let multiplicationEquation;

let divisionAnswer;
let divisionEquation;

let questionMark = '❔❔❔'

restart()

let restartButton = document.querySelector('.restart')

restartButton.onclick = () => {
    restart()
}

additionQuestion.onmousedown = () => {
    additionQuestion.textContent = `${additionEquation}${additionAnswer}`
}

additionQuestion.onmouseup = () => {
    additionQuestion.textContent = `${additionEquation}${questionMark}`
}

subtractionQuestion.onmousedown = () => {
    subtractionQuestion.textContent = `${subtractionEquation}${subtractionAnswer}`
}

subtractionQuestion.onmouseup = () => {
    subtractionQuestion.textContent = `${subtractionEquation}${questionMark}`
}

multiplicationQuestion.onmousedown = () => {
    multiplicationQuestion.textContent = `${multiplicationEquation}${multiplicationAnswer}`
}

multiplicationQuestion.onmouseup = () => {
    multiplicationQuestion.textContent = `${multiplicationEquation}${questionMark}`
}

divisionQuestion.onmousedown = () => {
    divisionQuestion.textContent = `${divisionEquation}${divisionAnswer}`
}

divisionQuestion.onmouseup = () => {
    divisionQuestion.textContent = `${divisionEquation}${questionMark}`
}

function restart() {
    let additionNumber1 = random(500) + 2
    let additionNumber2 = random(500) + 2
    additionAnswer = `${calculateAddition(additionNumber1, additionNumber2)}`
    additionEquation = `${additionNumber1} + ${additionNumber2} = `
    additionQuestion.textContent = `${additionEquation}${questionMark}`
    let subtractionNumber1 = random(1000) + 2
    let subtractionNumber2 = random(500) + 2
    subtractionAnswer = `${calculateSubtraction(subtractionNumber1, subtractionNumber2)}`
    subtractionEquation = `${subtractionNumber1} - ${subtractionNumber2} = `
    subtractionQuestion.textContent = `${subtractionEquation}${questionMark}`
    let multiplicationNumber1 = random(100) + 2
    let multiplicationNumber2 = random(100) + 2
    multiplicationAnswer = `${calculateMultiplication(multiplicationNumber1, multiplicationNumber2)}`
    multiplicationEquation = `${multiplicationNumber1} x ${multiplicationNumber2} = `
    multiplicationQuestion.textContent = `${multiplicationEquation}${questionMark}`
    let divisionNumber1 = random(5000) + 2
    let divisionNumber2 = random(500) + 2
    divisionAnswer = `${calculateDivision(divisionNumber1, divisionNumber2)}`
    divisionEquation = `${divisionNumber1} ➗ ${divisionNumber2} = `
    divisionQuestion.textContent = `${divisionEquation}${questionMark}`

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