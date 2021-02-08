const express = require('express')
const colors = require('./colors')
const app = express()
const serv = require('http').Server(app)
const io = require('socket.io')(serv,{})

var targets = []
const socketList = {}

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/client/index.html')
})

app.use('/client', express.static(__dirname + '/client'))

serv.listen(2000)
console.log("Server started")

io.sockets.on('connection', (socket) => {
	socket.id = Math.random()
	socket.color = colors.randomColor()
	socketList[socket.id] = socket

	console.log('client#' + socket.id + ' connected')
	socket.emit('set-color', socket.color)
	socket.emit('update-targets', targets)

	socket.on('add-target', (data) => {
		console.log(socket.id + ' added target: ' + data.x + ', ' + data.y)
		targets.push(data)
		updateTargets()
	})
	
	socket.on('reset-targets', () => {
		targets = []
		updateTargets()
	})

	socket.on('disconnect', () => {
		console.log('client#' + socket.id + ' disconnected')
		delete socketList[socket.id]
	})
})

function updateTargets() {
	for(var id in socketList) {
		console.log(id)
		socketList[id].emit('update-targets', targets)
	}
}