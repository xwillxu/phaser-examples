const buttonBar = document.querySelector('.button-bar');

// Add your code here

buttonBar.addEventListener('click', (event) => {
    event.target.style.backgroundColor = event.target.getAttribute('data-color')
})