let randomNumber = Math.floor(Math.random() * 100) + 1;
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
let guessCount = 1;
let resetButton;

function checkGuess() {


    const userGuess = parseInt(guessField.value);
    if (guessCount === 1) {
        guesses.textContent = 'Previous guesses: ';
    }

    let nanVarible = isNaN(userGuess)
    if (nanVarible == true) {
        return
    }

    guesses.textContent += userGuess + ' ';

    if (userGuess === randomNumber) {
        lastResult.textContent = 'Congratulations! You got it right!';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = '!!!GAME OVER!!!';
        lowOrHi.textContent = '';
        setGameOver();
    } else {
        lastResult.textContent = 'Wrong!';
        lastResult.style.backgroundColor = 'red';
        if (userGuess < randomNumber) {
            lowOrHi.textContent = 'Last guess was too low!';
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = 'Last guess was too high!';
        }
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}

function resetGame() {
    guessCount = 1;
    const resetParas = document.querySelectorAll('.resultParas p');
    for (const resetPara of resetParas) {
        resetPara.textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    lastResult.style.backgroundColor = 'white';
    randomNumber = Math.floor(Math.random() * 100) + 1;

}


// let inputs = []

// let answer = 0

// let wonContainer = document.querySelector("#youWon")

// let restartButton = document.querySelector("#restart")

// restart()


// restartButton.onclick = (e) => {

//     restart()
// }

// function restart() {
//     answer = parseInt(Math.random() * 100) + 1
//     console.log('answer', answer)
//     restartButton.hidden = true
//     wonContainer.innerHTML = ''
//     inputs = []

// }

// // Send message to room on submit
// document.querySelector("#form").onsubmit = function (e) {
//     e.preventDefault();

//     var input = document.querySelector("#input");

//     console.log("input:", input.value);
//     let userAnswer = parseInt(input.value)
//     console.log(userAnswer)
//     let nanVarible = isNaN(userAnswer)
//     if (nanVarible == true) {
//         return
//     }

//     console.log('nan', nanVarible)
//     inputs.push(userAnswer)

//     let highOrLowContainer = document.querySelector('#highOrLow')

//     if (userAnswer == answer) {
//         let wonVarible = document.createElement('div')
//         wonContainer.innerHTML = ''
//         wonVarible.innerText = 'Congratulations! You got it right!'
//         restartButton.hidden = false
//         wonContainer.appendChild(wonVarible)
//     } else {
//         let wonVarible = document.createElement('div')
//         wonContainer.innerHTML = ''
//         wonVarible.innerText = 'Wrong!'
//         wonContainer.appendChild(wonVarible)

//         let hint = ''
//         if (userAnswer < answer) {
//             hint = 'You answer was too low.'
//         } else {
//             hint = 'You answer was too high.'
//         }
//         let highOrLowVarible = document.createElement('div')
//         highOrLowContainer.innerHTML = ''
//         highOrLowVarible.innerText = hint
//         highOrLowContainer.appendChild(highOrLowVarible)
//     }


//     let display = document.getElementById('answerDisplay')
//     display.innerText = `Answer: ${inputs}`



//     // clear input
//     input.value = "";

// }