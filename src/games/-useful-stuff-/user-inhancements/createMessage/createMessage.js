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
    closeBtn.addEventListener("mouseover", () => {
        closeBtn.style.color = "white"
        closeBtn.style.backgroundColor = "red"
    })
    closeBtn.addEventListener("mouseout", () => {
        closeBtn.style.color = "black"
        closeBtn.style.backgroundColor = "#D7D7D7"
    })
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
            panel.style.backgroundColor = '#0C71E0'
            // msg.style.color = "#00BCD4"
            msg.style.color = "#FFDBE0"
            msg.style.paddingLeft = '20px'
            msg.style.paddingRight = '20px'
            panel.style.maxWidth = "30%"
            panel.style.margin = "auto"
            closeBtn.style.width = "25px"
            closeBtn.style.height = "25px"
            closeBtn.style.color = "black"
            closeBtn.style.backgroundColor = "#D7D7D7"
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