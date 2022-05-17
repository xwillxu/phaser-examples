const h1Collection = document.getElementsByTagName('h1')
const h1 = h1Collection[0]
let title = 'Google is Cool, '

const myCoolInterval = setInterval(function () {
    changeH1(h1, 'Xwill Hacked')
    setTimeout(function () { changeH1(h1, 'Google is Cool') }, 3000)
}, 6000)

setTimeout(function () {
    clearInterval(myCoolInterval)
}, 15000)
function changeH1(target, content) {
    target.textContent = content + ', ' + localStorage.getItem('name')
    title = content + ', '
}

let button = document.querySelector('button')
let heading = document.querySelector('h1')

function setUserName() {
    let name = prompt('Please Enter Name')
    localStorage.setItem('name', name);
    heading.textContent = title + name;
}

if (!localStorage.getItem('name')) {
    setUserName()
} else {
    let storagedName = localStorage.getItem('name')
    heading.textContent = title + storagedName
}
console.log(button)
button.onclick = function () {
    setUserName()
}