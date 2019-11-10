const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const refreshRouter = require('./routes/refresh');
const fakultasjurusanRouter = require('./routes/fakultasjurusan');
const filterpenggunaRouter = require('./routes/filterpengguna');
const filterruanganRouter = require('./routes/filterruangan');
const logRouter = require('./routes/log');
const matkulRouter = require('./routes/matkul');
const penggunaRouter = require('./routes/pengguna');
const ruanganRouter = require('./routes/ruangan');
const cobaRouter = require('./routes/coba')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());

app.use(logger(':remote-addr - :remote-user [:date[web]] ":method :url" :status > :response-time ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/refresh', refreshRouter);
app.use('/fakultasjurusan', fakultasjurusanRouter);
app.use('/filterpengguna', filterpenggunaRouter);
app.use('/filterruangan', filterruanganRouter);
app.use('/log', logRouter);
app.use('/matkul', matkulRouter);
app.use('/pengguna', penggunaRouter);
app.use('/ruangan', ruanganRouter);
app.use('/coba', cobaRouter)

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
