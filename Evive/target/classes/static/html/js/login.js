angular.module('MainApp',['ui.bootstrap','facebook', 'googleplus'])
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
            var encryptedPasswordArray=CryptoJS.MD5($scope.registerPassword);
            var encryptedPassword='';
            console.log(encryptedPasswordArray);
            for(var i=0;i<encryptedPasswordArray.words.length;i++)
            {
                encryptedPassword=encryptedPassword+encryptedPasswordArray.words[i];
            }
            $scope.loginData={emailId:$scope.loginemail,
                                password:encryptedPassword};
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

    }])
    .config(['FacebookProvider', function (FacebookProvider) {
        var myAppId = '1405708953057663';
        FacebookProvider.init(myAppId);
    }])
    .config(['GooglePlusProvider', function (GooglePlusProvider) {
        GooglePlusProvider.init({
            clientId: '276819652133-3okqlh2svv88do901uej9l4di0h87560.apps.googleusercontent.com',
            apiKey: 'RROTap1XN1sH4hzMHYxZiSfl',
            scopes: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']
        });
    }])
    .controller('FacebookController', [
        '$scope', '$http',
        '$timeout',
        'Facebook',
        function ($scope, $http, $timeout, Facebook) {
            $scope.user = {};
            $scope.logged = false;

            $scope.byebye = false;
            $scope.salutation = false;
            $scope.message = "";

            $scope.$watch(
                function () {
                    return Facebook.isReady();
                },
                function (newVal) {
                    if (newVal)
                        $scope.facebookReady = true;
                }
            );

            var userIsConnected = false;

            Facebook.getLoginStatus(function (response) {
                if (response.status == 'connected') {
                    userIsConnected = true;

                }
            });

            $scope.IntentLogin = function () {
                console.log("Hello");
                $scope.login();

            };


            $scope.login = function () {
                Facebook.login(function (response) {
                    if (response.status == 'connected') {
                        $scope.logged = true;
                        $scope.me();
                    }

                }, {scope: 'email'});
            };


            $scope.me = function () {
                Facebook.api('/me', function (response) {
                    /**
                     * Using $scope.$apply since this happens outside angular framework.
                     */
                    $scope.$apply(function () {
                        console.log(response);
                        social.social_id = response.id;
                        var firstname = response.first_name;
                        $scope.vendor_email = response.email;
                        $scope.vendor_user_name = response.first_name;
                        $scope.social_login = true;
                        $scope.user = {
                            "socialNetworkId": $scope.social_id,
                            "emailId": $scope.vendor_email,
                            "socialNetwork": "Facebook"};


                        console.log($scope.user);

                    });

                });
            };

            $scope.logout = function () {
                Facebook.logout(function () {
                    $scope.$apply(function () {
                        $scope.user = {};
                        $scope.logged = false;
                    });
                });
            }

            $scope.$on('Facebook:statusChange', function (ev, data, exp) {
                console.log('Status: ', data);

                if (data.status == 'connected') {
                    $scope.$apply(function () {
                        $scope.salutation = true;
                        console.log("User", $scope.user);
                        $scope.byebye = false;
                    });
                } else {
                    $scope.$apply(function () {
                        $scope.salutation = false;
                        $scope.byebye = true;

                        // Dismiss byebye message after two seconds
                        $timeout(function () {
                            $scope.byebye = false;
                        }, 2000)
                    });
                }


            });


        }
    ])
    .controller('GoogleController', ['$scope', 'GooglePlus',
        function ($scope, GooglePlus) {
            $scope.login = function () {
                GooglePlus.login().then(function (authResult) {


                    GooglePlus.getUser().then(function (user) {
                        console.log(user);
                        $scope.vendor_email = user.email;
                        $scope.vendor_user_name = user.given_name;
                        $scope.social_id = user.id;
                        $scope.social_login = true;
                        $scope.user = {
                            "socialNetworkId": $scope.social_id,
                            "emailId": $scope.vendor_email,
                            "socialNetwork": "Google"};





                    });
                }, function (err) {
                    console.log(err);
                });
            };

        }
    ]);

