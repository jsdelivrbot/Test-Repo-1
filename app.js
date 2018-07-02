const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Device =require('./models/device');

// Connect to Mongoose
mongoose.connect('mongodb://guna:test123@ds121311.mlab.com:21311/devicestore');
var db = mongoose.connection;

app.get('/', (req, res) => {
	res.send('Please use /api/devices');
});

app.get('/api/genres', (req, res) => {
	Genre.getGenres((err, genres) => {
		if(err){
			throw err;
		}
		res.json(genres);
	});
});



app.get('/api/devices', (req, res) => {
	Device.getDevices((err, devices) => {
		if(err){
			throw err;
		}
		res.json(devices);
	});
});

app.get('/api/devices/:_id', (req, res) => {
	Device.getDeviceById(req.params._id, (err, device) => {
		if(err){
			throw err;
		}
		res.json(device);
	});
});

app.post('/api/devices', (req, res) => {
	var device = req.body;
	Device.addDevice(device, (err, device) => {
		if(err){
			throw err;
		}
		res.json(device);
	});
});

app.put('/api/devices/:_id', (req, res) => {
	var id = req.params._id;
	var device = req.body;
	Device.updateDevice(id, device, {}, (err, device) => {
		if(err){
			throw err;
		}
		res.json(device);
	});
});

app.delete('/api/devices/:_id', (req, res) => {
	var id = req.params._id;
	Device.removeDevice(id, (err, device) => {
		if(err){
			throw err;
		}
		res.json(device);
	});
});

app.listen(process.env.PORT || 3000);
console.log('Running on port Allocated by Heroku...');
