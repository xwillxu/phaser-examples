const equationsArray = []
const equationContainer = document.querySelector('.questionContainer')

for (let x = 0; x < random(250); x++) {
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
        'remainder: ': {
            'symbolForm': '%',
            'documentElement': document.createElement('p'),
            'range': [200, 200],
            'answer': null,
            'equation': null,
            'calculationFunction': calculateRemainder,
        },

        'exponent: ': {
            'symbolForm': '**',
            'documentElement': document.createElement('p'),
            'range': [5, 5],
            'answer': null,
            'equation': null,
            'calculationFunction': calculateExponent,
        }
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

restartButton.addEventListener('click', restart)

for (const equationCode of equationsArray) {
    equationCode.documentElement.addEventListener('mousedown', () => {
        equationCode.documentElement.textContent = `${equationCode.equation}${equationCode.answer}`
    })

    equationCode.documentElement.onmouseup = () => {
        equationCode.documentElement.textContent = `${equationCode.equation}${questionMark}`
    }
}

function restart() {
    for (const equationCode of equationsArray) {
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

function calculateRemainder(number1, number2) {
    let answer = number1 % number2
    return answer
}

function calculateExponent(number1, number2) {
    let answer = number1 ** number2
    return answer
}

const players = [
    {
        name: 'Xwill',
        age: 9,
    },

    {
        name: 'Daddy',
        age: 41,
    },

    {
        name: 'Mommy',
        age: 40,
    },
]


const sortedArray = players.sort((a, b) => {
    return a.age - b.age
})

console.log(sortedArray[sortedArray.length - 1].name)


let lotsOfDecimals = 1.5251
console.log(lotsOfDecimals)
let twoDecimals = lotsOfDecimals.toFixed(2)
console.log(twoDecimals)
console.log((10 / 5) ** 10)
console.log(100 / 2 % 7)

// FUNNY QUESTIONS:

// Question: Does A Elephant Ways Less Than A Mouse?
// True: Elephants weigh less than mice?
// False: Of course an elephant is heavier than a mouse!
// Answer: False

// Question: A Ostrich Is Taller Than The Duck Or What?
// True: An ostrich is indeed taller than a duck!
// False: Apparently a duck is taller than an ostrich?
// Answer: True

// Question: Can You Make A Number Act Like A String?
// True: Even though it might not make sense it does!
// False: Uh, so when you opened up the console you a saw error?
// Answer: True

// Question: Do ⬆UP⬆, ⬇DOWN⬇, ⬅LEFT⬅, ➡RIGHT➡ match?
// True: Well duh, they don't match!
// False: So, ⬆UP⬆, ⬇DOWN⬇, ⬅LEFT⬅, ➡RIGHT➡ match completely?
// Answer: True


// JOKES:

// Question: What Do You Say To A Error?
// Answer: Solved You Arrays Ago
// Did You Get It?
// Yes Or No?

