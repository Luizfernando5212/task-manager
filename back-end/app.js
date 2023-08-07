require('dotenv').config();
let express = require('express');
let cookieParser = require('cookie-parser');
let cors = require('cors');
// let bodyParser = require('body-parser');
let path = require('path');

const conn = require('./connection/db');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();

const PORT = process.env.PORT || 3000

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Routers
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
conn().then(()=> {
  app.listen(PORT, () => {
      console.log('listening for requests')
  })
})


module.exports = app;