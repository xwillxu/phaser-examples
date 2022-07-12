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