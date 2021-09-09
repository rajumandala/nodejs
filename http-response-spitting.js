// currently express framework do not check for newline characters
// it is vulnerable to http splitting attack

// example:
// start the server
// browse http://localhost:3000/?foo=bar%0D%0ASet-Cookie%3Aname%3Dvalue
// you will be re redirected to another page and cookie will be set

var express = require('express');
var app = express.createServer();

app.get('/', function(req, res) {
    var foo = req.query['foo'];

    if(foo) {
        res.redirect('/target?foo=' + foo);
    } else {
        res.send('please provide foo parameter');
    }
});

app.get('/target', function(req, res) {
    var foo = req.query['foo'];

    if(foo) {
        res.send(foo);
    } else {
        res.send('foo parameter is empty');
    }
});

app.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');