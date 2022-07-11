const select = document.querySelector('.food');
const para = document.querySelector('p');

const select2 = document.querySelector('.theme');
const html = document.querySelector('html');
document.body.style.padding = '10px';

function update(bgColor, textColor) {
    html.style.backgroundColor = bgColor;
    html.style.color = textColor;
}

select2.addEventListener('change', () => (select2.value === 'black') ? update('black', 'white') : update('white', 'black'));

select.addEventListener('change', setTaste);

let choice = select.value

function setTaste() {
    choice = select.value
    if (choice == 'Good') {
        para.textContent = 'This is amazing food. The best in the world'
    } else if (choice == 'Bad') {
        para.textContent = 'This is awful food. I will never eat it again even if i have to die.'
    } else {
        para.textContent = 'Please Make A Choice'
    }
}

function checkTaste() {
    choice = select.value
    switch (choice) {
        case 'Good':
            para.textContent = 'This is amazing food. The best in the world'
            break;
        case 'Bad':
            para.textContent = 'This is awful food. I will never eat it again even if i have to die.'
            break;
        default:
            para.textContent = 'Please Make A Choice'
    }
    console.log('Continue')
}



const select = document.querySelector('select');
const list = document.querySelector('ul');
const h1 = document.querySelector('h1');

select.addEventListener('change', () => {
    const choice = select.value;

    // ADD CONDITIONAL HERE
    console.log(choice)
    let days
    switch (choice) {
        case 'January':
        case 'March':
        case 'May':
        case 'July':
        case 'August':
        case 'October':
        case 'December':
            days = 31
            break
        case 'February':
            days = 28
            break
        default:
            days = 30
            break
    }

    createCalendar(days, choice);
});

function createCalendar(days, choice) {
    list.innerHTML = '';
    h1.textContent = choice;
    for (let i = 1; i <= days; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = i;
        list.appendChild(listItem);
    }
}

createCalendar(31, 'January');


const select = document.querySelector('select');
const html = document.querySelector('.output');

select.addEventListener('change', () => {
    const choice = select.value;

    // ADD SWITCH STATEMENT
    let bgColor;
    let textcolor;
    switch (choice) {
        case 'white':
            bgColor = 'white'
            textcolor = 'black'
            break
        case 'black':
            bgColor = 'black'
            textcolor = 'white'
            break
        case 'purple':
            bgColor = 'purple'
            textcolor = 'yellow'
            break
        case 'yellow':
            textcolor = 'purple'
            bgColor = 'yellow'
            break
    }
    update(bgColor, textcolor)
});

function update(bgColor, textColor) {
    html.style.backgroundColor = bgColor;
    html.style.color = textColor;
}

let season = 'summer';
let response;

// Add your code here
switch (season) {
    case 'summer':
        response = 'It is summer no more school'
        break;
    case 'winter':
        response = 'It is winter time to build a snowman'
        break;
    default:
        response = 'Please enter a season'
        break;
}
// Don't edit the code below here!

section.innerHTML = ' ';
let para1 = document.createElement('p');
para1.textContent = response;
section.appendChild(para1);



let response;
let score = 101;
let machineActive = true;

// Add your code here
console.log(machineActive)
if (machineActive == false) {
    response = 'Please Turn On The Machine'
    console.log('off')
} else if (machineActive == true) {
    response = 'The Machine Is On'
    console.log('on')
    if (score >= 0 && score <= 100) {
        if (score <= 19) {
            response = 'That was a terrible score — total fail!'
        } else if (score <= 39) {
            response = "You know some things, but it's a pretty bad score. Needs improvement."
        } else if (score <= 69) {
            response = "You did a passable job, not bad!"
        } else if (score <= 89) {
            response = "That's a great score, you really know your stuff."
        } else if (score >= 90) {
            response = "What an amazing score! Did you cheat? Are you for real?"
        }
    } else {

        response = "This is not possible, an error has occurred."
    }
}


// Don't edit the code below here!

section.innerHTML = ' ';
let para1 = document.createElement('p');
let para2 = document.createElement('p');

para1.textContent = `Your score is ${score}`;
para2.textContent = response;

section.appendChild(para1);
section.appendChild(para2);
