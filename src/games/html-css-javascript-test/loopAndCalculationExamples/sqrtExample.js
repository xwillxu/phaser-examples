const para = document.querySelector('p');
const input = document.querySelector('input');
const btn = document.querySelector('button');

btn.addEventListener('click', () => {
    para.textContent = 'Output: ';
    const num = input.value;
    input.value = '';
    input.focus();

    for (let i = 1; i <= num; i++) {
        const sqrt = Math.sqrt(i)
        if (Math.floor(sqrt) !== sqrt) {
            continue;
        }

        para.textContent += `${i}, `

    }

    para.textContent += `Those are all the squares and whole numbers(no decimals).`

});
