import { Template } from 'meteor/templating';

import './main.html';

  Resolutions = new Mongo.Collection('resolutions');

  Template.body.helpers
	({
		resolutions: function()
		{
			if (Session.get('hideFinished'))
			{
				//$ne getting from mongoDB info about check stage
				return Resolutions.find({checked: {$ne: true}});
			}
			else
			{
				return Resolutions.find();
			}
		},
		hideFinished: function()
		{
			return Session.get('hideFinished');
		}
	});	

	Template.body.events
	({
		'submit .new-resolutions': function(event)
		{
			var title = event.target.title.value;
			
			//adding st to database
			Resolutions.insert
			({
				title: title, 
				createAt: new Date()
			});			
			
			//clearing writebox
			event.target.title.value = "";
			
			//no re-frashing webpage
			event.preventDefault();
		},
		'change .hide-finished': function(event)
		{
			//creating new session variable, between '' theres a name, seckont is value that is set
			Session.set('hideFinished', event.target.checked);
		}
	});
	//object
	Template.resolution.events
	({
		'click .toggle-checked': function()
		{												//doing opposide mark
			Resolutions.update(this._id, {$set: {checked: !this.checked}});
		},
		'click .delete': function()
		{
			Resolutions.remove(this._id);
		}
	});