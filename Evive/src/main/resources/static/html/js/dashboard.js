angular.module('dashboard',['ui.bootstrap'])
.directive('verticalmenu',function(){
        var directive={};
        directive.restrict='E';
        directive.templateUrl="/html/verticalmenubar.html";
        return directive;
    })
    .controller('MenuCtrl',['$scope',function($scope)
    {
        $scope.displaystr=[];
        $scope.columns=[{columnname:"Home",subcolumn:[],image:"glyphicon glyphicon-home"},
            {columnname:"Our Plans",subcolumn:[{column:"Report",url:"Report"},{column:"Health Analysis",url:"HealthAnalysis"},{column:"Expenditure",url:"expenditure"}],image:"glyphicon glyphicon-list-alt"},
            {columnname:"Home",subcolumn:[],image:"glyphicon glyphicon-home"}
        ,{columnname:"Home",subcolumn:[],image:"glyphicon glyphicon-home"}];
        console.log($scope.columns);
        $scope.init=function(){
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

    }])
    .controller('dashboardCtrl',['$scope',function($scope)
    {
        $scope.appointments=["Morning","AfterNoon","Evening","Night"];
        $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    }]);
