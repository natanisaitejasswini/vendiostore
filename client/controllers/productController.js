myApp.controller('productController', function(productFactory, userFactory, $location){
	var self = this;
	self.user = [];
	self.newProduct = {};
	self.addProduct = addProduct;


	getSession();

	function getSession () {
		userFactory.getSession(function(factoryData){
			self.current_user = factoryData.user.name
			self.current_pic = factoryData.user.pic
		})
	}

	function addProduct(){
	// var new_product = {
  //    product_name: self.newProduct.product_name, description: self.newProduct.description, category: self.newProduct.category, qunatity: self.newProduct.quantity, price: self.newProduct.price, imageUrl: self.newProduct.imageUrl, weight: self.newProduct.weight, manufacturer: self.newProduct.manufacturer}
  //    console.log(new_product)
		productFactory.addProduct(self.newProduct, function(data){
			self.newProduct = {};
			if(data.status){
				console.log('dvsmvbfd')
				$location.url('/listings');
				console.log('dvsmvbfd')
			}
			else{
				$location.url('/newProduct');
			}
		})
	}

})
