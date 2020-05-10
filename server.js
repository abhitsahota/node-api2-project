// package imports
const express = require('express')

// app imports
const postsRouter = require('./routers/postsRouter')

const server =  express()

server.use(express.json())
server.use('/api/posts', postsRouter)

server.get('/', (req, res) => {
    res.send(`<h2>Posts API</h>`);
  });

module.exports = server