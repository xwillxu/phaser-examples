const names = ['Chris', 'Li Kang', 'Anne', 'Francesca', 'Mustafa', 'Tina', 'Bert', 'Jada']
const para = document.createElement('p');

// Add your code here
function chooseName() {
    const length = names.length - 1
    const randomName = Math.floor(Math.random() * length)
    para.textContent += `${names[randomName]}`
    console.log(randomName)
}

chooseName()
// Don't edit the code below here!

section.innerHTML = ' ';

section.appendChild(para);