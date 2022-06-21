let additionQuestion = document.querySelector('.addition')
let subtractionQuestion = document.querySelector('.subtraction')
let multiplicationQuestion = document.querySelector('.multiplication')
let divisionQuestion = document.querySelector('.division')
// let number1 = random(0, 100)
// let number2 = random(0, 100)
additionQuestion.textContent = ` 145 + 124 = ${calculateAddition(145, 124)}`
subtractionQuestion.textContent = ` 935 - 210 = ${calculateSubtraction(935, 210)}`
additionQuestion.textContent = ` 134 x 78 = ${calculateMultiplication(134, 78)}`
additionQuestion.textContent = ` 659 ➗ 213 = ${calculateDivision(659, 213)}`



function random(number, range) {
    number = Math.floor(Math.random() * range)
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

function calculateAdditionAndMultiplication(number1, number2, number3) {
    let additionCalculation = calculateAddition(number1, number2)
    let answer = calculateMultiplication(additionCalculation, number3)
    return answer
}

function calculateEquation(baseNumber, numbers, equation) {
    let currentAnswer = baseNumber
    for (let number of numbers) {
        currentAnswer = eval(`${currentAnswer} ${equation} ${number}`)
    }
    return currentAnswer
}