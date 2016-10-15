import { Template } from 'meteor/templating';

import './main.html';

  Resolutions = new Mongo.Collection('resolutions');

  Meteor.subscribe("resolutions");

  Template.body.helpers	({
		resolutions: function()	{
			if (Session.get('hideFinished')) {
				//$ne getting from mongoDB info about check stage
				return Resolutions.find({checked: {$ne: true}});
			} else {
				return Resolutions.find();
			}
		},

		hideFinished: function() {
			return Session.get('hideFinished');
		}
	});	

	Template.body.events ({
		'submit .new-resolutions': function(event)	{
			var title = event.target.title.value;
			
			//adding st to database
			/*Resolutions.insert ({
				title: title, 
				createAt: new Date()
			});	*/
			Meteor.call("addResolution", title)
			
			//clearing writebox
			event.target.title.value = "";
			
			//no re-frashing webpage
			event.preventDefault();
		},

		'change .hide-finished': function(event) {
			//creating new session variable, between '' theres a name, seckont is value that is set
			Session.set('hideFinished', event.target.checked);
		}
	});
	//object
	Template.resolution.events	({
		'click .toggle-checked': function() {												//doing opposide mark
			Meteor.call("updateResolution", this._id, !this.checked);
		},

		'click .delete': function()	{
			Meteor.call("deleteResolution",this._id);
		}
	});

	Accounts.ui.config({
		//logining by username, no email
		passwordSignupFields: "USERNAME_ONLY"
	});

