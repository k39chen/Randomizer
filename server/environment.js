Meteor.startup(function(){
	console.log("Hello Randomizer!");
});

Meteor.publish("tags", function(){
	return Tags.find();
});

Meteor.methods({
	/**
	 * Adds a list of tags to the running list.
	 *
	 * @method addTags
	 * @param tags {Array} The array of tags to add.
	 */
	addTags: function(tags) {
		for (var i=0; i<tags.length; i++) {
			// see if we increment the counter on an existing tag
			// or to create a new tag with a fresh counter
			var tag = Tags.findOne({label: tags[i]});

			if (!tag) {
				// create a new one
				Tags.insert({
					label: tags[i],
					count: 0
				});
			} else {
				// increment its counter
				Tags.update({_id:tag._id}, {$inc: {count: 1}});
			}
		}
	},
	/**
	 * Get the list of tags.
	 *
	 * @method getTags
	 * @return {Array} The list of tags.
	 */
	getTags: function() {
		return Tags.find().fetch();
	}
});
