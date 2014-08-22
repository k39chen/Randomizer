Template.app.rendered = function() {

	// hide the buttons by default
	$(".button").hide();

	// initialize the tag widget
    $("#tags").tagit({
    	placeholderText: "Start typing your option here!",
    	availableTags: ["app","something","somethin gelse"],
    	caseSensitive: false,
    	allowSpaces: true,
    	tabIndex: 0,
    	animate: false,
    	afterTagAdded: function() {
    		var buttons = $(".button");

    		// see if we should show the randomize button
    		if (buttons.is(":hidden")) {
    			buttons.show().css({opacity:0}).stop().animate({opacity:1},300);
    		}
    	},
    	afterTagRemoved: function(e) {
    		var $tagit = $(e.target),
    			buttons = $(".button");
    		if ($tagit.tagit("assignedTags").length === 0) {
    			buttons.css({opacity:1}).stop().animate({opacity:0},300,function(){$(this).hide();});
    		}
    	}
    });
};
Template.app.events({
	"mouseover .button": function(e) {
		var $el = $(e.target);
		$el.addClass("hover");
	},
	"mouseout .button": function(e) {
		var $el = $(e.target);
		$el.removeClass("hover");
	},
	"click #randomize-button": function(e) {
		var $el = $(e.target);
		// ...
	},
	"click #clear-button": function(e) {
		var $el = $(e.target);
		$("#tags").tagit("removeAll");
	}
});
