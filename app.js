var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var promotionsRouter = require('./routes/promotions');
var categoriasRouter = require('./routes/categorias');
var usuariosRouter = require('./routes/usuarios');

var app = express();

app.use(cors())

//mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://cristian:4y8mQAkEWZkIVI1a@cluster0-shard-00-00-qxkfa.mongodb.net:27017,cluster0-shard-00-01-qxkfa.mongodb.net:27017,cluster0-shard-00-02-qxkfa.mongodb.net:27017/corescotia?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true')
  .then(() =>  console.log('connection Mongo succesful'))
  .catch((err) => console.error(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use('/uploads', express.static('uploads'));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // get information from html forms

// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS,PATCH, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT,PATCH, DELETE');
  next();
});

app.use('/', indexRouter);
app.use('/promotions', promotionsRouter);
app.use('/categorias', categoriasRouter);
app.use('/usuarios', usuariosRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
