
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
            // dataService.addSource(azureDataService);
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
                $scope.ShowActiveLocation(index, false);
            }
            else {
                $scope.selectedNetwork = network;
                $scope.ShowActiveLocation(index, true);
            }
        }

        $scope.ShowActiveLocation = function (index, active) {
            return;
            // go through all the filter items and set them to neutral
            for (var i = 0; i < $scope.numLocations; i++) {
                document.getElementById("loc" + i).style.backgroundColor = "";
            }
            if (active) {
                // show the active filter in some meaningful way - the current method chews - TBS make UI look good
                document.getElementById("loc" + index).style.backgroundColor = "#000000";
            }
        }

        $scope.GetLocations = function () {
            var unique = {};
            $scope.locationList = [];
            $scope.locationList.push("All");
            console.log("Device Table Length: " + $scope.devices.length);
            for (var i = 0; i < $scope.devices.length; i++) {
                if (typeof unique[$scope.devices[i]["network"]] == "undefined") {
                    unique[$scope.devices[i]["network"]] = "";
                    //$scope.locationList.push($scope.devices[i]);
                    $scope.locationList.push($scope.devices[i].network);
                    $scope.numLocations = $scope.locationList.length;
                    console.log("There are " + $scope.numLocations + " locations.")
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
