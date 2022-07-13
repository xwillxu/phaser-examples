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