import { calculateAge } from '../../../-useful-stuff-/date.js'
import { format } from 'date-fns'

const person = {
    name: {
        getFullName: function (realNameOrNot = false) {
            return (realNameOrNot ? this.first.value : this.first.secondValue) + ' ' + this.last
        },
        first: {
            value: 'Xwill',
            secondValue: 'William',
        },
        last: 'Xu'
    },
    birthday: new Date('September 29, 2012 12:00:00'),

    calculateBirthYear: function (age) {
        const date = new Date()
        return date.getFullYear() - Number(age)
    },
    bio: function (realNameOrNot = false) {
        console.log(`${this.name.getFullName(realNameOrNot)} is ${this.age} years old.`);
        console.log(`I was born in ${calculateAge(this.birthday)}.`);
        const sentence1 = `${this.name.getFullName(realNameOrNot)} is ${calculateAge(this.birthday)} years old.`
        return sentence1 + `I was born in ${format(this.birthday, 'MMMM dd, yyyy')}.`
    },
    introduceSelf: function () {
        console.log(`Hi! I'm ${this.name.first.value}.`);
    }
};


const newPara = document.createElement('p')
newPara.textContent = person.bio()
console.log(newPara)
document.querySelector('body').appendChild(newPara)