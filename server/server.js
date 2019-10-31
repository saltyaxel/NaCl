const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const questions = require('./questions.json')
const cors = require('cors')
const port = process.env.PORT || 8000

app.use(cors())

const players = []
let result = []

function sleep (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

app.get('/result', (_req, res) => {
  res.status(200).send(players)
})

io.on('connection', socket => {
  players.push({ id: socket.id })
  socket.on('user', (data) => {
    console.log(`${data} connected!`)
    const player = players.find(player => player.id === socket.id)
    player.name = data
    player.points = 0
    io.emit('players', players)
  })

  socket.on('start-game', async selected => {
    const player = players.find(player => player.id === socket.id)
    const index = players.findIndex(player => player.id === socket.id)
    if (index === 0 || player.name === 'Axel Eriksson') {
      const selectedQuestions = questions[selected]
      io.emit('question', selectedQuestions[0])
      await sleep(10500)
      io.emit('question', selectedQuestions[1])
      await sleep(10500)
      io.emit('question', selectedQuestions[2])
      await sleep(10500)
      result = result.slice(0)
      io.emit('end-of-game', players)
    }
  })

  socket.on('disconnect', () => {
    const player = players.find(player => player.id === socket.id)
    const index = players.findIndex(player => player.id === socket.id)
    players.splice(index, 1)
    io.emit('players', players)
    console.log(`${player.name} disconnected. Removed the person from the game!`)
  })

  socket.on('answer', (data) => {
    const player = players.find(player => player.id === socket.id)
    player.points += data.points
    player.answered = true
    io.emit('players', players)
  })
})

server.listen(port, () => {
  console.log(`Listening to port ${port}...`)
})
