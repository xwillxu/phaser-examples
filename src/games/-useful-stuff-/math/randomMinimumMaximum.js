export default function random(minimum = 0, maximum = 100) {
    const number = Math.floor(Math.random() * (maximum - minimum + 1) + minimum)
    return number
}