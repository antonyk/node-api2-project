const express = require('express');
const cors = require('cors');
const postsRouter = require('./posts/posts-router');

// Configure server
const server = express();
const port = 5000;
// Middleware
// 1. Enable json
server.use(express.json());
// 2. Enable cors
server.use(cors());
// 3. Apply Base URL
const api = express.Router();
server.use('/api/v1', api);
// 3. Apply all other routers
api.use('/posts', postsRouter);

api.get('/', (req, res) => {
  res.status(200).send("API is up and running!")
})

server.listen(port, () => {
  console.log(`\n=== Server listening on port ${port} ===\n`);
})