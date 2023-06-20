const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);
const port = process.env.PORT || 3030;
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
});

app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')));
} else {
  const corsOptions = {
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('code change', (codeBlock) => {
    // broadcast code changes to all connected clients except the sender
    socket.broadcast.emit('code change', codeBlock);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const codeBlockRoutes = require('./api/codeBlock/codeBlock.routes');
app.use('/api/codeBlock', codeBlockRoutes);

http.listen(port, () => {
  console.log('Server is running on port: ', port);
});
