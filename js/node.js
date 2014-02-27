function Node(name, type){
	this.name = name;
	this.type = type;
	this.Parent = null;
	this.img = null;
	this.checked = false;
}



function Folder(name, type){
	Node.call(this, name, type);
	this.children = [];
};
Folder.prototype = new Node();
Folder.prototype.hasFolders = function(){
	console.log(this.folders.length);
}
Folder.prototype.add = function(node){
	if(node.Parent === this){
		return;//Already child of this folder
	}
	this.children.push(node);
	node.Parent = this;
}
Folder.prototype.remove = function(node){
	if(node.Parent !== this){
		return; //Not a child here
	}
	for(var i = 0; i< this.children.length; i++){
		if(this.children[i] === node){
			this.children.splice(i,1);
		}
	}
	node.Parent = null;
}



function File(name, type){
	Node.call(this, name, type);
	this.$$hashKey = null;
	this.lastModifiedDate = null;
	this.size = null;
	this.webkitRelativePath = null;	
};
File.prototype = new Node();
File.prototype.addTo = function(folder){
	folder.add(this);
}
File.prototype.removeFrom = function(folder){
	folder.remove(this);
}

var replacer = function(key, value)
{
  if (key=="Parent")
  {
      return undefined;
  }
  else return value;
}