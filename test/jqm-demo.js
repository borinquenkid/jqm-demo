// Copyright 2013 Selenium committers
// Copyright 2013 Software Freedom Conservancy
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//     You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview An example test that may be run using Mocha. To run, you must
 * have the chromedriver installed on the system PATH.
 */

var assert = require('assert'),
    fs = require('fs');

var WDROOT = '../node_modules/selenium-webdriver';
var webdriver = require(WDROOT),
    By = require(WDROOT).By,
    test = require(WDROOT+'/lib/test'),
    remote = require(WDROOT+'/remote');
test.suite(function(env) {
	var browsers = env.browsers;
	
	var driver;
	beforeEach(function() { driver = env.driver; });
	
	describe('JQM Demo', function() {
	  test.it('should find title', function() {
		    driver.get('http://192.168.1.132:9001/backbone-require.html');
		    driver.wait(function() {
		    return driver.findElement(By.tagName('title')).then(function(title) {
		    	console.log(title);
		        return true;
		      });
		    }, 5000);
		  });

		});

});


