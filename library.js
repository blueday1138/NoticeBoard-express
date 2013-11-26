var lib ={};
exports.lib = lib;
lib.fs = require('fs');
lib.notices = JSON.parse(lib.fs.existsSync("./database/notices") 
	&& lib.fs.readFileSync("./database/notices",'utf-8') 
	|| '{}');
lib.users = JSON.parse(lib.fs.existsSync("./database/users") 
	&& lib.fs.readFileSync("./database/users",'utf-8') 
	|| '{}');