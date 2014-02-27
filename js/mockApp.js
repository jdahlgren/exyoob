var app = angular.module('mockApp', []);

var rootFolder = new Folder('Root', 'Folder');
var defaultFileIcon = 'img/file.png';
var defaultFolderIcon = 'img/folder.png';

app.controller('FirstController', function($scope){		
	
	rootFolder.img = defaultFolderIcon;
	
	$scope.currentFolder = rootFolder;
	$scope.nrOfFolders = 0;
	$scope.cols = true;
	$scope.nrOfCols = 3;
	$scope.colStyle = "col span_1_of_"+$scope.nrOfCols;
	$scope.dir = rootFolder.name;
	$scope.editing = false;
	$scope.mode = "Edit Mode";
	$scope.notAdded=true;
	$scope.underMenu0 = false;
	$scope.underMenu = false;
	$scope.underMenu2 = false;
	$scope.underMenu3 = false;
	$scope.underMenu4 = false;
	$scope.underMenu5 = false;
	$scope.viewsAllowed = "Grid & List";
	$scope.allAllowed = true;
	$scope.gridMode = true;	
	$scope.showThumb = false;
	$scope.folderIcon = defaultFolderIcon;
	$scope.fileIcon = defaultFileIcon;
	$scope.bgImage = {'background-image':'url(img/bg.jpg)'};
	$scope.fontSize = 12;
	$scope.fontText = "Verdana";
	$scope.fontColor = "black";
	$scope.font = {'font-size':$scope.fontSize+'pt','font-family':$scope.fontText,'color':$scope.fontColor};
	
	
	$scope.enter = function(folder){
		$scope.currentFolder = folder;
		$scope.nrOfFolders = $scope.getNrOfFolders(folder);
		$scope.dir += ' -> ' + folder.name;
		showThumbnail();
		
	}
	$scope.goBack = function(){
		if($scope.currentFolder.Parent !== null){
			$scope.currentFolder = $scope.currentFolder.Parent;
			$scope.nrOfFolders = $scope.getNrOfFolders($scope.currentFolder);
			$scope.dir = $scope.getFolderPath($scope.currentFolder);
			showThumbnail()
		}
	}
	$scope.editMode = function(){
		$scope.editing = !$scope.editing;
		if($scope.editing){
			$scope.mode = "View Mode";
		}
		else{
			$scope.mode = "Edit Mode";
		}
	}
	$scope.add = function() {
		$scope.notAdded = false; 
		$scope.editing = true;
	}
	$scope.viewMenu = function(){
		$scope.underMenu0 = true;
	}
	$scope.applyViews = function(){
		$scope.underMenu0 = false;
		if($scope.viewsAllowed === 'Grid & List')
		{
			$scope.allAllowed = true;
		}
		else if($scope.viewsAllowed === 'Grid')
		{
			$scope.allAllowed = false;
			if(!$scope.gridMode)
			{
				$scope.changeView();
			}
		}
		else if($scope.viewsAllowed === 'List')
		{
			$scope.allAllowed = false;
			if($scope.gridMode)
			{
				$scope.changeView();
			}
		}		
	}
	$scope.changeView = function(){
		$scope.gridMode = !$scope.gridMode;
	}
	$scope.bgMenu = function(){
		$scope.underMenu = true;
	}	
	$scope.fontMenu = function(){
		$scope.underMenu3 = true;
	}	
	$scope.fontColorMenu = function(){
		$scope.underMenu4 = true;
	}
	$scope.applyFont = function(){
		$scope.underMenu3 = false;
		$scope.font = {
			'font-size':$scope.fontSize+'pt',
			'font-family':$scope.fontText,
			'color':$scope.fontColor
		};
	}
	$scope.applyFontColor = function(){
		$scope.underMenu4 = false;
		$scope.font = {
			'font-size':$scope.fontSize+'pt',
			'font-family':$scope.fontText,
			'color':$scope.fontColor
		};
	}	
	$scope.folderIconMenu = function(){
		$scope.underMenu2 = true;
	}
	$scope.changeFolderIcon = function(i){
		$scope.underMenu2 = false;
		if(i === 1)
		{
			$scope.folderIcon = 'img/folder.png';
		}
		else if(i === 2)
		{
			$scope.folderIcon = 'img/picFolder.png';
		}
		else if(i === 3)
		{
			$scope.folderIcon = 'img/musicFolder.png';
		}
		var folders = $scope.getFolders($scope.currentFolder);
		for(var j = 0; j < folders.length; j++)
		{
			if(folders[j].checked)
			{
				folders[j].img = $scope.folderIcon;
			}		
		}
	}
	$scope.fileIconMenu = function(){
		$scope.underMenu5 = true;
	}
	$scope.changeFileIcon = function(i){
		$scope.underMenu5 = false;
		if(i === 1)
		{
			fileIcon = 'img/file.png';
		}
		else if(i === 2)
		{
			fileIcon = 'img/picFile.png';
		}
		else if(i === 3)
		{
			fileIcon = 'img/pdfFile.jpg';
		}
		var files = $scope.getFiles($scope.currentFolder);
		for(var j = 0; j < files.length; j++)
		{
			if(files[j].checked)
			{
				files[j].img = fileIcon;
			}
		}
	}
	$scope.deleteFolder = function(folder){
		$scope.currentFolder.remove(folder);
		$scope.nrOfFolders = $scope.getNrOfFolders($scope.currentFolder);
	}
	$scope.deleteFile = function(file){
		$scope.currentFolder.remove(file);
	}
	$scope.changeBg = function(i){
		$scope.underMenu=false;
		if(i === 1)
		{
			$scope.bgImage = {'background-image':'url(img/bg.jpg)'};
		}
		else if(i === 2)
		{
			$scope.bgImage = {'background-image':'url(img/sand.jpg)'};
		}
		else if(i === 3)
		{
			$scope.bgImage = {'background-image':'url(img/sunset.jpg)'};
		}
		else
		{
			$scope.bgImage = {'background-image':'url(img/sky.jpg)'};
		}
	}
	$scope.changeCol = function(i) {
		if(i<0){
			if($scope.nrOfCols > 1){				
				$scope.nrOfCols --;
				$scope.colStyle = "col span_1_of_"+$scope.nrOfCols;
			}
		}
		else{
			if($scope.nrOfCols < 12){
				$scope.nrOfCols++;
				$scope.colStyle = "col span_1_of_"+$scope.nrOfCols;
			}
		}
	}
	//addrow
	//minusrow
	$scope.addFolders = function(){
		var folder;
		if($scope.currentFolder.Parent === null){//rootfolder
			folder = new Folder("Folder"+($scope.nrOfFolders+1), 'Folder');
		}
		else{
			folder = new Folder($scope.currentFolder.name+"_"+($scope.nrOfFolders+1), 'Folder');
		}
		folder.img = $scope.folderIcon;
		$scope.currentFolder.add(folder);
		$scope.nrOfFolders = $scope.getNrOfFolders($scope.currentFolder);
	}
	//addDBFolder
	//minusFolder
	$scope.changeFontSize = function(i){
		if(i > 0){
			$scope.fontSize++;
			$scope.font = {'font-size':$scope.fontSize+'pt','font-family':$scope.fontText,'color':$scope.fontColor};
		}
		else{
			if($scope.fontSize > 1){
				$scope.fontSize--;
				$scope.font = {'font-size':$scope.fontSize+'pt','font-family':$scope.fontText,'color':$scope.fontColor};
			}
		}
	}
	$scope.clearName = function(index, node){
		if(node.type === 'Folder'){
			document.getElementById("folder-"+index).focus();
			node.name = '';
		}
		else{
			document.getElementById("file-"+index).focus();
			node.name = '';	
		}
	}
	$scope.showListPreview = function(f){
		// Only process image files.
		// if (!f.type.match('image.*')) {
			// continue;
		// }
		
		var image = document.createElement("img");
		//var id = "thumb-"+i;
		// image.classList.add("")
		var preview = document.getElementById("preview");
		image.file = f.data;
		preview.replaceChild(image,preview.childNodes[0]);
		//preview.appendChild(image)

		var reader = new FileReader()
		reader.onload = (function(aImg){
		  return function(e){
			aImg.src = e.target.result;
		  };
		}(image))
		var ret = reader.readAsDataURL(f.data);
		var canvas = document.createElement("canvas");
		ctx = canvas.getContext("2d");
		image.onload= function(){
			ctx.drawImage(image,0,0);
		}
	}	
	$scope.getNrOfFolders = function(folder){
		var nr = 0;
		var folders = $scope.getFolders(folder);
		for(var i = 0; i < folders.length; i++){
			nr++;
		}
		return nr;
	}
	$scope.getNrOfParents = function(folder){
		var nr = 0;
		while(folder.Parent !== null){
			folder = folder.Parent;
			nr++;
		}
		return nr;	
	}
	$scope.getFolderPath = function(folder){
		var path = [];
		var ret = rootFolder.name;
		if(folder === rootFolder){
			return ret;
		}
		for(var i = 0; i < $scope.getNrOfParents(folder); i++){
			path.push(folder.name);
			folder = folder.Parent;
		}
		for(var i = path.length-1; 0 <= i; i--){
			ret += ' -> ' + path[i];
		}
		return ret;
	}
	$scope.getFolders = function(folder){
		var ret = [];
		for(var i = 0; i < folder.children.length; i++){
			if(folder.children[i].type === 'Folder'){
				ret.push(folder.children[i]);
			}
		}
		return ret;
	}
	$scope.getFiles = function(folder){
		var ret = [];
		for(var i = 0; i < folder.children.length; i++){
			if(folder.children[i].type !== 'Folder'){
				ret.push(folder.children[i]);
			}
		}
		return ret;
	}	
});
		

