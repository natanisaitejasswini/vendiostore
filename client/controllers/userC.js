myApp.controller('usersController', function($window, $scope, userFactory, $location, $routeParams){
	$scope.current_user = null;
	$scope.updateUser = null;
	$scope.average = 0;
	userFactory.getSession(function(data){
		$scope.current_user = data.user
		$scope.updateUser = $scope.current_user
		if($scope.current_user.name ==null){
			$window.location.href="/dashboard";
		}
	})
	console.log('usersController is working for login part')
});