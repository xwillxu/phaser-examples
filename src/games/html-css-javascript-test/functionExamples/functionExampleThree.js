import random from "../../-useful-stuff-/randomMinimumMaximum";

const names = ['Chris', 'Li Kang', 'Anne', 'Francesca', 'Mustafa', 'Tina', 'Bert', 'Jada']
const section = document.createElement('div')
const para = document.createElement('p');
const body = document.querySelector('body')

// Add your code here

function chooseName() {
    const length = names.length - 1
    const randomName = random(0, length)
    return `${names[randomName]}`
}

para.textContent += chooseName()

// Don't edit the code below here!

section.innerHTML = ' ';

section.appendChild(para);

body.appendChild(section)