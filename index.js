const express = require('express')
// const postsRouter = require('./posts/posts-router')

// Configure server
const server = express();
const port = 5000;
// Middleware
// 1. Enable json
server.use(express.json());
// 2. Apply all routers




server.listen(port, () => {
  console.log("\n=== Server listening ===\n");
})