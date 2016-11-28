myApp.controller('showCartController',function(cartFactory, userFactory, $location){
	var self = this;
	self.allProducts = [];
	self.deleteProductFromCart = deleteProductFromCart;
	self.checkOut = checkOut;
	self.prod = {};
	self.val = {};

	displayCart();
	
	function getSession () {
		userFactory.getSession(function(factoryData){
			self.current_user = factoryData.user.name
			self.current_pic = factoryData.user.pic
		});
	}

	function displayCart(){
		getSession();
		cartFactory.displayCart(function(cartData){
			if(cartData){
				self.allProducts = cartData;
				self.oneProduct = self.allProducts[0];
				var value = 0;
				for(var i=0; i<self.allProducts.length; i++){
					var total = self.allProducts[i].product_price * self.allProducts[i].product_quantity;
					self.allProducts[i].total = total;
					value = value + total;
				}
				self.val = {value:value};
			} else{
				self.flag = 0;
			}
		})
	}

	function deleteProductFromCart(index){
		cartFactory.deleteProductFromCart(index, function(returnData){
			self.allProducts = returnData;
		})
	}

	function checkOut(){
		cartFactory.checkOut(function(){
			$location.url('/orderPlaced');
		})
	}

})

