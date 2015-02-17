angular.module('MainApp',['ui.bootstrap'])
    .service('globals',['$location','$http',function($location,$http)
    {
        return({
           loginController:loginController
        });
        function loginController(loginData){
            console.log("Login");
            $http({
                url:'/loginController',
                method:'POST',
                data:loginData,
                mimeType:'application/json',
                dataType:'json',
                contentType:'application/json'
            }).success(function(response)
                {
                    if(response.data=="success")
                    $location.url("/dashboard.html")
                })
        }
    }])
.controller('MainCtrl',['$scope','globals',function($scope,globals)
    {
        $scope.init=function(){
            $scope.formshow=true;
            $scope.loginsignup='active';
        }
        $scope.loginform= function () {
            $scope.formshow=true;
            $scope.loginsignup='active';
        }
        $scope.registerform= function () {
            $scope.formshow=false;
            $scope.loginsignup='notactive';
        }
        $scope.login=function(){
            var loginData={};
            globals.loginController();
        }

    }]);

