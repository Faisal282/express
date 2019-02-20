// import modul
const express = require('express');
const app = express();

// method get
app.get('/test', (req, res) => {
	res.end('ini get xi rpl 6');
});

// method post
app.post('/test', (req, res) => {
	res.end('ini post xi rpl 6');
});

// print username
app.get('/user/:name', function (req, res) {
	res.jsonp(req.params);
});

// inisialisasi port
app.listen('3000', (e) => {
	console.log(e);
});