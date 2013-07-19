// Sets the require.js configuration for your application.
require.config( {

      // 3rd party script alias names (Easier to type "jquery" than "libs/jquery-1.8.2.min")
      paths: {

            // Core Libraries
            "jquery": "libs/jquery",
            "jquerymobile": "libs/jquerymobile",
            "underscore": "libs/lodash",
            "backbone": "libs/backbone",
            "modernizr":"libs/modernizr"

      },

      // Sets the configuration for your third party scripts that are not AMD compatible
      shim: {

            "backbone": {
                  "deps": [ "underscore", "jquery" ],
                  "exports": "Backbone"  //attaches "Backbone" to the window object
            },
            "modernizr": {
                "exports": 'Modernizr'
            }

      } // end Shim Configuration

} );

// Includes File Dependencies
require([ "jquery", "backbone", "routers/mobileRouter","modernizr" ], function( $, Backbone, Mobile ) {

	$( document ).on( "mobileinit",
		// Set up the "mobileinit" handler before requiring jQuery Mobile's module
		function() {
			// Prevents all anchor click handling including the addition of active button state and alternate link bluring.
			$.mobile.linkBindingEnabled = false;

			// Disabling this will prevent jQuery Mobile from handling hash changes
			$.mobile.hashListeningEnabled = false;
			
			   // can cause calling object creation twice and back button issues are solved
			   $.mobile.ajaxEnabled = false;
			   // Otherwise after mobileinit, it tries to load a landing page
			   $.mobile.autoInitializePage = false;
			   // we want to handle caching and cleaning the DOM ourselves
			   $.mobile.page.prototype.options.domCache = false;

			// consider due to compatibility issues
			   // not supported by all browsers
			   $.mobile.pushStateEnabled = false;
			   // Solves phonegap issues with the back-button
			   $.mobile.phonegapNavigationEnabled = true;
			   //no native datepicker will conflict with the jQM component
			   $.mobile.page.prototype.options.degradeInputs.date = true;
		}
	);

	require( [ "jquerymobile" ], function() {
		if ( $.mobile.autoInitializePage == false){
            $.mobile.initializePage();
        }
		// Instantiates a new Backbone.js Mobile Router
		this.router = new Mobile();
	});
} );