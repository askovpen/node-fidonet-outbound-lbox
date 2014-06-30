var fs=require('fs');
var path=require('path');
var util=require('util');
var async=require('async');

var LBOX= function(lboxPath){
	if (!(this instanceof LBOX)) return new LBOX(lboxPath);
	this.lboxPath=lboxPath;
	this.files={};
	var stat=fs.statSync(lboxPath);
	if (!stat.isDirectory()){throw lboxPath+' is not Directory';}
};
LBOX.prototype.read=function(callback){
	var self=this;
	fs.readdir(this.lboxPath, function(err, dirs){
		if (err) return callback(err);
		async.eachLimit(dirs, 1, function(dir, dirFinished){
			fs.stat(self.lboxPath+'/'+dir, function(err, stat){
				if (err) return dirFinished(err);
				if (!stat.isDirectory) return dirFinished();
			
				var parts=dir.match(/(\d+)\.(\d+)\.(\d+)\.(\d+)/);
				if (parts===null) return dirFinished();
				var zone=parts[1];
				var net=parts[2];
				var node=parts[3];
				var point=parts[4];
				fs.readdir(self.lboxPath+'/'+dir, function(err, files){
					if (err) return dirFinished(err);
					async.eachLimit(files, 1, function(item, itemFinished){
						fs.stat(self.lboxPath+'/'+dir+'/'+item, function(err, stat){
							if (!stat.isFile()) return itemFinished();
							var filename=self.lboxPath+'/'+dir+'/'+item;
							self.add(filename,zone+':'+net+'/'+node+'.'+point,null,'^','h');
							return itemFinished();
						});
					}, dirFinished);
				});
			});
		}, function(err){
			callback(null, 1);
		});
	});
};
LBOX.prototype.add=function(file,addr,bundle,kknd,prio){
	if (!(addr in this.files)) {
		this.files[addr]=[];
	}
	var stat=fs.statSync(file);
	this.files[addr].push({'file':file,'size':stat.size,'bundle':bundle,'kknd':kknd,'prio':prio,'type':'lbox'});
};
module.exports=LBOX;
