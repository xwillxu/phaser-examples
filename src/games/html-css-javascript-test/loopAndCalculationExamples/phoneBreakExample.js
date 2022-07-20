const contacts = [
    {
        name: 'Ben',
        phoneNumber: '4166728126',
    },
    {
        name: 'Xwill',
        phoneNumber: '4166401928',
    },
    {
        name: 'Jade',
        phoneNumber: '9059384721'
    },
    {
        name: 'Chris',
        phoneNumber: '3568875687',
    },
    {
        name: 'Mary',
        phoneNumber: '3234435987',
    },
    {
        name: 'Samuel',
        phoneNumber: '3562445561',
    },
    {
        name: 'William',
        phoneNumber: '2345674210',
    },
    {
        name: 'Brandon',
        phoneNumber: '5675324681',
    },
    {
        name: 'Matthew',
        phoneNumber: '1245163464',
    },
    {
        name: 'Martin',
        phoneNumber: '4161687332',
    },
    {
        name: 'Jada',
        phoneNumber: '4161292282',
    },
    {
        name: 'Bert',
        phoneNumber: '4162987780',
    },
    {
        name: 'Tina',
        phoneNumber: '4164274312',
    },
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
