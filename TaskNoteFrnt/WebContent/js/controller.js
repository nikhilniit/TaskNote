var tasknote=angular.module("tasknote",['ngRoute','ngCookies']);
tasknote.config(function($routeProvider){
	$routeProvider
					
		.when("/login",
					
			{
				
		templateUrl:"view/login.html",
		controller:"loginController"
			
			})
			
			.when("/userHome",
					
			{
				
		templateUrl:"view/userHome.html",
		controller:"userHomeController"
			
			})
			.when("/comtask",
					
			{
				
		templateUrl:"view/comtask.html",
		controller:"comTaskController"
			
			})
			
	.when("/logout",
			{
		templateUrl:"view/logout.html",
		controller:"logoutController"
		
	})
	.when("/task",
			{
		templateUrl:"view/mytasks.html",
		controller:"mytasksController"
		
	})
	
	.when("/register",
	{
		templateUrl:"view/register.html",
		controller:'registerController'
	});
});
tasknote.directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
          
          element.bind('change', function(){
             scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
             });
          });
       }
    };
 }]);

tasknote.service('fileUpload', ['$http','$location', function ($http,$scope,$location) {
    this.uploadFileToUrl = function(file,uploadUrl,username,email,password){
       var fd = new FormData();
       fd.append('file', file);
       fd.append('username',username);
       fd.append('email',email);
       fd.append('password',password);
       
       
    console.log("fd:"+fd)
       $http.post(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
       })
    
       .success(function(){
    	   $scope.message="registered! you can login now!!";
    	    $scope.email="";
    	    $scope.password="";
    	   
       })
    
       .error(function(){
       });
    }
 }]);
tasknote.controller('registerController', ['$scope', 'fileUpload', function($scope,fileUpload){
    $scope.register = function(){
       var file = $scope.myFile;
       var username=$scope.username;
       var email=$scope.email;
       var password=$scope.password;
       
       
       console.log("username",username);
       console.log('file is ' );
       console.dir(file);
       var uploadUrl = "http://localhost:8083/TaskNote/fileUpload";
      fileUpload.uploadFileToUrl(file,uploadUrl,username,email,password);
     $scope.message="You are sucessfully registered!!!!";
    };
 }]);

tasknote.controller("loginController",function($http,$scope,$rootScope,$location,$cookieStore)
{
	console.log("in login controller");
	$scope.login=function()
	{
		var log={
			username:$scope.username,
			password:$scope.password
			
	} 
	$http.post("http://localhost:8083/TaskNote/authenticate",log).then(function(response)
			{
		console.log("result data:"+response.data);
	 var r=response.data.toString();
	 console.log("response:"+r);
     
		if(r==1)
			{
			
			$rootScope.register=false;
			$rootScope.home=false;
			$rootScope.login=false;
			$rootScope.logout=true;
			$rootScope.mytasks=true
			$rootScope.completedtasks=true;
			$rootScope.uname=$scope.username;
			
			console.log("uname:"+$rootScope.uname);
			$http.defaults.headers.common['Authorization'] = 'Basic '
				+ $rootScope.uname;
		$cookieStore
				.put(
						'uname',
						$rootScope.uname);
		
			$location.path('/userHome');
			}
		if(r==0)
			{
			$scope.username="";
			$scope.password="";
			$scope.message="emailid/password incorrect";
			$location.path('/login');
			}
			})
	}
});
tasknote.controller("userHomeController",function($scope,$http,$rootScope)	
		{	
	console.log("in userHome controller");
	
	
		});
