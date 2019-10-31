const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const questions = require('./questions.json')

const players = []

function sleep (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

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
    const selectedQuestions = questions[selected]
    io.emit('question', selectedQuestions[0])
    await sleep(10000)
    io.emit('question', selectedQuestions[1])
    await sleep(10000)
    io.emit('end-of-game', players)
    // selectedQuestions.forEach(async question => {
    //   socket.emit('question', question)
    //   await setTimeout(() => {
    //     console.log('Wait over!')
    //   }, 10000)
    // })
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
    io.emit('players', players)
  })
})

server.listen(80, () => {
  console.log('Listening to port 80...')
})
