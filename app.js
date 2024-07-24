require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express();

const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

io.on('connection',(socket)=>{
    console.log('Connected')
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
})

const PORT = process.env.PORT || 3001
http.listen( PORT, () => {
    console.log('Server is running on port' + PORT);
}); 