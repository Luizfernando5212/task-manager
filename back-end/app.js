require('dotenv').config();
let express = require('express');
let cookieParser = require('cookie-parser');
let cors = require('cors');
// let bodyParser = require('body-parser');
let path = require('path');

const conn = require('./connection/db');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let messagesRouter = require('./routes/message');
let commentsRouter = require('./routes/comment');
let companyRouter = require('./routes/company');
let departmentRouter = require('./routes/department');


let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
});
// let expressWs = require('express-ws')(app);

http.listen(8080, () => {
  console.log(`listening on *:8080`);
});

const PORT = process.env.PORT || 3000

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// passing socket to router
app.use((req, res, next) => {
  req.io = io;
  return next();
})

// Routers
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/message', messagesRouter);
app.use('/comment', commentsRouter);
app.use('/company', companyRouter);
app.use('/department', departmentRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
conn().then(()=> {
  app.listen(PORT, () => {
      console.log('listening for requests')
  })

  io.on('connection', (socket) =>{
    console.log('a user is connected')
    socket.emit('connection', null);
  })
})


// io.on('connection', (socket) => { // socket object may be used to send specific messages to the new connected client
//   console.log('new client connected');
//   socket.emit('connection', null);
//   socket.on('channel-join', id => {
//       console.log('channel join', id);
//       STATIC_CHANNELS.forEach(c => {
//           if (c.id === id) {
//               if (c.sockets.indexOf(socket.id) == (-1)) {
//                   c.sockets.push(socket.id);
//                   c.participants++;
//                   io.emit('channel', c);
//               }
//           } else {
//               let index = c.sockets.indexOf(socket.id);
//               if (index != (-1)) {
//                   c.sockets.splice(index, 1);
//                   c.participants--;
//                   io.emit('channel', c);
//               }
//           }
//       });

//       return id;
//   })
// });

module.exports = app;