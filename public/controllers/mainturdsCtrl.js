angular.module('Turder').controller('mainturdsCtrl', function($scope, mainturdsService, $http) {
   
                $scope.single = function(image) {
                    var formData = new FormData();
                    formData.append('image', image, image.name);

                    $http.post('upload', formData, {
                        headers: { 'Content-Type': false },
                        transformRequest: angular.identity
                    }).success(function(result) {
                        $scope.uploadedImgSrc = result.src;
                        $scope.sizeInBytes = result.size;
                    });
                };
            
});