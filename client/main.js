import { Template } from 'meteor/templating';

import './main.html';

  Resolutions = new Mongo.Collection('resolutions');

  Template.body.helpers
	({
		resolutions: function()
		{
			return Resolutions.find();
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
		}
	});