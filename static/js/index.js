const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'https://block-new-wkus.onrender.com',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log('A user connected')

  socket.on('message', (data) => {
    console.log('Message received:', data)
    io.emit('message', data) // Broadcast to all clients
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })
})

server.listen(3000, () => {
  console.log('Server is running on port 3000')
})
