const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const path = require('path')

server.listen(80, () => {
  console.log('Listening to port 80...')
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

io.on('connection', socket => {
  console.log('User connected!')
  socket.emit('news', { hello: 'world' })
  socket.on('my other event', data => {
    console.log(data)
  })
  socket.on('test', (data) => {
    console.log(data)
  })
  socket.on('disconnect', () => {
    console.log('User Disconnected!')
  })
})
