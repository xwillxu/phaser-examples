class Person {
    constructor(name) {
        this.name = name
    }
    introduceSelf() {
        console.log(`My name is ${this.name}`)
    }
}

class Professor extends Person {
    constructor(name, teaches) {
        super(name, teaches)
        this.name = name
        this.teaches = teaches
    }

    gradePaper(paperType) {
        const gradeScore = Math.floor(Math.random() * 12)
        let consoleString = ''
        if (gradeScore <= 2) {
            consoleString = 'A+'
        } else if (gradeScore > 2 && gradeScore <= 4) {
            consoleString = 'A'
        } else if (gradeScore > 4 && gradeScore <= 6) {
            consoleString = 'A-'
        } else if (gradeScore > 6 && gradeScore <= 8) {
            consoleString = 'B+'
        } else if (gradeScore > 8 && gradeScore <= 10) {
            consoleString = 'B'
        } else {
            consoleString = 'B-'
        }

        console.log(`Your grade on your ${paperType} is ${consoleString}`)
    }

    introduceSelf() {
        console.log(`My name is Professor ${this.name} and i will teaching you ${this.teaches}`)
    }
}
class Student extends Person {
    constructor(name, year) {
        super(name, year)
        this.name = name
        this.year = year
    }
    introduceSelf() {
        console.log(`My name is ${this.name} and i'm in my ${toString(this.year)}`)
    }
}

const walsh = new Professor('Walsh', 'Psychology')
walsh.introduceSelf()  // 'My name is Professor Walsh and I will be your Psychology professor.'

const summers = new Student('Summers', 1)
summers.introduceSelf() // 'My name is Summers and I'm in the first year.'

const pratt = new Person('Pratt')
pratt.introduceSelf() // 'My name is Pratt.'