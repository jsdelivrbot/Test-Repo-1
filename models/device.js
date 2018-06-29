const mongoose = require('mongoose');
const MANIFEST ={
	'SmartPlugV1' :require('./smart-plug'),
	'SmartPlugV2' :require('./smart-plug-with-power-meter'),
	'SmartSwitch' :require('./smart-switch'),
	'InwallOutlet' :require('./inwall-outlet')
}

// Device Schema
const deviceSchema = mongoose.Schema({
	product_name: { type: String, required: true },
	description: { type: String },
	model: { type: String, required: true },
	dsn: { type: String, required: true },
	oem_model: { type: String, required: true },
	image_url: { type: String },
	mac: { type: String },
	lan_enabled: { type: String },
	connection_status: { type: String },
	connected_at: { type: Date, default: Date.now },
	sw_version: { type: String },
	template_id: { type: Number },
	mac: { type: String },
	unique_hardware_id: { type: String },
	hwsig: { type: String },
	lan_ip: { type: String },
	key: { type: String },
	has_properties: { type: String },
	product_class: { type: String },
	lat: { type: String },
	lng: { type: String },
	locality: { type: String },
	device_type: { type: String }
});


const Device = module.exports = mongoose.model('Device', deviceSchema);

// Get Devices
module.exports.getDevices = (callback, limit) => {

	Device.find(callback).limit(limit);
}

// Get Device
module.exports.getDeviceById = (id, callback) => {
	Device.findById(id, callback);
}

// Add Device
module.exports.addDevice = (device, callback) => {
	const devicePayload = MANIFEST[device.deviceType]
	devicePayload.product_name =device.product_name
	Device.create(devicePayload, callback);
}

// Update Device
module.exports.updateDevice = (id, device, options, callback) => {
	var query = { _id: id };
	var update = {
		product_name: device.product_name,
		description: device.description,
		model: device.model,
		dsn: device.dsn,
		oem_model: device.oem_model,
		image_url: device.image_url,
		mac: device.mac,
		lan_enabled: device.lan_enabled,
		connection_status: device.connection_status,
		connected_at: device.connected_at
	}
	Device.findOneAndUpdate(query, update, options, callback);
}

// Delete Device
module.exports.removeDevice = (id, callback) => {
	var query = { _id: id };
	Device.remove(query, callback);
}
