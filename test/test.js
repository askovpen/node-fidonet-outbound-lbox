var LBOX = require('../');
var util = require('util');
var path = require('path');
var assert = require('assert');
describe('Fidonet Outbound Long FileBox', function(){
	var lbox=LBOX(path.join(__dirname,'/boxes'));
	it('read lbox', function(done){
		lbox.read(function(err){
			if (err) throw err;
			console.log(util.inspect(lbox.files,true,Infinity,true));
			assert.equal(Object.keys(lbox.files).length,2);
			done();
		});
	});
});