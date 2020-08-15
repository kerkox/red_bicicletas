require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('./config/passport');
const session = require('express-session')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usuariosRouter = require('./routes/usuarios');
const tokenRouter = require('./routes/token');
const bicicletasRouter = require('./routes/bicicletas');
const bicicletasAPIRouter = require('./routes/api/bicicletas');
const usuariosAPIRouter = require('./routes/api/usuarios');
const authAPIRouter = require('./routes/api/auth');

const store = new session.MemoryStore

const app = express();

app.set('secretKey', 'jwt_pwd_!12233445');

app.use(session({
  cookie: {
    maxAge: 240 * 60 * 60 * 100
  },
  store: store,
  saveUninitialized: true,
  resave: true,
  secret: 'red_biciceasdadasd3424#@|~@#'
}))

const mongoDB = process.env.MONGO_URI || 'mongodb://localhost/red_bicicletas';
mongoose.connect(mongoDB, {
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));


// view engine setup
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.resolve(__dirname, './public')));

app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/token', tokenRouter);
app.use('/bicicletas', loggedIn, bicicletasRouter);
app.use('/api/auth', authAPIRouter);
app.use('/api/bicicletas', validarUsuario, bicicletasAPIRouter);
app.use('/api/usuarios', usuariosAPIRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.ENVIRONMENT === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    console.log('user sin loguearse');
    res.redirect('/login')
  }
}

function validarUsuario(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
    if (err) {
      res.json({
        status: "error",
        message: err.message,
        data: null
      });
    } else {
      req.body.userId = decoded.id
      console.log('jwt verifyt: ', decoded);
      next();
    }
  })
}


module.exports = app;