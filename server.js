const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('../client'));

let players = {};
io.on('connection', socket => {
    console.log('Player connected', socket.id);
    players[socket.id] = { pos:{x:0,y:0,z:0}, hp:100, energy:100, elements:{fire:0,water:0,air:0,earth:0} };
    socket.on('playerUpdate', data=>{
        players[socket.id] = {...players[socket.id], ...data};
        io.emit('updatePlayers', players);
    });
    socket.on('disconnect', ()=>{ delete players[socket.id]; });
});
http.listen(3000,()=>console.log('Server running on port 3000'));