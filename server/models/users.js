var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
	first_name: {type : String, required : true, unique : true},
	last_name : { type : String, required : true, unique: true},
	picture : { type: String},
	email :{ type : String, required : true},
	phone: {type : String},
	fbid : { type: String},
	gid : { type: String},
	_products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product'
		}
	]
}, { timestamps: true
});
mongoose.model('User', UserSchema);
