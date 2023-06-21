const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
let corsOptions;
let userCount = 0;

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')));
} else {
  const corsOptions = {
    origin: [
      'http://127.0.0.1:3030',
      'http://localhost:3030',
      'http://localhost:3000',
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

app.use(cors(corsOptions));

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

const codeBlockRoutes = require('./api/codeBlock/codeBlock.routes');

app.use(express.json()); // handle with put requests
app.use('/api/codeBlock', codeBlockRoutes);

const port = process.env.PORT || 3030;
http.listen(port, () => {
  console.log('Server is running on port: ', port);
});
