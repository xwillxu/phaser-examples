let output = document.querySelector('.output');
output.innerHTML = '';

const para = document.createElement('p');

output.appendChild(para);


for (let i = 10; i >= 0; i--) {
    if (i == 10) {
        para.textContent += `Launching rocket in ${i}, `;
    } else if (i == 0) {
        para.textContent += `BLAST OFF!.`;
    } else {
        para.textContent += `${i}, `;
    }

}


