const h1Collection = document.getElementsByTagName('h1')
const h1 = h1Collection[0]

const myCoolInterval = setInterval(function () {
    changeH1(h1, 'Xwill Hacked')
    setTimeout(function () { changeH1(h1, 'Google is Cool') }, 3000)
}, 6000)

setTimeout(function () {
    clearInterval(myCoolInterval)
}, 15000)
function changeH1(target, content) {
    target.textContent = content
}