/*------------------------------------------------------------------
--------------------DRAG AND DROP-----------------------------------
--------------------------------------------------------------------*/
var fileDiv = document.getElementById("dnd");
fileDiv.addEventListener("dragenter", function (e) {
    e.stopPropagation();
    e.preventDefault();
}, false);

fileDiv.addEventListener("dragover", function (e) {
    e.stopPropagation();
    e.preventDefault();
}, false);

fileDiv.addEventListener("drop", function (e) {
    e.stopPropagation();
    e.preventDefault();

    var dt = e.dataTransfer;
    var files = dt.files;

	var scope = angular.element($("#ng")).scope();
    for (var i = 0, f; f = files[i]; i++) {
		var file = new File(f.name, f.type);
		file.img = scope.fileIcon;
		file.lastModifiedDate = f.lastModifiedDate;
		file.size = f.size;
		file.webkitRelativePath = f.webkitRelativePath;
		file.$$hashKey = f.$$hashKey;
		file.data = f;
		scope.$apply(function () {			
			scope.currentFolder.add(file);
		});
    }
    showThumbnail();
}, false);
/*------------------------------------------------------------------
--------------------ADD FILES FROM COMPUTER-------------------------
--------------------------------------------------------------------*/
document.getElementById('files').addEventListener('change', handleFileSelect, false);

