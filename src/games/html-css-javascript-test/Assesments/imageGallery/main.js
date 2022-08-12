const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const picArray = ['1', '2', '3', '4', '5',]

/* Declaring the alternative text for each image file */
const altDict = {
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
}
/* Looping through images */
for (const key of picArray) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', '/gallery-images/pic' + key + '.jpg');
    newImage.setAttribute('alt', 'alt' + altDict[key]);
    thumbBar.appendChild(newImage);
    newImage.addEventListener('click', () => {
        displayedImage.setAttribute('src', newImage.getAttribute('src'))
    })
}
/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', () => {
    switch (btn.className) {
        case 'dark':
            btn.className = 'light'
            btn.textContent = 'Lighten'
            overlay.style.backgroundColor = 'rgba(0,0,0,0.5)'
            break;
        case 'light':
            btn.className = 'dark'
            btn.textContent = 'Darken'
            overlay.style.backgroundColor = 'rgba(0,0,0,0)'
            break;
        default:
            break;
    }
})