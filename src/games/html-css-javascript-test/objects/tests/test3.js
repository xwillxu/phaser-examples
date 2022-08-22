function Cat(name, breed, color = 'white') {
    this.name = name
    this.breed = breed
    this.color = color

    this.greeting = function () {
        console.log(`Hi, said ${this.name} the ${this.breed}`)
    }
}

const cat = new Cat('Bertie', 'Cymric')
cat.greeting()
const cat2 = new Cat('Randy', 'Siberian Cat')
cat2.greeting()