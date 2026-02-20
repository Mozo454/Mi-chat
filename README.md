# ENTREPRIMOS.ORG Chat Application

## Overview
The ENTREPRIMOS.ORG chat application is a real-time chat application designed for seamless communication. It is built using modern web technologies and aims to provide a user-friendly interface for users.

## Installation Instructions
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Mozo454/Mi-chat.git
   cd Mi-chat
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the application**:
   ```bash
   npm start
   ```

## Features
- Real-time messaging between users.
- User authentication.
- Group chat functionality.
- Emoji support.
- File sharing.

## Project Structure
```
Mi-chat/
├── public/              # Static files
├── src/                 # Source files
│   ├── components/      # React components
│   ├── hooks/           # Custom hooks
│   ├── pages/           # Application pages
│   ├── services/        # API services
│   └── App.js           # Main application file
├── .env                 # Environment variables
├── package.json         # Project metadata and dependencies
└── README.md            # Project documentation
```

## Technology Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **WebSocket**: Socket.IO
- **Database**: MongoDB

## Socket.IO API Documentation
1. **Connection**: Clients connect to the server using Socket.IO.
2. **Events**:
   - `message`: Sends a message to a specific room.
   - `join`: Triggered when a user joins a room.
   - `leave`: Triggered when a user leaves a room.
3. **Example**:
   ```javascript
   socket.emit('message', { room: 'general', msg: 'Hello World!' });
   ```

## Deployment Options
- **Heroku**: Deploy using Heroku CLI.
- **Docker**: Build and run using Docker containers.

## Environment Variables
- `PORT`: Port number to run the server.
- `MONGODB_URI`: MongoDB connection string.

## Security Information
- Use HTTPS for secure communication.
- Implement user authentication to secure endpoints.

## Troubleshooting Guide
- **Problem**: Unable to connect to the server.
  - **Solution**: Check if the server is running and the correct port is being used.
- **Problem**: Messages not being sent.
  - **Solution**: Ensure the Socket.IO connection is established.
