const contacts = [
    {
        name: 'Bank',
        phoneNumber: '4166728126',
    },
    {
        name: 'Xwill',
        phoneNumber: '4166401928',
    },
    {
        name: 'Jade',
        phoneNumber: '9059384721'
    }
];
const para = document.querySelector('p');
const input = document.querySelector('input');
const btn = document.querySelector('button');

btn.addEventListener('click', () => {
    const searchName = input.value.toLowerCase();
    input.value = '';
    input.focus();
    para.textContent = '';
    for (const contact of contacts) {
        const contactName = contact.name
        if (contactName.toLowerCase() == searchName) {
            para.textContent = contactName + '\'s phone number is ' + contact.phoneNumber + '.'
            break;
        }
    }
    if (para.textContent === '') {
        para.textContent = 'Contact not found.';

    }

});
