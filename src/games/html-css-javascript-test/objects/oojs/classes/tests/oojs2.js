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

    calcArea() {
        console.log(this.sideLength ** 2)
    }
}

const newSquare = new Square()
newSquare.calcPerimeter()
newSquare.calcArea()

const largeSquare = new Square('large square', 10)
largeSquare.calcPerimeter()
largeSquare.calcArea()