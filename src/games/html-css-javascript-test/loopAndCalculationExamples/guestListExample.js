const people = ['Chris', 'Anne', 'Colin', 'Terri', 'Phil', 'Lola', 'Sam', 'Kay', 'Bruce'];

const admitted = document.querySelector('.admitted');
const refused = document.querySelector('.refused');
admitted.textContent = 'Admit: ';
refused.textContent = 'Refuse: ';

for (let i = 0; i < people.length; i++) {
    const person = people[i]
    if (person == 'Phil' || person == 'Lola') {
        refused.textContent += `${person}, `
    } else {
        admitted.textContent += `${person}, `;
    }
}



