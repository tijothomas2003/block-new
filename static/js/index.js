const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: ['https://block-new-wkus.onrender.com', 'http://localhost:5173'],
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`)

  socket.on('message', (data) => {
    console.log(`Message from ${socket.id}:`, data)
    io.emit('message', data)
  })

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`)
  })
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
