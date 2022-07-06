const select = document.querySelector('select');
const para = document.querySelector('p');

select.addEventListener('change', setTaste);

function setTaste() {
    const choice = select.value

    if (choice == 'Good') {
        para.textContent = 'This is amazing food. The best in the world'
    } else if (choice == 'Bad') {
        para.textContent = 'This is awful food. I will never eat it again even if i have to die.'
    } else {
        para.textContent = 'Please Make A Choice'
    }
}