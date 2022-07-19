const food = ['Pizzas', 'Popcorn', 'Macaroni', 'Doritos', 'Pancakes',];

let myFavoriteFood = 'My favourite foods are called: ';

let i = 1;

while (i < food.length + 1) {
    if (i === food.length) {
        myFavoriteFood += `and ${i}. ${food[i - 1]}.`;
    } else {
        myFavoriteFood += `${i}. ${food[i - 1]}, `;
    }

    i++;
}

console.log(myFavoriteFood)

// Output: My favourite foods are called: 1. Pizza, 2. Popcorn, 3. Macaroni, 4. Doritos, and 5. Pancakes.