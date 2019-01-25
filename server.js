var express = require('express');
const request = require('request');

var app = express();
var oauth = {
    consumer_key: '', // OAUTH consumer key
    consumer_secret: '', // OAUTH consumer secret
    token: '', // OAUTH token
    token_secret: '' // OAUTH token secret
};
function telldusRequest(url) {
    return new Promise((resolve, reject) => {
        request.get('http://api.telldus.com/json'+url, {
            oauth: oauth
        }, function (err, result, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        })
    });
}

app.get('/clients', function (req, res) {
    telldusRequest('/clients/list').then(value => res.send(value)).catch(reason => console.log(reason));
});

app.get('/sensors', function (req, res) {
    telldusRequest('/sensors/list').then(value => res.send(value)).catch(reason => console.log(reason));
});

app.get('/sensor/info', function (req, res) {
    let id = req.query.id
    telldusRequest('/sensor/info?id='+id).then(value => res.send(value)).catch(reason => console.log(reason));
});

app.get('/devices', function (req, res) {
    telldusRequest('/devices/list').then(value => res.send(value)).catch(reason => console.log(reason));
});

app.get('/device/info', function (req, res) {
    let id = req.query.id
    telldusRequest('/device/info?id='+id+'&supportedMethods=1023').then(value => res.send(value)).catch(reason => console.log(reason));
});

app.get('/events', function (req, res) {
    telldusRequest('/events/list').then(value => res.send(value)).catch(reason => console.log(reason));
});


app.listen(3000);
console.log('Listening on port 3000...');

/*
*/




