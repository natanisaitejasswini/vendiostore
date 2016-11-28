myApp.controller('ShowProdController', function(productFactory, userFactory,cartFactory, $location, $routeParams){
	var self = this;
	self.user = [];
	self.allProducts = [];
	self.oneProduct = {};
	self.getOneProduct = getOneProduct;
	self.setOneProduct = setOneProduct;
	self.addToCart = addToCart;
	self.logout = logout;

	if($routeParams.id){
		getSession();
		getOneProduct($routeParams.id);
	}
	else if(!$routeParams.id){
		getProducts();
	}
	
	function getSession () {
		userFactory.getSession(function(factoryData){
			console.log('Factory data is', factoryData)
			self.current_user = factoryData.user.name
			self.current_pic = factoryData.user.pic
			console.log('name is',self.current_user)
		})
	}

	function getProducts(){
		getSession();
		productFactory.getProducts(function(productData){
			self.allProducts = productData;
		})
	}

	function getOneProduct(index){
		productFactory.getOneProduct(index, setOneProduct);
	}
	function setOneProduct(returnData){
		self.oneProduct = returnData;

	}

	function addToCart(index){
		cartFactory.addToCart(index, self.newQty, function(returnData){
			if(returnData.status){
				$location.url('/cart');
			} else {
				console.log("error occured");
			}
		})
	}

	function logout(){
		userFactory.logout(function(data){
			if(data.status){
				$location.url('/');
			} else {
				self.errors = data.errors;
			}
		})
	}
})
