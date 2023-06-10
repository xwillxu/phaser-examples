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
            msg.style.backgroundImage = 'url(https://static.vecteezy.com/system/resources/previews/012/042/292/original/warning-sign-icon-transparent-background-free-png.png)'
            panel.style.backgroundColor = 'red'
            panel.style.width = "342px"
            msg.style.textTransform = "uppercase";
            msg.style.fontWeight = 'bolder'
            break;
        case 'sorry':
            msg.style.backgroundImage = 'url(https://static.vecteezy.com/system/resources/previews/012/042/301/original/warning-sign-icon-transparent-background-free-png.png)'
            panel.style.backgroundColor = 'yellow'
            panel.style.width = "342px"
            msg.style.textTransform = "uppercase";
            msg.style.fontWeight = 'bolder'
            break;
        case 'chat':
            panel.style.backgroundColor = '#132B24'
            msg.style.color = "#54D6AC"
            msg.style.paddingLeft = '200px'
            msg.style.paddingRight = '200px'
            panel.style.paddingLeft = '180px'
            panel.style.paddingRight = '180px'
            panel.style.maxWidth = "50%"
            panel.style.margin = "auto"
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