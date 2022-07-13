function upperCase(food) {
    const newFood = food.toUpperCase()
    return newFood
}

const foodArray = ['pizza', 'popcorn', 'chips', 'chicken', 'mashed-potato', 'brocoli']

const upperCaseFood = foodArray.map(upperCase)

console.log(upperCaseFood)