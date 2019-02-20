const express = require('express');
const app = express();
const router = express.Router();

const path = __dirname + '/views/';

app.use('/', router);

router.get('/', function (req,res) {
	res.sendfile(path + 'home.html');
});

router.get('/product', function (req,res) {
	res.sendfile(path + 'product.html');
});

router.get('/about', function (req,res) {
	res.sendfile(path + 'about.html');
});

router.use('*', function (req,res) {
	res.sendfile(path + '404.html');
});

app.listen(3000, function () {
	console.log('server berjalan di port 3000');
	console.log('website berjalan di port 3000');
});