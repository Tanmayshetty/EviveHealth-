/**
 * Created by tanmay on 20/2/15.
 */
angular.module('dashboard',[])
.directive('verticalmenu',function(){
        var directive={};
        directive.restrict='E';
        directive.templateUrl="/html/verticalmenubar.html";
        return directive;
    })
    .controller('dashboardCtrl',['$scope',function($scope)
    {
        $scope.displaystr='none';
        $scope.columns=[{column:"Home",subcolumn:[]},
            {column:"Our Plans",subcolumn:["Report","Health Analysis","Expenditure"]},
            {column:"Home",subcolumn:[]}
        ,{column:"Home",subcolumn:[]}];
        $scope.parentClick=function(){

        }
    }]);