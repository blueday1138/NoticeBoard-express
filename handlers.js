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
	res.cookie('email', req.body.email);
	res.redirect('/home');
};
var isUserValid = function(email,password){
	return users[email] && users[email].password == password;
};

handlers.addNotice = function(req,res){
	console.log(req.body);
}
handlers.login = function(req, res){
	res.render('login', { title: 'Login' });
};
handlers.home = function(req, res){
	res.render('home', { title: 'Home' ,notices: notices});
};
handlers.createNotice = function(req, res){
	res.render('createNotice', { title: 'CreateNotice' });
};
handlers.addNotice = function(req, res){
	console.log("query",req.body);
	var query = req.body;
	var noticeNumber = Object.keys(notices).length+1;
	notices[noticeNumber]={};
	notices[noticeNumber]["notice"] = query.notice;
	res.render('home', { title: 'Home' ,notices: notices});
};
handlers.authentication = function(req, res){
	var email = req.body.email;
	var password = req.body.password;
	(isUserValid(email,password))?rememberUser(req,res):res.redirect('/login');
};