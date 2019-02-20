const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const DBurl = "mongodb://127.0.0.1:27017/";
const DBname = "xir6";
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}))

let dbo = null;

MongoClient.connect(DBurl, { useNewUrlParser: true }, (error, db) => {
	if (error) throw error;
	dbo = db.db(DBname);
});

app.get('/', (request, response) => {
	dbo.collection("siswa").find().toArray((err, res) => {
		if (err) throw err;
		response.json(res);
	});
});

app.post('/siswa', (request, response) => {
	let namaSiswa = request.body.nama;
	let alamatSiswa = request.body.alamat;	
	dbo.collection("siswa").insertOne({
		nama : namaSiswa,
		alamat : alamatSiswa	
	}, (err, res) => {
		if (!err) {
			response.json(res);
			response.end("data berhasil masuk");
		} else {
			throw err;
		}
	})
}); 

app.delete('/siswa/:id', (request, response) => {
	let id = request.params.id;
	let id_object = new ObjectID(id);
	dbo.collection("siswa").deleteOne({
		_id : id_object 
	}, (err, res) => {
		if (err) throw err;
		response.end("data berhasil dihapus");
	})
});

app.put('/siswa/:id', (request, response) => {
	let id = request.params.id;
	let id_object = new ObjectID(id);
	let namaSiswa = request.body.nama;
	let alamatSiswa = request.body.alamat;
	// let kelasSiswa = request.body.kelas;
	// let jurusanSiswa = request.body.jurusan;
	dbo.collection("siswa").updateOne({
		_id : id_object
	}, {$set: {
		nama: namaSiswa,
		alamat: alamatSiswa,
		// kelas: kelasSiswa,
		// jurusan: jurusanSiswa
	}}, (err, res) => {
		if(err) throw err;
		response.end("data berhasil di update");
	})
});

app.listen(3000, function () {
	console.log('berjalan pada port 3000');
});
