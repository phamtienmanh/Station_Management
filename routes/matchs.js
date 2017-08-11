var models = require('../models');
var express = require('express');
var router = express.Router();

//get Matchs list by staId
router.get('/matchs/:staId', function (req, res) {
    models.Match.findAll({
        where: {
            staId: req.params.staId
        }
    }).then(function (data) {
        res.status(200).send(data);
    }).catch(function (err) {
        res.status(400).send("Get Matchs list fail");
    });
});
//get Matchs list by staId, date
router.post('/matchsindate', function (req, res) {
    models.Match.findAll({
        where: {
            staId: req.body.staId,
            beginTime: {
                $lt: (req.body.selectedDatePlus),
                $gt: (req.body.selectedDate)
            }
        },
        order: 'beginTime'
    }).then(function (data) {
        res.status(200).send(data);
    }).catch(function (err) {
        res.status(400).send("Get Matchs list fail");
    });
});
router.post('/matchsinmonth', function (req, res) {
    models.Match.findAll({
        where: {
            staId: req.body.staId,
            beginTime: {
                $lt: (req.body.endMonth),
                $gt: (req.body.beginMonth)
            }
        },
        order: 'beginTime'
    }).then(function (data) {
        res.status(200).send(data);
    }).catch(function (err) {
        res.status(400).send("Get Matchs list fail");
    });
});
//get Matchs details
router.get('/details/:id', function (req, res) {
    models.Match.findAll({
        where: {
            id: req.params.id
        }
    }).then(function (data) {
        data.length == 1 ? res.status(200).send(data[0]) : res.status(200).send("Get Match details fail");
    }).catch(function (err) {
        res.status(400).send("Get Match details fail");
    });
});
//create new Match
router.post('/create', function (req, res) {
    models.Match.create({
        staId: req.body.staId,
        cusId1: req.body.cus1.id,
        cusId2: req.body.cus2.id,
        beginTime: req.body.beginTime,
        endTime: req.body.endTime,
        money1: req.body.money1,
        money2: req.body.money2
    }).then(function (data) {
        if(req.body.cus1.id){
            models.Cus.update({
                matchs: req.body.cus1.matchs+1
            }, {
                where: {
                    id: req.body.cus1.id
                }
            });
        }
        if(req.body.cus2.id){
            models.Cus.update({
                matchs: req.body.cus2.matchs+1
            }, {
                where: {
                    id: req.body.cus2.id
                }
            });
        }
        res.status(200).send(data.dataValues);
    }).catch(function (err) {
        res.status(400).send("Create Match fail");
    });
});
//update a Match
router.post('/update/:id', function (req, res) {
    models.Match.update({
        staId: req.body.staId,
        cusId1: req.body.cus1.id,
        cusId2: req.body.cus2.id,
        beginTime: req.body.beginTime,
        endTime: req.body.endTime,
        money1: req.body.money1,
        money2: req.body.money2
    }, {
        where: {
            id: req.params.id
        }
    }).then(function (data) {
        res.status(200).send("Update success");
    }).catch(function (err) {
        res.status(400).send("Update fail");
    });
});
//delete a Match
router.post('/delete/:id', function (req, res) {
    models.Match.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (data) {
        res.status(200).send("Delete success");
    }).catch(function (err) {
        res.status(400).send("Delete fail");
    });
});

module.exports = router;