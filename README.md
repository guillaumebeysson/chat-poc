# Chat PoC

This project is a Proof of Concept (PoC) for a real-time chat system. It uses `Node.js` and `Socket.IO` for real-time communication between users. Messages are stored in a JSON file (`messages.json`) for data persistence.

---

## Features

- Real-time chat between multiple users.
- Message persistence by saving to a JSON file.
- Chat without history: each user starts a session without seeing previous messages.
- Timestamp added to messages (complete date and time).

---

## Technologies Used

- **Frontend:**
  - HTML, CSS, JavaScript
- **Backend:**
  - Node.js
  - Socket.IO
  - File system (`fs`) for managing the JSON file
- **Message storage file:**
  - `messages.json`

---

## Prerequisites

Ensure you have the following installed:

1. [Node.js](https://nodejs.org) (version 14+ recommended)
2. A modern web browser (Chrome, Firefox, etc...)

---

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/guillaumebeysson/chat-poc.git
   cd chat-poc

2. Install the necessary dependencies:
`nmp install`

3. Start the server:
`node server.js`

4. Open your browser and access:
`http://localhost:3000`

---

## Usage

1. Start the server with:

   ```bash
   node server.js

2. Open http://localhost:3000 in your browser.

3. Open multiple tabs or browsers to test the real-time chat functionality.

4. Send messages and observe their synchronization across clients.

---

## Technical Details

### Backend:
- **Socket.IO** manages WebSocket connections between clients.
- Messages are stored in `messages.json` with:
  - A unique ID.
  - The message text.
  - The user ID (`socket.id`).
  - A full timestamp.

### Frontend:
- Messages are dynamically displayed in the chat window without reloading the page.
- Each message is identified as:
  - **"Sent"** if sent by the user.
  - **"Received"** if sent by another user.

### Data Persistence:
- Messages are saved to `messages.json` on the server.
- Messages are **not displayed** to users when a new session starts.

