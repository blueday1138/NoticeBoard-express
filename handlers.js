var handlers={};
exports.handlers = handlers;
var lib = require('./library').lib;

var rememberUser = function(req,res){
	res.cookie('email', unescape(req.body.email));
	res.redirect('/home');
};
var isUserValid = function(email,password){
	return lib.users[email] && lib.users[email].password == password;
};
var redirectToLoginIfLoggedOut = function(req,res){
	if(!req.headers.cookie)
		res.redirect('/login');
};

handlers.login = function(req, res){
	res.render('login', { title: 'Login' });
};
handlers.signout = function(req, res){
	res.clearCookie('email');
	res.redirect('/login');
};
handlers.home = function(req, res){
	redirectToLoginIfLoggedOut(req,res) ||
		res.render('home', { title: 'Home' ,notices: lib.notices});
};
handlers.createNotice = function(req, res){
	redirectToLoginIfLoggedOut(req,res) ||
		res.render('createNotice', { title: 'CreateNotice' });
};
handlers.addNotice = function(req, res){
	var query = req.body;
	var noticeNumber = Object.keys(lib.notices).length+1;
	var email = unescape(req.headers.cookie.split("=")[1]);
	lib.notices[noticeNumber]={};
	lib.notices[noticeNumber]["name"] = lib.users[email].name;
	lib.notices[noticeNumber]["notice"] = query.notice;
	lib.fs.writeFile('./database/notices');
	res.redirect('/home');
};
handlers.authentication = function(req, res){
	var email = unescape(req.body.email);
	var password = unescape(req.body.password);
	(isUserValid(email,password))?rememberUser(req,res):res.redirect('/login');
};