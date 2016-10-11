/*function AppCtrl(){
	console.log("Hello World from controller")
}
*/

var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope', '$http', function($scope, $http){

var refresh = function(){
	$http.get('/emaillist').success(function(response){

	console.log("I got data requested");
	$scope.emaillist = response;
	$scope.email = "";
	});	 	
};

refresh();

$scope.addEmail = function(){  
	console.log($scope.email);
	$http.post('/emaillist', $scope.email).success(function(response){
		 console.log(response);
		 refresh();
	});
};
console.log("Hello World From Controller");

$scope.remove = function(id){
	console.log(id);
	$http.delete('/emaillist/' + id).success(function(response){
		 refresh();
	});
};

}] );

