import { Meteor } from 'meteor/meteor';


Resolutions = new Mongo.Collection('resolutions');
Meteor.startup(() => {
  // code to run on server at startup
	
});

Meteor.methods({
	addResolution: function(title) {
		Resolutions.insert ({
			title: title, 
			createAt: new Date()
		});		
	},
	updateResolution: function(id, checked) {
		Resolutions.update(id, {$set: {checked: checked}});
	},
	deleteResolution: function(id) {
		Resolutions.remove(id);
	}
});