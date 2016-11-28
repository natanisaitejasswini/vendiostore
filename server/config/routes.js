var path = require('path');
var users = require(path.join(__dirname, '..', 'controllers', 'users.js'))
var products = require(path.join(__dirname, '..', 'controllers', 'products.js'))
var carts = require(path.join(__dirname, '..', 'controllers', 'carts.js'))
module.exports = function(app) {
	//*************************************************************************************
	app.post('/login', users.login),
	app.post('/user/getone/:id', function(req, res){
		users.getOneUser(req, res);
	})
	app.get('/user/session', function(req, res){
		users.getSession(req, res)
	})
	app.get('/user/logout/', function(req, res){
		users.logout(req, res)
	})
	//*************************************************************************************
	app.get('/main', function(req, res){
		res.render(__dirname +'./../../client/main.html');
	})

	//************************************************************************************
	// EMAIL ROUTE 

	app.get('/email/:email', function (req, res, next) {
		app.mailer.send('email.html', {
		to: req.params.email, // REQUIRED. This can be a comma delimited string just like a normal email to field. 
		subject: 'Welcome to Store', // REQUIRED.
		otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
		}, function (err) {
		if (err) {
		  console.log(err);
		  res.send('There was an error sending the email');
		  return;
		}
		return res.send({status: 'success'});
		});
	});
	// //////////////////////////////////////////////////
	app.post('/products', function(req,res){
		products.create(req,res);
	})
	app.get('/products', function(req,res){
		products.index(req,res);
	})
	app.get('/products/:id', function(req,res){
		products.findOne(req,res);
	})
	app.get('/listings', function(req,res){
		products.myListings(req,res);
	})
	app.delete('/product/:id', function(req,res){
		products.delete(req,res);
	})
	app.put('/products/:id', function(req,res){
		products.update(req,res);
	})
	////////////////////////////////////////////////////
	app.post('/cart/:id', function(req,res){
		carts.addProduct(req,res);
	})
	app.get('/cart', function(req,res){
		carts.displayCart(req,res);
	})
	app.delete('/cart/:id', function(req,res){
		carts.deleteProductFromCart(req,res);
	})
	app.get('/checkout', function(req,res){
		carts.checkOut(req,res);
	})
	// ////////////////////////////////////////////////
	app.get('/email/:email', function (req, res, next) {
		app.mailer.send('email.html', {
		to: req.params.email, // REQUIRED. This can be a comma delimited string just like a normal email to field. 
		subject: 'Welcome to Vendio!', // REQUIRED.
		otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
		}, function (err) {
		if (err) {
		  console.log(err);
		  res.send('There was an error sending the email');
		  return;
		}
		return res.send({status: 'success'});
		});
	});
	///Shipping notification/////////////////////
	// app.get('/email/:email', function (req, res, next) {
	// 	app.mailer.send('ship.html', {
	// 	to: req.params.email, // REQUIRED. This can be a comma delimited string just like a normal email to field. 
	// 	subject: ' Your product is on its way! ', // REQUIRED.
	// 	otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
	// 	}, function (err) {
	// 	if (err) {
	// 	  console.log(err);
	// 	  res.send('There was an error sending the email');
	// 	  return;
	// 	}
	// 	});
	// });
}

