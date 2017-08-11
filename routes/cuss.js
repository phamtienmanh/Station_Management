var models = require('../models');
var express = require('express');
var router = express.Router();

//get Cuss list
router.get('/cuss', function (req, res) {
    models.Cus.findAll({
        order: 'matchs DESC'
    }).then(function (data) {
        res.status(200).send(data);
    }).catch(function (err) {
        res.status(400).send("Get Cuss list fail");
    });
});
//get Cuss details
router.get('/details/:id', function (req, res) {
    models.Cus.findAll({
        where: {
            id: req.params.id
        }
    }).then(function (data) {
        data.length == 1 ? res.status(200).send(data[0]) : res.status(200).send("Get Cus details fail");
    }).catch(function (err) {
        res.status(400).send("Get Cus details fail");
    });
});
//find Cus by name, phone
router.post('/findcus', function (req, res) {
    models.Cus.findAll({
        where: {
            name: req.body.name,
            phone: req.body.phone
        }
    }).then(function (data) {
        res.status(200).send(data[0]);
    }).catch(function (err) {
        res.status(400).send("Get Cus details fail");
    });
});
//create new Cus
router.post('/create', function (req, res) {
    models.Cus.create({
        name: req.body.name,
        phone: req.body.phone,
        matchs: 0,
        description: req.body.description
    }).then(function (data) {
        res.status(200).send(data.dataValues);
    }).catch(function (err) {
        res.status(400).send("Create Cus fail");
    });
});
//update a Cus
router.post('/update/:id', function (req, res) {
    models.Cus.update({
        description: req.body.description
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
//delete a Cus
router.post('/delete/:id', function (req, res) {
    models.Cus.destroy({
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