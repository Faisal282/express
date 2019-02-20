const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const DBurl = "mongodb://127.0.0.1:27017/";
const DBname = "xir6";
const fs = require('fs');
const http = require('http');

let dbo = null;

MongoClient.connect(DBurl, (error, db) => {
	if (error) throw error;
	dbo = db.db(DBname);
});

app.use(bodyParser.urlencoded({extended: false}));

app.get('/siswa', (req, response) => {
	dbo.collection("user").find().toArray((err, res) => {
		if (err) throw err;
		response.json(res);
	})
	// fs.readFile('files/index.html', (err, data) => {
	// 	if (err) throw err;

	// 	// kirim respon
	// 	response.writeHead(200, {
	// 		'Content-Type': 'text/html'
	// 	});
	// 	response.write(data);
	// 	response.end();
	// });

});

// app.get('/siswa/:nama/:kelas', (req, res) => {
// 	let namaSiswa = req.params.nama; 
// 	let kelas = req.params.kelas; 
// 	res.end("menampilkan nama siswa : " + namaSiswa + " kelas : " + kelas);
// });

app.post('/siswa', (request, response) => {
	let namaSiswa = request.body.nama;
	// let alamat = request.body.alamat;
	// res.send('menampilkan siswa baru ' + namaSiswa + ', yang beralamat di ' + alamat);
	dbo.collection("siswa").insertOne({
		nama : namaSiswa,
		// alamat : alamat, 
	}), (err, res) => {
		if (!err) {
			response.json(res);
			response.end('data berhasil masuk :)');
		} else {
			throw err;
		}
	}
});

app.delete('/siswa/:id', (req,res) => {
	let id = req.params.id;
	let namaSiswa = req.body.nama;
	res.end('id ' + id + ' telah dihapus, dengan nama: ' + namaSiswa);
});

app.put('/siswa/:id', (req, res) => {
	let id = req.params.id;
	let namaSiswa = req.body.nama;
	let alamat = req.body.alamat;
	res.end('siswa dengan id : ' + id + ' telah di update');
});

app.listen('3000', function () {
	console.log('sedang berjalan pada port 3000');
});