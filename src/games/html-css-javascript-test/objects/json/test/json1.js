const section = document.querySelector('section');

let para1 = document.createElement('p');
let para2 = document.createElement('p');
let motherInfo = 'The mother cats are called ';
let kittenInfo;
const requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/tasks/json/sample.json';

fetch(requestURL)
    .then(response => response.text())
    .then(text => displayCatInfo(text))

function displayCatInfo(catString) {
    const catObject = JSON.parse(catString)
    let total = 0;
    let male = 0;

    // Add your code here
    for (const motherCat of catObject) {
        motherInfo += motherCat.name + ', '
        for (const kitten of motherCat.kittens) {
            if (kitten.gender == 'm') male++
            total++
        }
    }
    kittenInfo = `There are ${total} in total. ${male} are male and the females number ${total - male}.`
    console.log(catObject)
    // Don't edit the code below here!

    para1.textContent = motherInfo;
    para2.textContent = kittenInfo;
}

section.appendChild(para1);
section.appendChild(para2);