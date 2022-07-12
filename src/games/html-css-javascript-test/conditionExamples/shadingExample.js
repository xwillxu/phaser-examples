const select = document.querySelector('select');
const html = document.querySelector('.output');

select.addEventListener('change', () => {
    const choice = select.value;

    // ADD SWITCH STATEMENT
    let bgColor;
    let textcolor;
    switch (choice) {
        case 'white':
            bgColor = 'white'
            textcolor = 'black'
            break
        case 'black':
            bgColor = 'black'
            textcolor = 'white'
            break
        case 'purple':
            bgColor = 'purple'
            textcolor = 'yellow'
            break
        case 'yellow':
            textcolor = 'purple'
            bgColor = 'yellow'
            break
    }
    update(bgColor, textcolor)
});

function update(bgColor, textColor) {
    html.style.backgroundColor = bgColor;
    html.style.color = textColor;
}