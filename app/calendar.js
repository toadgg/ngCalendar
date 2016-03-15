/**
 * Created by zhangxiaoliang on 16/3/11.
 */
angular.module('ngCalendar', [])
    .directive('calendar', function(){
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                plan: '=',
                currentDate:'=',
                click: '&onDateClick'
            },
            controller: ['$scope', function($scope){
                $scope.month = function(datetime) {
                    //本月第一天
                    var firstDateWeek = moment(datetime);
                    //本月一共几天
                    var daysInMonth = firstDateWeek.daysInMonth();
                    //本月第一天是周几
                    var firstDayWeek = firstDateWeek.format('d');
                    //时间轴(一维)
                    var timeline = [];
                    //时间日历
                    var calendar = [];

                    //时间轴算法
                    for (var i=0; i<firstDayWeek; i++) {
                        timeline.push(moment(firstDateWeek).subtract(firstDayWeek-i, 'days'));
                    }
                    for (var i=0; i<daysInMonth; i++) {
                        timeline.push(moment(firstDateWeek).add(i, 'days'));
                    }

                    //时间轴转日历
                    for (var i=0; i<Math.ceil(timeline.length/7); i++) {
                        calendar[i] = timeline.slice(i*7, (i+1)*7);
                    }
                    return calendar;
                };
                $scope.tip = function(plan) {
                    alert(plan.join('\n'));
                };

                $scope.toady = moment().format('YYYY-MM-DD');
                $scope.date = moment($scope.currentDate, 'YYYY-MM');
                $scope.calendar = $scope.month($scope.date);
                $scope.last = function() {
                    console.log($scope.month($scope.date.subtract(1, 'months')));
                    $scope.calendar = $scope.month($scope.date.subtract(1, 'months'));
                };
                $scope.next = function() {
                    $scope.calendar = $scope.month($scope.date.add(1, 'months'));
                }
            }],
            templateUrl: "calendar.html"
        }
    });
