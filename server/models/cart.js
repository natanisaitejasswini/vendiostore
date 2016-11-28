var mongoose = require('mongoose');

var CartSchema = new mongoose.Schema({
	_user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	_product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product'
	},
	product_name: {
		type: String
	},
	product_description: {
		type: String
	},
	product_price: {
		type: Number
	},
	product_quantity: {
		type: Number,
		default: 0
	},
	product_imageUrl: {
		type: String
	}

}, {timestamps: true})

mongoose.model('Cart', CartSchema);