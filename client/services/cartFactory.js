myApp.factory("cartFactory", function($http, $location){
	var factory = {};

	factory.addToCart = function(index, newQty, callback){
		$http.post('/cart/' + index, {qty: newQty})
		.success(function(returnData){
			callback(returnData);
		})
	}

	factory.displayCart = function(callback){
		$http.get('/cart')
		.success(function(cartData){
			callback(cartData);
		})
	}

	factory.deleteProductFromCart = function(index, callback){
		$http.delete('/cart/' + index)
		.success(function(returnData){
			callback(returnData);
		})
	}

	factory.checkOut = function(callback){
		$http.get('/checkout')
		.success(function(cart){
			callback(cart);
			console.log('out from factory')
		})
	}
	return factory
})


