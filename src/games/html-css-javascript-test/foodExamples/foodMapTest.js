// USING MAP:

function upperCase(food) {
    const newFood = food.toUpperCase()
    return newFood
}

const foodArray = ['pizza', 'popcorn', 'chips', 'chicken', 'mashed-potato', 'brocoli']

const upperCaseFood = foodArray.map(upperCase)

console.log(upperCaseFood)

// USING FILTER:
function startsWithLetter(letter) {
    const returnedFunction = function (food) {
        return food.startsWith(letter)
    }

    return returnedFunction
}

const pFood = foodArray.filter(startsWithLetter('P'))

console.log(pFood)
