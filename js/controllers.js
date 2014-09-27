
app.controller('JoynerApp_DeviceController', ['$scope', 'dataService', 'azureDataService', 'nitrogenDataService',
    function ($scope, dataService, azureDataService, nitrogenDataService) {

        //define global scope variables
        $scope.sortField = 'name';
        $scope.ascending = true;
        $scope.currentColumn = 0;
        $scope.menu = "main";
        $scope.locationList = [];
        $scope.numLocations = 0;

        //function to intialize the connection
        $scope.initialize = function () {
            azureDataService.addSource('https://joyner.azure-mobile.net/', 'lDfAwKeKBLQFCckQNxkOSGaUiukSfe41', ['devices']);
            dataService.addSource(nitrogenDataService);
            nitrogenDataService.connect('test@nitrogen.io', 'DxTest12', function (err) {
                dataService.connect(function (results) {
                    if ($scope.devices) {
                        $scope.GetLocations();
                    }
                }, $scope, 3);
            });
        }

        $scope.Detail = function (device) {
            $scope.menu = "detail";
            $scope.currentEdit = device;
            $scope.currentDeviceID = device.id;
        }

        $scope.FilterLocation = function (network, index) {
            if ($scope.selectedNetwork == network || network == 'All') {
                $scope.selectedNetwork = '';
            }
            else {
                $scope.selectedNetwork = network;
            }
        }


        $scope.GetLocations = function () {
            var unique = {};
            $scope.locationList = [];
            $scope.locationList.push("All");
            for (var i = 0; i < $scope.devices.length; i++) {
                if (typeof unique[$scope.devices[i]["network"]] == "undefined") {
                    unique[$scope.devices[i]["network"]] = "";
                    $scope.locationList.push($scope.devices[i].network);
                    $scope.numLocations = $scope.locationList.length;
                }
            }
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
