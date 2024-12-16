require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Message = require('./models/messages.js');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
const uri = process.env.MONGODB_URI;

// Connexion à MongoDB Atlas
mongoose.connect(uri)
    .then(() => console.log('MongoDB Atlas connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Configurer le dossier pour le frontend Angular
app.use(express.static('frontend/dist/frontend/browser'));

// Gestion des connexions Socket.IO
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Recevoir un message et l'enregistrer dans MongoDB
    socket.on('chat message', async (msg) => {
        try {
            const message = new Message({
                id: uuidv4(),
                text: msg.text,
                sender: msg.sender,
                timestamp: msg.timestamp
            });

            await message.save(); // Enregistrer dans MongoDB
            io.emit('chat message', {
                id: message.id,
                text: message.text,
                sender: message.sender,
                timestamp: message.timestamp.toISOString()
            });
        } catch (err) {
            console.error('Error saving message:', err);
        }
    });

    // Gérer la déconnexion d'un utilisateur
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Lancer le serveur
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
