require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
});

let corsOptions;
let userCount = 0;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')));
  corsOptions = {
    origin: '*',
  };
} else {
  corsOptions = {
    origin: [
      'http://127.0.0.1:3030',
      'http://localhost:3030',
      'http://localhost:3000',
      'http://localhost:4000',
      'http://localhost:5173',
      'http://127.0.0.1:5173',
    ],
    credentials: true,
  };
}

io.on('connection', (socket) => {
  console.log('a user connected');
  userCount++;
  console.log('userCount:', userCount);

  if (userCount === 1) {
    // This is the first user (teacher), so they can't edit
    socket.emit('is teacher', true);
  } else {
    // This is the second or subsequent user (student), so they can edit
    socket.emit('is teacher', false);
  }

  socket.on('code change', (codeBlock) => {
    // broadcast code changes to all connected clients except the sender
    socket.broadcast.emit('code change', codeBlock);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    userCount--;
    console.log('userCount:', userCount);
  });
});

app.use(cors(corsOptions));

const codeBlockRoutes = require('./api/codeBlock/codeBlock.routes');

app.use(express.json()); // handle with put requests
app.use('/api/codeBlock', codeBlockRoutes);

const port = process.env.PORT || 3030;
http.listen(port, () => {
  console.log('Server is running on port: ', port);
});
