import displayMessage from "../../-useful-stuff-/createMessage";

const btn = document.querySelector('button');
btn.addEventListener('click', () => displayMessage('YOU ARE GETTING TO MANY MESSAGES YOU DEVICE IS ABOUT TO CRASH: BEST CASE. YOUR DEVICE HAS EXPLODED: Worst Case', 'warning'))