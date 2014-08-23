Template.app.rendered = function() {

	// hide the buttons by default
	$(".button").hide();
	$("#result").hide();
	$("#spinner").show().css({opacity:0}).stop().animate({opacity:1},300);

	Meteor.call("getTags", function(err,data){
		var prioritizedData = data.sort(function(a,b){return a-b;});
		var availableTags = $.map(prioritizedData,function(item){
			return item.label;
		});

		$("#spinner").css({opacity:1}).stop().animate({opacity:0},300,function(){
			$(this).hide();

			// initialize the tag widget
		    $("#tags").tagit({
		    	placeholderText: "Start typing your option here!",
		    	availableTags: availableTags,
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
		});
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
		var tags = $("#tags").tagit("assignedTags");
		var winner = tags[rand(0,tags.length-1)];
		$("#result").show().css({opacity:0}).text(winner).stop().animate({opacity:1},300);

		// add all these options to the tags list
		Meteor.call("addTags",tags);
	},
	"click #clear-button": function(e) {
		var $el = $(e.target);
		$("#tags").tagit("removeAll");
		$("#result").css({opacity:1}).stop().animate({opacity:0},300,function(){$(this).hide();});
	}
});
