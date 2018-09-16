
var express = require('express');
var router = express.Router();
var cors = require('cors')
var mongoose = require('mongoose');
var Usuarios = require('../models/Usuarios.js');
var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});
var fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});



/* GET ALL usuario */
router.get('/', cors(),function(req, res, next) {
  Usuarios.find(function (err, usuario) {
    if (err) return next(err);
    res.json(usuario);
  });
});

/* GET SINGLE Usuarios BY ID */
router.get('/identificacion/:identificacion', cors(),function(req, res, next) {
  Usuarios.findOne({ 'identificacion': req.params.identificacion }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


/* SAVE Usuarios */
router.post('/upload', cors(),upload.single('photo'),function(req, res, next) {
  console.log(req.imagen);
  console.log(req.body);

  //req.body.Imagen = 'public/images/uploads/'+ req.file.filename;
  Usuarios.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
  
});

/* UPDATE Usuarios */
router.put('/:id', function(req, res, next) {
  Usuarios.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Usuarios */
router.delete('/:id', function(req, res, next) {
    Usuarios.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});
  
module.exports = router;