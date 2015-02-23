angular.module('dashboard',[])
.directive('verticalmenu',function(){
        var directive={};
        directive.restrict='E';
        directive.templateUrl="/html/verticalmenubar.html";
        return directive;
    })
    .controller('dashboardCtrl',['$scope',function($scope)
    {
        $scope.displaystr=[];
        $scope.columns=[{columnname:"Home",subcolumn:[]},
            {columnname:"Our Plans",subcolumn:[{column:"Report",url:"Report"},{column:"Health Analysis",url:"HealthAnalysis"},{column:"Expenditure",url:"expenditure"}]},
            {columnname:"Home",subcolumn:[]}
        ,{columnname:"Home",subcolumn:[]}];
        console.log($scope.columns);
        $scope.init=function(c){
            var length=$scope.columns.length
            for(var i=0;i<length;i++)
            {
                $scope.displaystr[i]=false;
            }
        }
        $scope.parentClick=function(val){
            $scope.displaystr[val]=!$scope.displaystr[val];

        }
        $scope.clickMenu=function(submenu,menu){

        }
        $scope.displaymenu= function (val){
            if($scope.displaystr[val])
            {
                return true;
            }
            return false;
        }

    }]);
