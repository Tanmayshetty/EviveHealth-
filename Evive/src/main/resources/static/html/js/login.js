angular.module('MainApp',['ui.bootstrap'])
.controller('MainCtrl',['$scope',function($scope)
    {
        $scope.init=function(){
            $scope.formshow=true;
        }
        $scope.loginform= function () {
            $scope.formshow=true;
        }
        $scope.registerform= function () {
            $scope.formshow=false;
        }

    }]);

