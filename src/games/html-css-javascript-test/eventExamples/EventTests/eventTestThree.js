const buttonBar = document.querySelector('.button-bar');

buttonBar.addEventListener('click', (event) => {
    event.target.style.backgroundColor = event.target.getAttribute('data-color')
})