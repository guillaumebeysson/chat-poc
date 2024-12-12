const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs'); // Importer le module fs

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Charger les messages depuis le fichier JSON au démarrage
const loadMessages = () => {
    try {
        const data = fs.readFileSync('messages.json', 'utf8');
        return JSON.parse(data); // Charger et parser le JSON
    } catch (err) {
        console.log('No previous messages found or failed to load:', err.message);
        return []; // Retourne un tableau vide si le fichier n'existe pas ou est illisible
    }
};

let messages = loadMessages(); // Charger les anciens messages

// Sauvegarder les messages dans un fichier JSON
const saveMessages = () => {
    fs.writeFileSync('messages.json', JSON.stringify(messages, null, 2), 'utf8');
};

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Ne pas envoyer l'historique des messages aux nouveaux utilisateurs
    socket.emit('chat history', []);

    // Recevoir un message et le transmettre
    socket.on('chat message', (msg) => {
        const message = { id: Date.now(), text: msg, sender: socket.id, timestamp: new Date().toISOString() };
        messages.push(message); // Ajouter le nouveau message à la mémoire
        saveMessages(); // Sauvegarder les messages dans le fichier
        io.emit('chat message', message); // Diffuser aux utilisateurs connectés
    });

    // Déconnexion
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
