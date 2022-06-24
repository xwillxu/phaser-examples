const equationsArray = []
const equationContainer = document.querySelector('.questionContainer')
for (let x = 0; x < 25; x++) {
    const equationsData = {
        'addition: ': {
            'symbolForm': '+',
            'documentElement': document.createElement('p'),
            'range': [500, 500],
            'answer': null,
            'equation': null,
            'calculationFunction': calculateAddition,
        },
        'subtraction: ': {
            'symbolForm': '-',
            'documentElement': document.createElement('p'),
            'range': [1000, 500],
            'answer': null,
            'equation': null,
            'calculationFunction': calculateSubtraction,
        },
        'multiplication: ': {
            'symbolForm': 'x',
            'documentElement': document.createElement('p'),
            'range': [100, 100],
            'answer': null,
            'equation': null,
            'calculationFunction': calculateMultiplication,
        },
        'division: ': {
            'symbolForm': '➗',
            'documentElement': document.createElement('p'),
            'range': [5000, 500],
            'answer': null,
            'equation': null,
            'calculationFunction': calculateDivision,
        },


    }
    for (const key in equationsData) {
        const equationCode = equationsData[key]
        equationContainer.appendChild(equationCode.documentElement)
        equationsArray.push(equationCode)
    }

}





const questionMark = '❔❔❔'

restart()

let restartButton = document.querySelector('.restart')

restartButton.onclick = () => {
    restart()
}

for (const equationCode of equationsArray) {
    equationCode.documentElement.onmousedown = () => {
        equationCode.documentElement.textContent = `${equationCode.equation}${equationCode.answer}`
    }

    equationCode.documentElement.onmouseup = () => {
        equationCode.documentElement.textContent = `${equationCode.equation}${questionMark}`
    }
}

function restart() {
    for (const equationCode of equationsData) {
        const number1 = random(equationCode.range[0]) + 2
        const number2 = random(equationCode.range[1]) + 2
        equationCode.answer = `${equationCode.calculationFunction(number1, number2)}`
        equationCode.equation = `${number1} ${equationCode.symbolForm} ${number2} = `
        equationCode.documentElement.textContent = `${equationCode.equation}${questionMark}`

    }
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