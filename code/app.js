var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const port = 8080;

//Router
var indexRouter = require('./routes/index'); 
var day1Router = require('./routes/day1'); // day1 라우터
var day2Router = require('./routes/day2'); // day2 라우터
var day3Router = require('./routes/day3'); // day3 라우터

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // static 파일 저장해 놓는 폴더 -> Client 가 사용하는

app.use('/', indexRouter);
app.use('/day1', day1Router);
app.use('/day2', day2Router);
app.use('/day3', day3Router);

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

app.listen(port, () => {
  console.log(`SERVER RUNNING of port http://localhost:${port}`);
});

module.exports = app;
