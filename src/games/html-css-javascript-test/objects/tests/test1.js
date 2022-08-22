const cat = {
    name: 'Bertie',
    breed: 'Cymric',
    color: 'white',
    greeting: function () {
        console.log('Meow!');
    }
}

// Put your code here
const catName = cat['name']
cat.color = 'black'
cat.greeting()


// Don't edit the code below here

let para1 = document.createElement('p');
let para2 = document.createElement('p');

para1.textContent = `The cat's name is ${catName}.`;
para2.textContent = `The cat's color is ${cat.color}.`;

section.appendChild(para1);
section.appendChild(para2);