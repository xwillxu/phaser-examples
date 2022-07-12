let machineActive = true;
let pwd = 'cheese';

let machineResult;
let pwdResult;

// Add your code here

if (machineActive) {
    machineResult = 'Machine Is On, Ready To Start Working.'
    pwdResult = (pwd == 'cheese') ? 'You Have Successfully Logged In' : 'Sorry Please Try Again'
} else {
    machineResult = 'Machine Is Off, Please Turn On.'
}

// Don't edit the code below here!

section.innerHTML = ' ';
let para1 = document.createElement('p');
let para2 = document.createElement('p');