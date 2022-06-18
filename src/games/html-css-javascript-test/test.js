let inputs = []

let answer = parseInt(Math.random() * 100) + 1
console.log('answer', answer)

// Send message to room on submit
document.querySelector("#form").onsubmit = function (e) {
    e.preventDefault();

    var input = document.querySelector("#input");

    console.log("input:", input.value);
    let userAnswer = parseInt(input.value)
    console.log(userAnswer)
    let nanVarible = isNaN(userAnswer)
    if (nanVarible == true) {
        return
    }

    console.log('nan', nanVarible)
    inputs.push(userAnswer)

    if (userAnswer == answer) {
        alert('You won')
    }
    let display = document.getElementById('answerDisplay')
    display.innerText = `Answer: ${inputs}`



    // clear input
    input.value = "";

}