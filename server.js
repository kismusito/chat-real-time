const express = require('express');
const app = express();
const http = require('http').createServer(app);
const socket = require('socket.io')(http);
const cors = require('cors');
const path = require('path');
const { setUser , getUser } = require('./utils/User');

app.use(express.static(path.join(__dirname , 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.set('view engine' , 'ejs')

socket.on('connection' , io => {

    io.on('joinRoom' , ({userID}) => {
        const user = getUser(userID);
        console.log(user)
        io.join(user.room);
    })

    io.on('userLogin' , async ({userID , username , room}) => {
        setUser(io.id , userID , username ,room);
    });


    io.on('newMessage' , ({userID , message}) => {
        const user = getUser(userID);
        io.to(user.room).emit('newMessage' , {
            userID: user.userID,
            username: user.username,
            message
        })
    })
});

// Routes
app.use(require('./routes/main'));

module.exports = http;