myApp.directive('fileUploadDirective', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link:function(scope, elm, attrs){
            elm.bind('change', function(){
                $parse(attrs.fileUploadDirective).assign(scope, elm[0].files)
                scope.$apply()
            })
        },
        controller: 'LessonPlanController'
    }
}]);