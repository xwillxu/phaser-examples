let button1 = document.querySelector('#button1')
let button2 = document.querySelector('#button2')
let textBox = document.querySelector('#textBox')

// 1.
button1.onclick = () => { console.log('clicked1') }

// 2.
button2.addEventListener('click', () => { console.log('clicked2') })

// 3.
textBox.addEventListener('keydown', (event) => {
    console.log(`You typed down ${event.key}`)
})

function one() {
    const two = '2'
    console.log(two)
}

function one() {
    const two = 'two'
    console.log(two)
}

one()