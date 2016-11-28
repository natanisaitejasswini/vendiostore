var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var User = mongoose.model('User');
var Cart = mongoose.model("Cart");
var async = require("async");

module.exports = {

	addProduct: function(req,res){
		User.findOne({_id : req.session.userId}, function(err, user){
			if(err){
				console.log("Error....User not found");
				res.json({status: false});
			} else{
				Product.findOne({_id: req.params.id}, function(err, prod){
					if(err){
						console.log("Error....product not found");
						res.json({status: false});
					} else{	
						if(req.body.qty > prod.quantity){
						}
						else{
								var cart = new Cart({
								_user: req.session.userId,
								_product: req.params.id,
								product_name: prod.product_name,
								product_description: prod.description,
								product_price: prod.price,
								product_quantity: req.body.qty,
								product_imageUrl: prod.imageUrl
							})
							cart.save(function(err){
								if(err){
									console.log("Error.... Cart could not be saved");
									res.json({status: false});
								} else{
									res.json({status: true});
								}
							});
						}
					}
				});
			}
		});
	},

	displayCart: function(req,res){
		Cart.find({_user : req.session.userId}, function(err, cart){
			if(err){
				console.log("You have no items in the cart");
			} else {
				res.json(cart);
			}
		})
	},

	deleteProductFromCart: function(req,res){
		Cart.remove({_id: req.params.id}, function(err){
			if(err){
				console.log("This user does not have any item in the cart");
			} else{
				Cart.find({_user : req.session.userId}, function(err, cart){
					if(err){
						res.json(err);
					} else{
						res.json(cart);
					}
				})
			}
		})
	},

	checkOut: function(req,res){
		Cart.find({_user : req.session.userId}, function(err, cart){
			async.each(cart, function(cart_product, callback){
				Product.findOne({_id: cart_product._product}, function(err, prod){
					if(err){
						console.log("product not found in the products table");
					} else{
						var newQuantity = prod.quantity - cart_product.product_quantity;
						console.log('new qty is', newQuantity)
						prod.quantity = newQuantity;
						prod.save(function(err){
							if(err){
								console.log("new Qty could not be saved.");
							} else{
								console.log("New Qty saved!!");
							}
						});
					}
				});
				callback()
			}, function(err){
				if(err){
					console.log("done!");
				}else{
					Cart.remove({_user: req.session.userId}, function(err){
						if(err){
							console.log("Cannot delete products from the cart");
						}
						else{
							console.log('Removed from cart')
							console.log(cart,'cart is')
							res.json(cart);
						}
					})
				}
			});
		})
	},
	

}
