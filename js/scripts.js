﻿$(function () {
    $("#resizable").resizable({
        maxHeight: 600,
        maxWidth: 748,
        minHeight: 100,
        minWidth: 140,
        alsoResize: '.contentpanel2',
        resize: function (event, ui) {
            updateHeight(ui.size.height);
            saveNewSize(ui.size.width, ui.size.height);
        }
    });
});

//Toggle button for showing folder names
$('input[name="showFolderName"]').bootstrapSwitch('state', true, true);

$('#showFolderName').on('switchChange', function (e, data) {
    var $element = $(data.el),
        value = data.value;
    var scope = angular.element($("#ng")).scope();
    scope.$apply(function () {
        scope.settings.showFont = !scope.settings.showFont;
    });
    setTimeout(togglePlaceHolders);
});

//Toggle button for showing thumbnails
$("[name='showThumb']").bootstrapSwitch();

$('#showThumb').on('switchChange', function (e, data) {
    var $element = $(data.el),
        value = data.value;
    var scope = angular.element($("#ng")).scope();
    scope.$apply(function () {
        scope.settings.showThumb = !scope.settings.showThumb;
        var curr = scope.settings.currentFolder;
        if (scope.settings.showThumb) {
			getThumbs(curr);
        }
    });
});




//Toggle button for horizontal or vertical scrolling
$("[name='scrollingBox']").bootstrapSwitch();

$('#scrollingBox').on('switchChange', function (e, data) {
    var $element = $(data.el),
      value = data.value;
    var scope = angular.element($("#ng")).scope();
    scope.$apply(function () {
        scope.settings.cols = !scope.settings.cols;
        changeScrollDir(scope.settings.cols);
    });
    setTimeout(togglePlaceHolders);
});

$.fn.draggable = function() {
	var offset = null;
	var start = function(e) {
	  var orig = e.originalEvent;
	  var pos = $(this).position();
	  offset = {
		x: orig.changedTouches[0].pageX - pos.left,
		y: orig.changedTouches[0].pageY - pos.top
	  };
	};
	var moveMe = function(e) {
	  e.preventDefault();
	  var orig = e.originalEvent;
	  $(this).css({
		top: orig.changedTouches[0].pageY - offset.y,
		left: orig.changedTouches[0].pageX - offset.x
	  });
	};
	this.bind("touchstart", start);
	this.bind("touchmove", moveMe);
};

$(".draggable").draggable();