function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object
	$('#addFiles').modal('hide');
	
	var scope = angular.element($("#ng")).scope();
	for (var i = 0, f; f = files[i]; i++) 
	{
		var file = new File(f.name, f.type);
		file.img = scope.fileIcon;
		file.lastModifiedDate = f.lastModifiedDate;
		file.size = f.size;
		file.webkitRelativePath = f.webkitRelativePath;
		file.$$hashKey = f.$$hashKey;
		file.data = f;
		scope.$apply(function () {			
			scope.currentFolder.add(file);
		});
	}	
	showThumbnail();
}

function showThumbnail(){
	var files = null;
	var scope = angular.element($("#ng")).scope();
	
	files = scope.getFiles(scope.currentFolder);
		
	for (var i = 0, f; f = files[i]; i++) 
	{		
		// Only process image files.
		if (!f.type.match('image.*')) {
			continue;
		}
		
		var image = document.createElement("img");
		var id = "thumb-"+i;
		var thumbnail = document.getElementById(id);
		if(thumbnail){
			image.file = f.data;
			thumbnail.appendChild(image)

			var reader = new FileReader()
			reader.onload = (function(aImg){
			  return function(e){
				aImg.src = e.target.result;
			  };
			}(image))
			var ret = reader.readAsDataURL(f.data);
			var canvas = document.createElement("canvas");
			ctx = canvas.getContext("2d");
			  image.onload= function(){
			  ctx.drawImage(image,0,0)
			}
		}
	}
}


var hej = function(){
	console.log(JSON.stringify(rootFolder, replacer));
}