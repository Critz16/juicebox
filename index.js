const PORT = 3000;
const express = require('express');
const server = express();
const app = express();



server.listen(PORT, () => {
    console.log('The server is up on port', PORT)
});

const apiRouter = require('./api');
server.use('api',apiRouter);

server.use((req, res, next) => {
    console.log ("____Body Logger START____");
    console.log(req.body);
    console.log("_____Body Logger END_____");

    next();
});

app.get('/api', (req, res, next) => {
    console.log("A get request was made to the /api");
    res.send({ message: "success" })
});

app.use('/api', (req, res, next) => {
    console.log("a request was made to the /api");
    res.send({ message: "success"});
});
