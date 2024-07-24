const socket = io();

let name;
let SetName = document.querySelector('#name');
let textArea = document.querySelector('#textArea');
let messageArea = document.querySelector('.main_area')
let btn = document.querySelector('#btn')

// Wait for user util he enters his NAME(Infinite loop)
do{
    name = prompt("Enter your NAME")
    SetName.textContent = '~' + name;
}while(!name)

// If click on send button then add message to the text area. 
btn.addEventListener('click', () => {
        // Get the value from the textArea input field
        sendMessage(textArea.value);
});
    
// If any key is pressed
textArea.addEventListener('keyup',(e)=>{
        if(e.key === 'Enter') // If enter is pressed
        {
            sendMessage(e.target.value) //Send message
        }
});

// Send the message
function sendMessage(msg1) {
        let msg = {
            user : name,
            message : msg1.trim()
        }
        if(msg.message !== '')
        {
            appendMessage(msg,'outgoing')
            socket.emit('message',msg) // Emit the message so that reciver can recieve it.
            textArea.value = ''
        }
    }

// Append to the main div
function appendMessage(msge,type) {
        let mainDiv = document.createElement('div');
        let className = type
        mainDiv.classList.add(className,'message') //Add two classes to the above created div
    
        let markup = `
            <h6>~${msge.user}</h6>
            <p>${msge.message}</p>
        `

        mainDiv.innerHTML = markup
        messageArea.appendChild(mainDiv) // Append div to the mainDiv
        scrollToBottom();
    }

// Send the message too.
socket.on('message',(msg)=>{
        appendMessage(msg,'incoming')
        scrollToBottom()
    })


function scrollToBottom() {
        const container = document.querySelector('.main_area'); // Area to scroll down
        container.scrollTop = container.scrollHeight;
    }