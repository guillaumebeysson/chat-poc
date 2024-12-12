const socket = io();
const chat = document.getElementById('chat');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');

let myId = null;

// Récupérer l'ID utilisateur
socket.on('connect', () => {
    myId = socket.id;
});

// Ajouter un message avec positionnement
function addMessage(msg) {
    const div = document.createElement('div');
    div.textContent = msg.text;

    // Déterminer si c'est l'utilisateur local ou un autre
    if (msg.sender === myId) {
        div.classList.add('my-message');
    } else {
        div.classList.add('other-message');
    }

    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

// Recevoir l'historique
socket.on('chat history', (history) => {
    history.forEach(addMessage);
});

// Recevoir un nouveau message
socket.on('chat message', (msg) => {
    addMessage(msg);
});

// Envoyer un message
function sendMessage() {
    const message = messageInput.value;
    if (message.trim()) {
        socket.emit('chat message', message);
        messageInput.value = '';
    }
}

// Gérer le clic sur le bouton Envoyer
sendButton.addEventListener('click', () => {
    sendMessage();
});

// Gérer l'appui sur la touche Entrée
messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});