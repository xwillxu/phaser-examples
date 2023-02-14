export default function displayMessage(msgText, msgType, msgName = 'User') {
    const body = document.body

    const panel = document.createElement('div')
    panel.setAttribute('class', 'msgBox')
    body.appendChild(panel)

    const msg = document.createElement('p')
    if (msgType == 'chat') {
        msg.textContent = msgName + ': ' + msgText
    } else if (msgType == 'warning') {
        msg.textContent = 'WARNING: ' + msgText
    } else {
        msg.textContent = msgText
    }

    panel.appendChild(msg)

    const closeBtn = document.createElement('button')
    closeBtn.textContent = 'x'
    panel.appendChild(closeBtn)

    closeBtn.addEventListener('click', () => panel.parentNode.removeChild(panel))
    switch (msgType) {
        case 'warning':
            msg.style.backgroundImage = 'url(https://raw.githubusercontent.com/mdn/learning-area/main/javascript/building-blocks/functions/icons/warning.png)'
            panel.style.backgroundColor = 'red'
            panel.style.width = "342px"
            msg.style.textTransform = "uppercase";
            msg.style.fontWeight = 'bolder'
            break;
        case 'sorry':
            msg.style.backgroundImage = 'url(https://raw.githubusercontent.com/mdn/learning-area/main/javascript/building-blocks/functions/icons/warning.png)'
            panel.style.backgroundColor = 'yellow'
            panel.style.width = "342px"
            msg.style.textTransform = "uppercase";
            msg.style.fontWeight = 'bolder'
            break;
        case 'chat':

            msg.style.backgroundImage = 'url(https://raw.githubusercontent.com/mdn/learning-area/main/javascript/building-blocks/functions/icons/chat.png)'
            panel.style.backgroundColor = 'blue'
            break
        case 'happy':
            msg.style.backgroundImage = 'url(http://www.get-emoji.com/images/emoji/2705.png)'
            panel.style.backgroundColor = 'green'
            break
        default:
            msg.style.paddingLeft = '20px'
            break;
    }
}