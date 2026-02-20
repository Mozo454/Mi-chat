const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const { Low, JSONFile } = require('lowdb');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Configurar base de datos con lowdb
const file = new JSONFile(path.join(__dirname, 'db', 'messages.json'));
const db = new Low(file);

// Datos iniciales
db.data ||= { messages: [], users: [] };

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Almacenar usuarios conectados
const connectedUsers = {};

io.on('connection', (socket) => {
  console.log('Nuevo usuario conectado:', socket.id);
  
  // Evento: Usuario se une a una sala
  socket.on('join-room', (data) => {
    const { username, room } = data;
    socket.join(room);
    
    connectedUsers[socket.id] = { username, room, socketId: socket.id };
    
    console.log(`${username} se unió a la sala: ${room}`);
    
    // Notificar a otros usuarios en la sala
    io.to(room).emit('user-joined', {
      username,
      message: `${username} se unió al chat`,
      users: getUsersInRoom(room)
    });
    
    // Enviar historial de mensajes
    db.read();
    const roomMessages = db.data.messages.filter(msg => msg.room === room);
    socket.emit('load-messages', roomMessages);
  });
  
  // Evento: Recibir mensaje
  socket.on('send-message', (data) => {
    const { message, username, room } = data;
    const timestamp = new Date();
    
    const messageObj = {
      username,
      message,
      room,
      timestamp: timestamp.toLocaleTimeString('es-ES'),
      socketId: socket.id
    };
    
    // Guardar en base de datos
    db.read();
    db.data.messages.push(messageObj);
    db.write();
    
    // Enviar a todos en la sala
    io.to(room).emit('receive-message', messageObj);
  });
  
  // Evento: Usuario se desconecta
  socket.on('disconnect', () => {
    const user = connectedUsers[socket.id];
    if (user) {
      const { username, room } = user;
      delete connectedUsers[socket.id];
      
      console.log(`${username} se desconectó de ${room}`);
      
      io.to(room).emit('user-left', {
        username,
        message: `${username} salió del chat`,
        users: getUsersInRoom(room)
      });
    }
  });
  
  // Evento: Obtener usuarios conectados
  socket.on('get-users', (room) => {
    socket.emit('users-list', getUsersInRoom(room));
  });
});

// Función auxiliar: obtener usuarios en una sala
function getUsersInRoom(room) {
  return Object.values(connectedUsers)
    .filter(user => user.room === room)
    .map(user => ({ username: user.username, socketId: user.socketId }));
}

// Iniciar servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});
