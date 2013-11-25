var handlers={};
exports.handlers = handlers;
// var library = require('./library').lib;
var notices = {
	"1":{
		"timeStamp":"Tue Nov 19 2013 14:28:34 ",
		"name":"d!gv!j@y",
		"notice":"ndwle ef we!@#$"
	},
	"2":{
		"timeStamp":"Tue Nov 19 2013 14:28:34 ",
		"name":"d!gv!j@y Gunjal",
		"notice":"ndwle ef we!@#$"
	}
};
var users = {
	"dig@gmail.com":{
		"name":"Digvijay",
		"password":"digs"
	}
}


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


handlers.login = function(req, res){
	res.render('login', { title: 'Login' });
};
handlers.signout = function(req, res){
	res.clearCookie('email');
	res.redirect('/login');
};
handlers.home = function(req, res){
	redirectToLoginIfLoggedOut(req,res) ||
		res.render('home', { title: 'Home' ,notices: notices});
};
handlers.createNotice = function(req, res){
	redirectToLoginIfLoggedOut(req,res) ||
		res.render('createNotice', { title: 'CreateNotice' });
};
handlers.addNotice = function(req, res){
	var query = req.body;
	var noticeNumber = Object.keys(notices).length+1;
	var email = unescape(req.headers.cookie.split("=")[1]);
	notices[noticeNumber]={};
	notices[noticeNumber]["name"] = users[email].name;
	notices[noticeNumber]["notice"] = query.notice;
	res.render('home', { title: 'Home' ,notices: notices});
};
handlers.authentication = function(req, res){
	var email = unescape(req.body.email);
	var password = unescape(req.body.password);
	(isUserValid(email,password))?rememberUser(req,res):res.redirect('/login');
};