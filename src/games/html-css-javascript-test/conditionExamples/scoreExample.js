let response;
let score = 101;
let machineActive = true;

// Add your code here
console.log(machineActive)
if (machineActive == false) {
    response = 'Please Turn On The Machine'
    console.log('off')
} else if (machineActive == true) {
    response = 'The Machine Is On'
    console.log('on')
    if (score >= 0 && score <= 100) {
        if (score <= 19) {
            response = 'That was a terrible score — total fail!'
        } else if (score <= 39) {
            response = "You know some things, but it's a pretty bad score. Needs improvement."
        } else if (score <= 69) {
            response = "You did a passable job, not bad!"
        } else if (score <= 89) {
            response = "That's a great score, you really know your stuff."
        } else if (score >= 90) {
            response = "What an amazing score! Did you cheat? Are you for real?"
        }
    } else {

        response = "This is not possible, an error has occurred."
    }
}


// Don't edit the code below here!

section.innerHTML = ' ';
let para1 = document.createElement('p');
let para2 = document.createElement('p');

para1.textContent = `Your score is ${score}`;
para2.textContent = response;

section.appendChild(para1);
section.appendChild(para2);