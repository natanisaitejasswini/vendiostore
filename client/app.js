var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider){
	$routeProvider
  .when('/dashboard', {
		templateUrl: 'partials/dashboard.html'
	})
	.when('/profile', {
		templateUrl: 'partials/profile.html'
	})
	.when("/newProduct", {
         templateUrl: "partials/addProduct.html"
  })
  .when("/listings", {
       templateUrl: "partials/list.html"
    })
  .when("/edit/:id", {
       templateUrl: "partials/editProduct.html"
    })
   .when("/show/:id", {
       templateUrl: "partials/showProduct.html"
    })
   .when("/cart", {
       templateUrl: "partials/cart.html"
    })
   .when("/checkout", {
       templateUrl: "partials/checkOut.html"
    })
   .when("/orderPlaced", {
       templateUrl: "partials/finalpage.html"
    })
	.otherwise({
		redirectTo: '/'
	})
})
