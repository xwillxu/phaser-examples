class Shape {
    constructor(name, sides, sideLength) {
        this.name = name
        this.sides = sides
        this.sideLength = sideLength
    }

    calcPerimeter() {
        console.log(this.sideLength * this.sides)
    }

}


class Square extends Shape {
    constructor(name = "square", sideLength = 5) {
        super(name, 4, sideLength)
    }
}

class Triangle extends Shape {
    constructor(name = "triangle", sideLength = 3) {
        super(name, 3, sideLength)
    }
}


const newTriangle = new Triangle()
newTriangle.calcPerimeter()
const newSquare = new Square()
newSquare.calcPerimeter()