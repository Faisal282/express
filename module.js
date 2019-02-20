var methods = {};

methods.function_satu = function () {
	const express = require('express');
	const app = express();
	const bodyParser = require('body-parser');
	const MongoClient = require('mongodb').MongoClient;
	const ObjectID = require('mongodb').ObjectID;
	const DBurl = "mongodb://127.0.0.1:27017/";
	const DBname = "xir6";
	const fs = require('fs');
	const http = require('http');
}

exports.data = methods;