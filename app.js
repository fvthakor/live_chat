const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const { Server } = require("socket.io");
var cors = require('cors')
app.use(cors())
const io = new Server(server);
app.use(express.static(path.join(__dirname, './my-app/dist')));
app.get('/', (req, res) => {
  res.sendFile(__dirname + './my-app/dist/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});

server.listen(process.env.PORT || 3000, () => {
  console.log('listening on:3000');
});