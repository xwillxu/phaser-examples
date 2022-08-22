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

const cat = new ClassCat('Bertie', 'Cymric')
cat.greeting()
// const cat = new Cat('Randy', 'Siberian Cat')
// cat.greeting()
const cat2 = new ConstructorCat('Bertie', 'Cymric')
cat2.greeting()
// const cat2 = new Cat('Randy', 'Siberian Cat')
// cat2.greeting()