tasknote.controller("mytasksController",function($scope,$http,$rootScope)	
		{	
	
	$rootScope.register=false;
	$rootScope.home=false;
	$rootScope.login=false;
	$rootScope.logout=true;
	
	console.log(" in task controller");
	console.log("email in mytasks:"+$rootScope.uname);
	$http.get("http://localhost:8083/TaskNote/viewMyTasks/"+$rootScope.uname)
			    .then(function (response) {
			    	
			    	$scope.tasks = response.data;
			    	
			    	console.log("data:"+response.data);
			    });
			 $scope.newTask={};
				console.log("In Controller");
				$scope.addTask=function(newTask)
				{
					var dataObj = {
							taskname:$scope.taskname,
							description:$scope.description,
							deadline:$scope.deadline,
							postedby:$rootScope.uname,
							
			 		};
					console.log("title:"+dataObj);
					 var res = $http.post('http://localhost:8083/TaskNote/registerTask',dataObj);
					 $http.get("http://localhost:8083/TaskNote/viewMyTasks/"+$rootScope.uname)
				 	    .then(function (response) {$scope.tasks = response.data;});
				 		res.success(function(data, status, headers, config) {
				 			$scope.message = data;
				 			console.log("status:"+status);
				 		});
				 		 
				};
$scope.editTask=function(task)
{
	console.log("inside edittask");
	console.log("task:"+task);
	$scope.taskedit=task;
}
$scope.saveEdit=function()
{
	console.log("in saveEdit");
	console.log("postedby:"+$scope.taskedit.postedby);
	console.log("postedbyin rootscope:"+$rootScope.uname);
	var edit=
		{
			taskid:$scope.taskedit.taskid,
			taskname:$scope.taskedit.taskname,
			description:$scope.taskedit.description,
			deadline:$scope.taskedit.deadline,
			postedby:$rootScope.uname,
			
		}
	$http.put("http://localhost:8083/TaskNote/updateTask",edit);
	$http.get("http://localhost:8083/TaskNote/viewMyTasks/"+$rootScope.uname)
	    .then(function (response) {
	    	
	    	$scope.tasks = response.data;
	    	
	    	console.log("data:"+response.data);
	    });
}
$scope.deleteTask=function(taskedit)
{
	console.log("inside deletetask");
	var del=
		{
	taskid:$scope.taskedit.taskid
		}
$http.post("http://localhost:8083/TaskNote/deleteTask",del);
	$http.get("http://localhost:8083/TaskNote/viewMyTasks/"+$rootScope.uname)
	    .then(function (response) {
	    	
	    	$scope.tasks = response.data;
	    	
	    	console.log("data:"+response.data);
	    });
}
$scope.finishtask=function(task)
{
	console.log("inside finishtask");
	
	$scope.taskdone=task;
	
}
$scope.finishedTask=function()
{
	console.log("postedby:"+$scope.taskdone.postedby);
	console.log("in finishedtask");
	var edit=
		{
			taskid:$scope.taskdone.taskid,
			taskname:$scope.taskdone.taskname,
			deadline:$scope.taskdone.deadline,
			description:$scope.taskdone.description,
			postedby:$scope.taskdone.postedby,
			status:true
		}
	
	$http.put("http://localhost:8083/TaskNote/updateTask",edit);
	$http.get("http://localhost:8083/TaskNote/viewMyTasks/"+$rootScope.uname)
    .then(function (response) {
    	
    	$scope.tasks = response.data;
    	
    	console.log("data:"+response.data);
    });
	 $http.get("http://localhost:8083/TaskNote/viewCompletedTasks/"+$rootScope.uname)
	 .then(function (response) {
	 	
	 	$scope.ftasks = response.data;
	 	
	 	console.log("data:"+response.data);
	 });
}
$http.get("http://localhost:8083/TaskNote/viewCompletedTasks/"+$rootScope.uname)
.then(function (response) {
	
	$scope.ftasks = response.data;
	
	console.log("data:"+response.data);
});
		});	

	tasknote.controller('logoutController',function($scope,$rootScope)		
			{
				console.log("logout controller called");
				$rootScope.login=true;
				$rootScope.register=true;
				$rootScope.home=true;
				$rootScope.logout=false;
				$rootScope.completedtasks=false;
				$rootScope.mytasks=false;
				
			}
			);
	
	tasknote.controller('cookiecontroller',function($scope,$rootScope,$cookieStore)		
			{
				console.log("cookie controller called");
				 $rootScope.uname = $cookieStore.get('uname') || {};
			     if ($rootScope.uname) {
			         $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.uname; 
			     }
				
			}
			);
	