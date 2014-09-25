var app = angular.module('JoynerApp', ['DataModule', 'AzureDataModule', 'NitrogenDataModule']);
app.controller('JoynerApp_DeviceController', ['$scope', 'dataService', 'azureDataService', 'nitrogenDataService',
    function ($scope, dataService, azureDataService, nitrogenDataService) {

        //define global scope variables
        $scope.sortField = 'name';
        $scope.ascending = true;
        $scope.currentColumn = 0;
        $scope.menu = "main";

        //function to intialize the connection
        $scope.initialize = function () {
            azureDataService.addSource('https://joyner.azure-mobile.net/', 'lDfAwKeKBLQFCckQNxkOSGaUiukSfe41', ['devices']);
            // dataService.addSource(azureDataService);
            dataService.addSource(nitrogenDataService);
            nitrogenDataService.connect('test@nitrogen.io', 'DxTest12', function (err) {
                dataService.connect(function (results) { }, $scope, 3);
            });
        }

        $scope.Detail = function (device) {
            $scope.menu = "detail";
            $scope.currentEdit = device;
            $scope.currentDeviceID = device.id;
        }

        $scope.FilterLocation = function (network) {
            $scope.selectedNetwork = network;
            console.log("filtering locations");
        }

        $scope.watchbuttons = function () {
            $scope.$watch('sortField', function () {
                $scope.ascending = true;
            });

            $scope.$watch(function () {
                return $scope.sortField + $scope.ascending;
            }, function () {
                if ($scope.ascending) {
                    $scope.directionalSort = '+' + $scope.sortField;
                } else {
                    $scope.directionalSort = '-' + $scope.sortField;
                }

            })
        }

        $scope.initialize();
        $scope.watchbuttons();
    }
]);