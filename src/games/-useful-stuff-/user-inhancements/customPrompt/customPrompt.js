export default function customPrompt(text, buttonText, backgroundColor) {
    const promptDiv = document.createElement("div")
    promptDiv.id = "custom-prompt"
    const promptInnerDiv = document.createElement("div")
    promptInnerDiv.id = "prompt-inner-div"
    const promptParaText = document.createElement("p")
    promptParaText.innerText = String(text)
    promptInnerDiv.append(promptParaText)
    const promptButton = document.createElement("button")
    promptButton.innerText = String(buttonText)
    promptDiv.append(promptInnerDiv, promptButton)

}
