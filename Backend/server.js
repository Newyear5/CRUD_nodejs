var http = require('http');
const users = require('./db');
const express = require('express');
const app = express();
const path = require('path');
const appdir = path.dirname(__dirname);
const router = express.Router();
const port = process.env.port || 8000;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

router.get("/", (req,res) => {
    res.send("Hello");
    console.log(appdir+'/Frontend/demofile.html');
});
router.get('/users', (req,res) => {
    res.json(users)
})
router.get('/users/:id', (req, res) => {
    res.json(users.find(user => user.id === Number(req.params.id)))
});
router.get('/first',(req,res) => {
    res.sendFile(path.join(appdir,'/Frontend/demofile.html'));
});
app.get('/',router);
app.get('/first',router);
app.get('/users',router);
app.get('/users/:id',router);

app.post('/users', (req,res) => {
    users.push(req.body)
    let json = req.body
    res.send(`Add new user '${json.username}' completed.`)
})
app.put('/users/:id', (req, res) => {
    const updateIndex = users.findIndex(user => user.id === Number(req.params.id))
    res.send(`Update user id: '${users[updateIndex].id}' completed.`)
  })
app.delete('/users/:id', (req, res) => {
    const deletedIndex = users.findIndex(user => user.id === Number(req.params.id))
    res.send(`Delete user '${users[deletedIndex].username}' completed.`)
  })

app.listen(port,() => {
    console.log("Starting node.js at port " + port)
});

/*
const options = {
    host: 'www.google.com',
};
const req = http.get(options);
var fs = require('fs');
var url = require('url');
var dt = require('./module');
req.end();
req.once('response', (res) => {
    const ip = req.socket.localAddress;
    const port = req.socket.localPort;
    console.log(`Your IP address is ${ip} and your source port is ${port}.`);
})
http.createServer(function (req, res) {
    var q = url.parse(req.url, true).query;
    var txt = q.year + " " + q.month;

    res.writeHead(200, { 'Content-Type': 'text/html' });
    // res.write("The date and time are currently: " + dt.myDateTime());
    res.end(txt);
}).listen(8000, () => {
    console.log("Server is running at port 8000");
})
*/