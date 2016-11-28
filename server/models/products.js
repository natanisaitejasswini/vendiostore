var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
	product_name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 256
	},
	description: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 1000
	},
	category: {
		type:String,
	},
	quantity: {
		type: Number,
		// required: true
	},
	price: {
		type: Number,
		required: true
	},
	imageUrl: {
		type: String,
		required: true
	},
	weight: {
		type: String,
		minlength: 1,
		maxlength: 256
	},
	manufacturer: {
		type: String,
		minlength: 2,
		maxlength: 256
	},
	_user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
}, {timestamps: true})

mongoose.model('Product', ProductSchema);
