import { stringifyNumber } from '../../../../-useful-stuff-/number'

class Person {
    constructor(name) {
        this.name = name
    }
    introduceSelf() {
        console.log(`My name is ${this.name}.`)
    }
}

class Professor extends Person {
    constructor(name, teaches) {
        super(name)
        this.name = name
        this.teaches = teaches
    }

    gradeClass(classType, gradeScore) {
        let consoleString = ''
        if (gradeScore >= 100) {
            consoleString = 'A+'
        } else if (gradeScore < 100 && gradeScore >= 90) {
            consoleString = 'A'
        } else if (gradeScore < 90 && gradeScore >= 80) {
            consoleString = 'A-'
        } else if (gradeScore < 80 && gradeScore >= 70) {
            consoleString = 'B+'
        } else if (gradeScore < 70 && gradeScore >= 60) {
            consoleString = 'B'
        } else {
            consoleString = 'B-'
        }

        console.log(`Your grade on ${classType} class is ${consoleString} or ${gradeScore}`)
    }

    introduceSelf() {
        console.log(`My name is Professor ${this.name} and i will teaching you ${this.teaches}.`)
    }
}
class Student extends Person {
    #year
    constructor(name, year) {
        super(name)
        this.name = name
        this.#year = year
    }
    introduceSelf() {
        console.log(`My name is ${this.name} and i'm in my ${stringifyNumber(this.year)} year.`)
    }

    canStudyArchery() {
        return this.#year > 1
    }

    setYear(year) {
        this.#year = year
    }

    getYear() {
        return this.#year
    }
}

const walsh = new Professor('Walsh', 'Psychology')
walsh.introduceSelf()  // 'My name is Professor Walsh and I will be your Psychology professor.'

const summers = new Student('Summers', 1)
summers.introduceSelf() // 'My name is Summers and I'm in the first year.'

const pratt = new Person('Pratt')
pratt.introduceSelf() // 'My name is Pratt.'

function checkStudent(student, professor) {
    if (student.canStudyArchery()) {
        const studentAccuracy = 79 + ((student.getYear() - 1) * 7)
        professor.gradeClass('Archery', studentAccuracy)
    } else {
        console.log('You are too young to study archery')
    }
}

checkStudent(summers, walsh)


summers.setYear(4)
checkStudent(summers, walsh)
