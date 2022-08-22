function ConstructorCat(name, breed, color = 'white') {
    this.name = name
    this.breed = breed
    this.color = color

    this.greeting = function () {
        console.log(`Version: Constructor. Hi, said ${this.name} the ${this.breed}`)
    }
}

class ClassCat {
    constructor(name, breed, color = 'white') {
        this.name = name
        this.breed = breed
        this.color = color
    }

    greeting() {
        console.log(`Version: Class. Hi, said ${this.name} the ${this.breed}`)
    }

}

class WildCat extends ClassCat {
    constructor(name, breed, color = 'Multicolor') {
        super(name, breed, color)
        this.fleas = true
        this.rabies = true
        this.danger = 0.40
    }

    pounce(target = 'Xwill') {
        let damage = this.danger * 10
        let willKill = false
        if (this.rabies && this.fleas) willKill = true
        if (this.rabies) damage++
        if (this.fleas) damage += 0.5
        let startOfString = `${this.name} pounced on ${target} and`
        if (willKill) {

            console.log(`${startOfString} ${target} DIED.`)
        } else {
            console.log(`${startOfString} caused ${damage} damage.`)
        }
    }
}

const wildCat = new WildCat('Bertie', 'Cymric')
wildCat.greeting()