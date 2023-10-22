export default function random(minimum = 0, maximum = 100, floor = true) {
    let number
    if (floor) {
        number = Math.floor(Math.random() * (maximum - minimum + 1) + minimum)
    } else {
        number = Math.random() * (maximum - minimum + 1) + minimum
    }
    return number
}