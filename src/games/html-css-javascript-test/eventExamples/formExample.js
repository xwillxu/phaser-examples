const btn = document.querySelector('button');
const videoBox = document.querySelector('div');

function displayVideo() {
    if (videoBox.getAttribute('class') === 'hidden') {
        videoBox.setAttribute('class', 'showing');
    }
}

btn.addEventListener('click', displayVideo);
videoBox.addEventListener('click', () => videoBox.setAttribute('class', 'hidden'));

const video = document.querySelector('video');

video.addEventListener('click', () => video.play());