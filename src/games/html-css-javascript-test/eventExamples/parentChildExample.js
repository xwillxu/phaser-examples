const divs = document.querySelectorAll('div')
let red = 0
let blue = 80
const addOn = 6.53846153846
for (const div of divs) {
    div.style.backgroundColor = `rgba(${red}, ${blue}, 255, 1)`
    red += 1.66666666667 * addOn
    blue += addOn
}
