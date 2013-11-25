var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var handlers = require('./handlers.js').handlers;

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', handlers.login);
app.get('/login', handlers.login);
app.get('/createNotice', handlers.createNotice);
app.get('/home',handlers.home);
app.get('/signout',handlers.signout);

app.post('/authentication',handlers.authentication);
app.post('/addNotice',handlers.addNotice);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});