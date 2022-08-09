// Import Stuff
import randomMaximumMinimum from '../../-useful-stuff-/randomMinimumMaximum'

// Get HTML Elements
const container = document.querySelector('.container')

function rgbColor() {
    const newColor = 'rgb(' + randomMaximumMinimum(0, 255) + ', ' + randomMaximumMinimum(0, 255) + ', ' + randomMaximumMinimum(0, 255) + ')'
    return newColor
}

container.addEventListener('click', (e) => {
    e.target.style.backgroundColor = rgbColor()
})