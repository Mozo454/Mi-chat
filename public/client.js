// Socket.IO client logic for real-time chat functionality

const socket = io();

// Join a room
function joinRoom(room) {
    socket.emit('joinRoom', room);
}

// Send a message
function sendMessage(message) {
    socket.emit('chatMessage', message);
}

// Listen for incoming messages
socket.on('message', (msg) => {
    displayMessage(msg);
});

// Display message in the chat
function displayMessage(msg) {
    const messageElement = document.createElement('div');
    messageElement.textContent = msg;
    document.getElementById('messages').appendChild(messageElement);
}

// Listen for connected users
socket.on('users', (users) => {
    displayUsers(users);
});

// Display connected users
function displayUsers(users) {
    const usersList = document.getElementById('users');
    usersList.innerHTML = '';
    users.forEach(user => {
        const userElement = document.createElement('li');
        userElement.textContent = user;
        usersList.appendChild(userElement);
    });
}