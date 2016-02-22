var express = require('express');
var router = express.Router();

router.all('/', function (req, res) {
    res.sendFile('../public/index.html');
});

router.all('/test', function(req, res) {

    //res.setHeader('Access-Control-Allow-Origin', '*');
    ////res.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    //res.setHeader('Access-Control-Allow-Headers', 'test,other');

    res.send('ok');
});

router.all('/testjsonp', function(req, res) {
    res.setHeader('Content-Type', 'application/javascript'); //callback({a:1,b:2});
    res.send('callback(' + JSON.stringify({a:1, b:2}) + ')');
});


router.all('/testjsonp2', function(req, res) {
    res.setHeader('Content-Type', 'application/javascript'); //cb123({a:1,b:2})
    res.send(req.query.callback + '(' + JSON.stringify({a:1, b:2}) + ')');
});

router.all('/testjsonp3', function(req, res) {
    res.setHeader('Content-Type', 'application/javascript');
    res.send(req.query.cbname + '(' + JSON.stringify({a:1, b:2}) + ')');
});

module.exports = router;