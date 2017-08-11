var module = angular.module('app.main');
module.controller('mainCtrl', [
    'cusServices',
    'matchServices',
    'staServices',
    '$scope',
    '$q',
    function (cusServices,
              matchServices,
              staServices,
              $scope,
              $q) {
        $scope.selectedDate = new Date();
        $scope.maxItemAllow = 5;
        $scope.newMatch = {
            cus1:{},cus2:{}
        };
        $scope.addMatch = function(sta){
          if(sta.matchs.length < $scope.maxItemAllow){
              sta.matchs.push({
                  cus1:{},cus2:{}
              });
          }
        };
        $scope.timesBegin = ['15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'];
        $scope.timesEnd = ['16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00'];

        $scope.chunk = function(arr, size) {
            var newArr = [];
            for (var i=0; i<arr.length; i+=size) {
                newArr.push(arr.slice(i, i+size));
            }
            return newArr;
        };


        $scope.load = function(){
            $scope.monthMoney1=0;
            $scope.monthMoney2=0;
            //get cusList
            cusServices.getList().then(function(resp){
                $scope.cusList = resp.data;
            });
            //get stasList, matchs
            staServices.getList().then(function (resp) {
                $scope.stasList = resp.data;
                $scope.chunkedData = $scope.chunk($scope.stasList, 2);
                _.forEach($scope.stasList, function (sta, key) {
                    matchServices.getListInDate(sta.id, moment($scope.selectedDate).startOf('day').add(7, 'hour')).then(function (resp) {
                        sta.matchs = resp.data;
                        _.forEach(sta.matchs, function (match, key) {
                            match.money1=match.money1 ? match.money1 : 0;
                            match.money2=match.money2 ? match.money2 : 0;
                            sta.money1=sta.money1 ? sta.money1+match.money1 : match.money1;
                            sta.money2=sta.money2 ? sta.money2+match.money2 : match.money2;
                            match.beginTime = match.beginTime != '01:00' ? match.beginTime.slice(11,16) : '';
                            match.endTime = match.endTime != '01:00' ? match.endTime.slice(11,16) : '';
                            var findCus1 = _.filter($scope.cusList, ['id', match.cusId1])[0];
                            var findCus2 = _.filter($scope.cusList, ['id', match.cusId2])[0];
                            match.cus1 = findCus1 ? angular.copy(findCus1) : {name:null,phone:null};
                            match.cus2 = findCus2 ? angular.copy(findCus2) : {name:null,phone:null};
                        });
                    });
                    matchServices.getListInMonth(sta.id, moment($scope.selectedDate).startOf('day')).then(function(resp){
                        sta.matchsInMonth = resp.data;
                        _.forEach(sta.matchsInMonth, function (match, key) {
                            sta.monthMoney1=sta.monthMoney1 ? sta.monthMoney1+match.money1 : match.money1;
                            sta.monthMoney2=sta.monthMoney2 ? sta.monthMoney2+match.money2 : match.money2;
                            $scope.monthMoney1 += match.money1;
                            $scope.monthMoney2 += match.money2;
                        })
                    });
                });
            });
        };
        $scope.load();

        $scope.saveProcess = function(){
            _.forEach($scope.stasList, function (sta, key) {
                if(key==$scope.stasList.length-1 && sta.matchs.length==0){
                    $scope.per = 100;
                    $('#saved').modal('hide');
                    $scope.load();
                }
                _.forEach(sta.matchs, function (value, key2) {
                    //value is a match
                    value.staId = sta.id;
                    value.selectedDate = $scope.selectedDate;
                    if(!value.cus1.name && !value.cus1.phone){
                        var findCus1 = {id: null}
                    }
                    else{
                        var findCus1 = _.filter($scope.cusList, {'name': value.cus1.name, 'phone': value.cus1.phone})[0];
                    }
                    if(!value.cus2.name && !value.cus2.phone){
                        var findCus2 = {id: null}
                    }
                    else{
                        var findCus2 = _.filter($scope.cusList, {'name': value.cus2.name, 'phone': value.cus2.phone})[0];
                    }
                    if(findCus1 && findCus2){
                        value.cus1 = findCus1;
                        value.cus2 = findCus2;
                        if (value.id) {//match exist=>update
                            matchServices.update(value.id, value).then(function(resp){
                                $scope.per = (key+1)/$scope.stasList.length*100 + (key2+1)/sta.matchs.length*10;
                                if(key==$scope.stasList.length-1 && key2==sta.matchs.length-1){
                                    $scope.per = 100;
                                    $('#saved').modal('hide');
                                    $scope.load();
                                }
                            });
                        }
                        else {
                            matchServices.addNew(value).then(function(resp){
                                $scope.per = (key+1)/$scope.stasList.length*100 + (key2+1)/sta.matchs.length*10;
                                if(key==$scope.stasList.length-1 && key2==sta.matchs.length-1){
                                    $scope.per = 100;
                                    $('#saved').modal('hide');
                                    $scope.load();
                                }
                            });
                        }
                    }
                    else if(!findCus1 && findCus2){
                        value.cus2 = findCus2;
                        cusServices.addNew({
                            name: value.cus1.name,
                            phone: value.cus1.phone
                        }).then(function (resp){
                            value.cus1 = resp.data;
                            if (value.id) {//match exist=>update
                                matchServices.update(value.id, value).then(function(resp){
                                    $scope.per = (key+1)/$scope.stasList.length*100 + (key2+1)/sta.matchs.length*10;
                                    if(key==$scope.stasList.length-1 && key2==sta.matchs.length-1){
                                        $scope.per = 100;
                                        $('#saved').modal('hide');
                                        $scope.load();
                                    }
                                });
                            }
                            else {
                                matchServices.addNew(value).then(function(resp){
                                    $scope.per = (key+1)/$scope.stasList.length*100 + (key2+1)/sta.matchs.length*10;
                                    if(key==$scope.stasList.length-1 && key2==sta.matchs.length-1){
                                        $scope.per = 100;
                                        $('#saved').modal('hide');
                                        $scope.load();
                                    }
                                });
                            }
                        });
                    }
                    else if(findCus1 && !findCus2){
                        value.cus1 = findCus1;
                        cusServices.addNew({
                            name: value.cus2.name,
                            phone: value.cus2.phone
                        }).then(function (resp){
                            value.cus2 = resp.data;
                            if (value.id) {//match exist=>update
                                matchServices.update(value.id, value).then(function(resp){
                                    $scope.per = (key+1)/$scope.stasList.length*100 + (key2+1)/sta.matchs.length*10;
                                    if(key==$scope.stasList.length-1 && key2==sta.matchs.length-1){
                                        $scope.per = 100;
                                        $('#saved').modal('hide');
                                        $scope.load();
                                    }
                                });
                            }
                            else {
                                matchServices.addNew(value).then(function(resp){
                                    $scope.per = (key+1)/$scope.stasList.length*100 + (key2+1)/sta.matchs.length*10;
                                    if(key==$scope.stasList.length-1 && key2==sta.matchs.length-1){
                                        $scope.per = 100;
                                        $('#saved').modal('hide');
                                        $scope.load();
                                    }
                                });
                            }
                        });
                    }
                    else{
                        cusServices.addNew({
                            name: value.cus1.name,
                            phone: value.cus1.phone
                        }).then(function (resp){
                            value.cus1 = resp.data;
                            cusServices.addNew({
                                name: value.cus2.name,
                                phone: value.cus2.phone
                            }).then(function (resp){
                                value.cus2 = resp.data;
                                if (value.id) {//match exist=>update
                                    matchServices.update(value.id, value).then(function(resp){
                                        $scope.per = (key+1)/$scope.stasList.length*100 + (key2+1)/sta.matchs.length*10;
                                        if(key==$scope.stasList.length-1 && key2==sta.matchs.length-1){
                                            $scope.per = 100;
                                            $('#saved').modal('hide');
                                            $scope.load();
                                        }
                                    });
                                }
                                else {
                                    matchServices.addNew(value).then(function(resp){
                                        $scope.per = (key+1)/$scope.stasList.length*100 + (key2+1)/sta.matchs.length*10;
                                        if(key==$scope.stasList.length-1 && key2==sta.matchs.length-1){
                                            $scope.per = 100;
                                            $('#saved').modal('hide');
                                            $scope.load();
                                        }
                                    });
                                }
                            });
                        });
                    }
                });
            });
        };
        $scope.save = function () {
            $scope.per = 0;
            $("#saved").modal();
            $scope.saveProcess();
        };

        $scope.onMoved = function (matchs, index, match){
            matchs.splice(index, 1);
            var movedMatch;
            _.forEach($scope.stasList, function (sta, key) {
                _.forEach(sta.matchs, function (val, key2) {
                    if(match.id && match.id==val.id){
                        movedMatch = val;
                        movedMatch.staId = sta.id;
                    }
                });
            });
            if(movedMatch){
                matchServices.update(movedMatch.id, movedMatch).then(function(resp){
                    $scope.load();
                });
            }
            else{
                matchServices.del(match.id).then(function(resp){
                    $scope.load();
                });
            }
        };
        
        $scope.updateUser = function(staId, match, model){
            //match.staId = staId;
            //matchServices.addNew(match);
            model.showDes = model.showDes ? false : true;
            if(!model.showDes && model.name && model.phone){
                var findCus = _.filter($scope.cusList, {'name': model.name, 'phone': model.phone})[0];
                if(findCus){
                    cusServices.update(findCus.id, model);
                }
                else{
                    cusServices.addNew(model).then(function(resp){
                        $scope.cusList.push(resp.data);
                    });
                }
            }
        }
    }
]);
