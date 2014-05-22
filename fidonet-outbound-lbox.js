var fs=require('fs');
var path=require('path');
var util=require('util');

var LBOX= function(lboxPath){
	if (!(this instanceof LBOX)) return new LBOX(lboxPath);
	this.lboxPath=lboxPath;
	this.files={};
	var stat=fs.statSync(lboxPath);
	if (!stat.isDirectory()){throw lboxPath+' is not Directory';}
};
LBOX.prototype.read=function(callback){
	var self=this;
	fs.readdir(this.lboxPath, function(err,dirs){
		if (err) throw err;
		dirs.forEach(function(dir){
			var stat=fs.statSync(self.lboxPath+'/'+dir);
			if (!stat.isDirectory){return;}
			var parts=dir.match(/(\d+)\.(\d+)\.(\d+)\.(\d+)/);
			if (parts!==null) {
				var zone=parts[1];
				var net=parts[2];
				var node=parts[3];
				var point=parts[4];
				fs.readdirSync(self.lboxPath+'/'+dir).forEach(function(item){
					var stat=fs.statSync(self.lboxPath+'/'+dir+'/'+item);
					if (!stat.isFile()){return;}
					var filename=self.lboxPath+'/'+dir+'/'+item;
					self.add(filename,zone+':'+net+'/'+node+'.'+point,null,'^','h');
				});
			}
		});
		callback(null,1);
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
