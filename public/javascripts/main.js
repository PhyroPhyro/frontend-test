var FrontEndApp = angular.module('FrontEndApp', []);

FrontEndApp.controller('mainController', function ($scope, $http) {
    $scope.content = null;
    $http.get('fazenda.json').then(function (data) {
        var results = data.data.data;
        $scope.content = [];
        var jq = $.noConflict();

        for (var i = 0; i < results.length; i++) {
            var positiveVotes = results[i].positive;
            if (typeof positiveVotes == "string")
                positiveVotes = parseInt(positiveVotes);
            else if (isNaN(positiveVotes))
                positiveVotes = 0;

            var negativeVotes = results[i].negative;
            if (typeof negativeVotes == "string")
                negativeVotes = parseInt(negativeVotes);
            else if (isNaN(negativeVotes))
                negativeVotes = 0;

            var totalVotes = positiveVotes + negativeVotes;
            var positivePerc = Math.round((positiveVotes / totalVotes) * 100);
            var negativePerc = Math.round((negativeVotes / totalVotes) * 100);
            console.log(results[i].name + " " + positivePerc);
            console.log(results[i].name + " " + negativePerc);
            results[i].positivePerc = isNaN(positivePerc) ? 0 : positivePerc;
            results[i].negativePerc = isNaN(negativePerc) ? 0 : negativePerc;
            results[i].positiveVotes = positiveVotes;
            results[i].negativeVotes = negativeVotes;

            $scope.content.push(results[i]);
        }
        $scope.content.sort(function (b, a) { return a.positivePerc - b.positivePerc })
        console.log($scope.content);

        function compare(a, b) {
            if (a.negativeVotes < b.negativeVotes)
                return -1;
            if (a.negativeVotes > b.negativeVotes)
                return 1;
            return 0;
        }

        $scope.changeColor = function (index, bool) {
            if (bool) {
                angular.element('#item-' + index).addClass("active");
                angular.element('#item-' + index).removeClass("inactive");

                angular.element('#circle-' + index).addClass("active");
                angular.element('#circle-' + index).removeClass("inactive");

                angular.element('#name-' + index).addClass("active");
                angular.element('#name-' + index).removeClass("inactive");

                angular.element('#desc-' + index).addClass("active");
                angular.element('#desc-' + index).removeClass("inactive");

                angular.element('#tooltip-' + index).addClass("active");
                angular.element('#tooltip-' + index).removeClass("inactive");
            } else {
                angular.element('#item-' + index).addClass("inactive");
                angular.element('#item-' + index).removeClass("active");

                angular.element('#circle-' + index).addClass("inactive");
                angular.element('#circle-' + index).removeClass("active");

                angular.element('#name-' + index).addClass("inactive");
                angular.element('#name-' + index).removeClass("active");

                angular.element('#desc-' + index).addClass("inactive");
                angular.element('#desc-' + index).removeClass("active");

                angular.element('#tooltip-' + index).addClass("inactive");
                angular.element('#tooltip-' + index).removeClass("active");
            }

        };
    });
});