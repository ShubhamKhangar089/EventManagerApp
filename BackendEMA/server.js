const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const connectToDB = require('./src/configs/db');
const userRouter = require('./src/routers/UserRouter');
const eventRouter = require('./src/routers/EventRouter');
// const http = require('http');
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);


app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;
const uri = process.env.URI;

// Set up Socket.IO
// const socket = require('./src/socket');


app.get('/home', (req, res) => {
    try {
        console.log("home route");
        res.status(200).json("this is home route");
    } catch (error) {
        res.status(500).json("error on home route");
    }
});

//userRouter
app.use('/user', userRouter)

//eventRouter
app.use('/event', eventRouter);

//notifications


app.listen(port, async () => {
    try {
        await connectToDB(uri);
        console.log(`Server running on port ${port}`);
    } catch (error) {
        console.log('Error while connecting to the database:', error);
    }
});
