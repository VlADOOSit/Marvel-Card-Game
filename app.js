const express = require('express');
const mainRoutes = require('./Routes/main-routes.js');
const session = require('express-session');
const socket = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socket(server);

const jsonParser = express.json();

const PORT = process.env.PORT || 3000;

app.use(
    session({
        secret: 'session secret',
        resave: true,
        saveUninitialized: true
    })
);
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + '/js'));
app.use(mainRoutes);

app.use(function (req, res, next) {
    res.status(404).send("404 Not Found")
});

let search_users = [];

io.on("connection", (socket) => {  

    socket.on('start-search', () => {
        search_users.push(socket.id);
        socket.join(`${search_users[0]}room`);
        console.log(`user ${socket.id} start search`);
        if (search_users.length == 2 ) {
            console.log(`users ${search_users[1]} join ${search_users[0]}`);
            
            io.to(`${search_users[0]}room`).emit('start-game', {creator: search_users[0], opponent: search_users[1]});
            search_users = [];
        }
    });

    socket.on('close-search', () => {
        console.log(`user ${socket.id} stop search`);
        search_users.splice(search_users.indexOf(socket.id), 1);
    });

    //io.to(id).emit('checkedStart', socket.id);
    socket.on('setName', (id, login) => {
        io.to(id).emit('getName', login);
    });
    socket.on('setAva', (id, img) => {
        io.to(id).emit('getAva', img);
    });
    socket.on('endCourse', (id) => {
        console.log(`${socket.id} end course`);
        console.log(`${id} start`);
        io.to(id).emit('startCourse');
    });

    socket.on('cardOnBoard', (id, index) => {
        io.to(id).emit('cardOnBoardState', index);
    });

    socket.on('setHit', (id, indexOfCard, indexOfGoalCard) => {
        io.to(id).emit('getHit', indexOfCard, indexOfGoalCard);
    });

    socket.on("disconnecting", () => {
        console.log(`id is ${Array.from(socket.rooms)[1]}`); // the Set contains at least the socket ID
        io.to(Array.from(socket.rooms)[1]).emit('leave');
    });

    socket.on("disconnect", () => {
        // socket.rooms.size === 0
        search_users.splice(search_users.indexOf(socket.id), 1);
        console.log(`user ${socket.id} stop search`);
    });
    
});

server.listen(PORT, () => {
    console.log(`Server start on http://localhost:${PORT}`);
});
