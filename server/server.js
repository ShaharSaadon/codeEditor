const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);
const port = process.env.PORT || 3030;

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

const codeBlockRoutes = require('./api/codeBlock/codeBlock.routes');
app.use('/api/codeBlock', codeBlockRoutes);

http.listen(port, () => {
  console.log('Server is running on port: ', port);
});
