const app = require('express')();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const monitor = require('node-usb-detection');
const io = require('socket.io')(http);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/hello', function (req, res) {
    res.send({ express: 'Hello From Back End Server', list: monitor.list() });
});


io.on('connection', function (socket) {
    console.log('connected user');
    io.emit('responsefrombackend', { express: 'Hello From Back End Server', list: monitor.list() });
});

monitor.change((device) => {
    io.emit('responsefrombackend', { express: 'Hello From Back End Server', list: monitor.list() });
});

http.listen(5000, function () {
    console.log('listening on *:5000');
});