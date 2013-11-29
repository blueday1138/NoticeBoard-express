var lib = require('./library').lib;
var users = lib.users;
var record = lib.notices;

var rememberUser = function(req,res){
	res.cookie('email', unescape(req.body.email));
	res.redirect('/home');
};
var isUserValid = function(email,password){
	return users[email] && users[email].password == password;
};
var redirectToLoginIfLoggedOut = function(req,res){
	if(!req.headers.cookie)
		res.redirect('/login');
};

var handlers={};
exports.handlers = handlers;

handlers.login = function(req, res){
	res.render('login', { title: 'Login' });
};
handlers.signout = function(req, res){
	res.clearCookie('email');
	res.redirect('/login');
};
handlers.home = function(req, res){
	redirectToLoginIfLoggedOut(req,res) ||
		res.render('home', { title: 'Home' ,notices: record});
};
handlers.createNotice = function(req, res){
	redirectToLoginIfLoggedOut(req,res) ||
		res.render('createNotice', { title: 'CreateNotice' });
};
handlers.addNotice = function(req, res){
	var query = req.body;
	var noticeNumber = Object.keys(record).length+1;
	var email = unescape(req.headers.cookie.split("=")[1]);
	record[noticeNumber]={};
	record[noticeNumber]["name"] = users[email].name;
	record[noticeNumber]["notice"] = query.notice;
	lib.fs.writeFile('./database/notices',JSON.stringify(record));
	res.redirect('/home');
};
handlers.authentication = function(req, res){
	var email = unescape(req.body.email);
	var password = unescape(req.body.password);
	(isUserValid(email,password))?rememberUser(req,res):res.redirect('/login');
};