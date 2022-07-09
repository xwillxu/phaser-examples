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