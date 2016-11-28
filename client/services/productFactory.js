myApp.factory("productFactory",function($http, $location){
	var factory = {};	

	factory.addProduct = function(data, callback){
		console.log('product in factory', data)
		$http.post('/products', data)
		.success(function(data){
			callback(data);
		})
	}

	factory.getProducts = function(callback){
		$http.get('/products')
		.success(function(productData){
			callback(productData);
		})
	}

	factory.getOneProduct = function(index, callback){
		$http.get('/products/' + index)
		.success(function(returnData){
			callback(returnData);
		})
	}

	factory.getProductsListing = function(callback){
		$http.get('/listings')
		.success(function(returnData){
			callback(returnData);
		})
	}

	factory.deleteProduct = function(index, callback){
		$http.delete('/product/' + index)
		.success(function(returnData){
			callback(returnData);
		})
	}

	factory.editProduct = function(index, updateProd, callback){
		$http.put('/products/' + index, updateProd)
		.success(function(returnData){
			callback(returnData);
		})
	}
	return factory

});
