# Chat PoC

This project is a Proof of Concept (PoC) for a real-time chat system using Node.js, Socket.IO, and MongoDB. It provides a simple chat interface for multiple users with message persistence.

---

## Features

- Real-time chat between multiple users.
- Messages stored in MongoDB for persistence.
- Simple chat interface built with Angular.

---

## Technologies Used

- **Frontend:**
  - Angular
- **Backend:**
  - Node.js
  - Express
  - Socket.IO

---

## Prerequisites

Ensure you have the following installed:

1. [Node.js](https://nodejs.org) (version 14+ recommended)
2. A modern web browser (Chrome, Firefox, etc...)
3. MongoDB Atlas (cloud database)

---

## Installation

1. Clone this repository:
`git clone https://github.com/guillaumebeysson/chat-poc.git`
`cd chat-poc`

2. Install backend dependencies:
`npm install`

3. Install Angular frontend dependencies:
`cd frontend`
`npm install`

4. Configure MongoDB:
- Create a `.env` file at the root of the project.
- Add this MongoDB connection string:
`MONGODB_URI=mongodb+srv://guillaumebeysson:3M1ip7Q05FUwcMPy@cluster0.xaipw.mongodb.net/chat?retryWrites=true&w=majority&appName=Cluster0`

5. Build the Angular project:
`ng build`

6. Start the server:
go back to chat-poc directory and use:
`node server.js`

7. Open your browser and access:
`http://localhost:3000`

---

## Usage

1. Open multiple browser tabs to simulate multiple users.

2. Send messages in real-time and observe synchronization.

3. Messages are persisted in the MongoDB Atlas database.


---

## Technical Details

### Backend:
Manages WebSocket connections and stores messages in MongoDB using Mongoose.

### Frontend:
Built with Angular to dynamically display chat messages.

### Data Persistence:
Messages include:
- Unique ID (UUID)
- Text content
- Sender ID
- Timestamp

