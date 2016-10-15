import { Meteor } from 'meteor/meteor';


Resolutions = new Mongo.Collection('resolutions');
Meteor.startup(() => {
  // code to run on server at startup
	
});

// "name of collection"
Meteor.publish("resolutions", function() {
	return Resolutions.find({
		//mongo
		$or: [
			{ private: {$ne: true} },
			{ owner: this.userId }
		]
	});
});

Meteor.methods({
	addResolution: function(title) {
		Resolutions.insert ({
			title: title, 
			createAt: new Date(),
			owner: Meteor.userId()
		});		
	},
	updateResolution: function(id, checked) {
		var res = Resolutions.findOne(id);

		if(res.owner !== Meteor.userId()) {
			throw new Meteor.Error('not-authorized')
		}
				
		Resolutions.update(id, {$set: {checked: checked}});
	},
	deleteResolution: function(id) {
		var res = Resolutions.findOne(id);

		if(res.owner !== Meteor.userId()) {
			throw new Meteor.Error('not-authorized')
		}

		Resolutions.remove(id);
	},
	setPrivate: function(id, private) {
		var res = Resolutions.findOne(id);

		if(res.owner !== Meteor.userId()) {
			throw new Meteor.Error('not-authorized')
		}

		Resolutions.update(id, {$set: {private: private}});
	}
});