const logger = require('./logger.service');

let gIo = null;
let userCount = 0;

function setupSocketAPI(http) {
  gIo = require('socket.io')(http, {
    cors: {
      origin: '*',
    },
  });

  gIo.on('connection', (socket) => {
    console.log(`New connected socket [id: ${socket.id}]`);
    userCount++;
    console.log(`User count: ${userCount}`);

    if (userCount === 1) {
      // This is the first user (teacher), so they can't edit
      socket.emit('is teacher', true);
    } else {
      // This is the second or subsequent user (student), so they can edit
      socket.emit('is teacher', false);
    }

    socket.on('disconnect', () => {
      console.log(`Socket disconnected [id: ${socket.id}]`);
      userCount--;
      console.log(`User count: ${userCount}`);
    });

    socket.on('code change', (codeBlock) => {
      // broadcast code changes to all connected clients except the sender
      socket.broadcast.emit('code change', codeBlock);
    });
  });
}

module.exports = {
  setupSocketAPI,
};
