var express = require('express');
var router = express.Router();
var cors = require('cors')
var mongoose = require('mongoose');
var Categoria = require('../models/Categoria.js');




/* GET ALL CategoriaS */
router.get('/', cors(),function(req, res, next) {
  Categoria.find(function (err, Categorias) {
    if (err) return next(err);
    res.json(Categorias);
  });
});

/* GET SINGLE Categoria BY ID */
router.get('/:id', cors(),function(req, res, next) {
  Categoria.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE Categoria */
router.post('/', cors(),function(req, res, next) {
  Categoria.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE Categoria */
router.put('/:id', function(req, res, next) {
  Categoria.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Categoria */
router.delete('/:id', function(req, res, next) {
    Categoria.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});
  
module.exports = router;