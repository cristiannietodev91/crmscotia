var express = require('express');
var router = express.Router();
var cors = require('cors')
var mongoose = require('mongoose');
var Promotions = require('../models/Promotions.js');
var randomstring = require("randomstring");



/* GET ALL PromotionsS */
router.get('/', cors(),function(req, res, next) {
  Promotions.find(function (err, Promotionss) {
    if (err) return next(err);
    res.json(Promotionss);
  });
});

/* GET SINGLE Promotions BY ID */
router.get('/:id', cors(),function(req, res, next) {
  Promotions.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE Promotions */
router.post('/', cors(),function(req, res, next) {
  var codigoLetras = randomstring.generate({
    charset: "ABCDEFGHIJKLMNOPQRST",
    length: 4
  });
  var codigoNumeros = randomstring.generate({
      charset: "0123456789",
      length: 4
  });

  var concat=codigoLetras+codigoNumeros;
  req.body.promotionId = concat;
  Promotions.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE Promotions */
router.put('/:id', function(req, res, next) {
  Promotions.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Promotions */
router.delete('/:id', function(req, res, next) {
    Promotions.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});

/* GET SINGLE Usuarios BY ID */
router.get('/promotionId/:idpromocion', cors(),function(req, res, next) {
  Promotions.findOne({ 'promotionId': req.params.idpromocion }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
  
module.exports = router;