angular.module('MainApp',['ui.bootstrap'])
    .service('globals',['$location','$http',function($location,$http)
    {
        return({
           loginController:loginController,
            registerController:registerController
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
                    $location.url("/dashboard.html");
                })
        }
        function registerController(registerData){
            console.log("Registeration form ");
            $http({
                url:'/registerController',
                method:'POST',
                data:registerData,
                mimeType:'application/json',
                dataType:'json',
                contentType:'application/json'
            }).success(function(response)
            {
                if(response.status=="success")
                {
                    $location.url("/dashboard.html");
                }
            });

        }
    }])
.controller('MainCtrl',['$scope','globals',function($scope,globals)
    {
        $scope.loginData={};
        $scope.loginemail='';
        $scope.loginpassword='';
        $scope.registerData={};
        $scope.registerEmail='';
        $scope.gender='';
        $scope.registerPassword='';

        $scope.init=function(){
            $scope.formshow=true;
            $scope.loginsignup='active';
        }
        $scope.loginform= function () {
            $scope.formshow=true;
        }
        $scope.registerform= function () {
            $scope.formshow=false;
            $scope.loginsignup='notactive';
        }
        $scope.login=function(){
            $scope.loginData={email:$scope.loginemail,
                                password:CryptoJS.MD5($scope.loginpassword)};
            globals.loginController($scope.loginData);
        }
        $scope.register=function(){
            var encryptedPasswordArray=CryptoJS.MD5($scope.registerPassword);
            var encryptedPassword='';
            console.log(encryptedPasswordArray);
            for(var i=0;i<encryptedPasswordArray.words.length;i++)
            {
                encryptedPassword=encryptedPassword+encryptedPasswordArray.words[i];
            }
            console.log("Encrypted Password"+encryptedPassword);
            $scope.registerData={email:$scope.registerEmail,
                                password:encryptedPassword,
                                gender:$scope.gender};
            globals.registerController($scope.registerData);
        }

    }]);

