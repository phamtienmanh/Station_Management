var models = require('../models');
var express = require('express');
var router = express.Router();

//get Stas list
router.get('/stas', function (req, res) {
    models.Sta.findAll().then(function (data) {
        res.status(200).send(data);
    }).catch(function (err) {
        res.status(400).send("Get Stas list fail");
    });
});
//get Stas details
router.get('/details/:id', function (req, res) {
    models.Sta.findAll({
        where: {
            id: req.params.id
        }
    }).then(function (data) {
        data.length == 1 ? res.status(200).send(data[0]) : res.status(200).send("Get Sta details fail");
    }).catch(function (err) {
        res.status(400).send("Get Sta details fail");
    });
});
//create new Sta
router.post('/create', function (req, res) {
    models.Sta.create({
        name: req.body.name
    }).then(function (data) {
        res.status(200).send(data.dataValues);
    }).catch(function (err) {
        res.status(400).send("Create Sta fail");
    });
});
//update a Sta
router.post('/update/:id', function (req, res) {
    models.Sta.update({
        name: req.body.name
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
//delete a Sta
router.post('/delete/:id', function (req, res) {
    models.Sta.destroy({
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