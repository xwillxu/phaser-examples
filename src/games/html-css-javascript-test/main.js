
document.addEventListener('DOMContentLoaded', () => {
    const para = document.querySelector('p')

    para.addEventListener('click', updateName)


    function updateName() {
        const name = prompt('Enter Name')
        para.textContent = `Player 1: ${name}`
    }

    function createParagraph() {
        const para = document.createElement('p');
        para.textContent = 'You clicked the button!';
        document.body.appendChild(para);
    }

    const buttons = document.querySelectorAll('button');

    for (const button of buttons) {
        button.addEventListener('click', createParagraph);
    }
});