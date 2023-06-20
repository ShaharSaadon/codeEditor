const express = require('express');
require('dotenv').config();

const app = express();
const http = require('http').createServer(app);
const port = process.env.PORT || 3030;

const codeBlockRoutes = require('./api/codeBlock/codeBlock.routes');
app.use('/api/codeBlock', codeBlockRoutes);

http.listen(port, () => {
  console.log('Server is running on port: ', port);
});
