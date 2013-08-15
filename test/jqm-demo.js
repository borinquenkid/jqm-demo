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
var WDROOT = '../node_modules/selenium-webdriver';

var assert = require(WDROOT+'/testing/assert'),
    fs = require('fs');

var webdriver = require(WDROOT),
    By = require(WDROOT).By,
    test = require(WDROOT+'/lib/test'),
    remote = require(WDROOT+'/remote');
    test.suite(function(env) {

var waitFor = function(driver,locator,timeout) {
	  timeout = timeout || 5000;
	  var deferred = webdriver.promise.defer();
	  driver.wait(function() {
		  return driver.isElementPresent(locator);
	   }, timeout).then( function(){
		   return driver.wait(function() {
			   return driver.findElement(locator).isDisplayed();
		   });
	   }).then( deferred.fulfill);
	  return deferred;
};


			 
	var driver;
	beforeEach(function() { 
		driver = env.driver; 
		 driver.get('http://192.168.1.132:9001/backbone-require.html');
		 driver.wait(function() {
		    	return driver.executeScript("return !($.mobile === undefined) ;");
		 }, 5000);
		 
	});
	

	
	describe('JQM Demo', function() {
		
	  test.it('should find title', function() {
			driver.getTitle().then(function(title) {
			  return assert("Categories").equalTo(title);
    	    });
		  });
	  test.it('find all the elements below the body',
		      function() {
		    driver.findElement(By.tagName('body')).findElements(By.xpath('.//*')).then(function(elements){
		    	elements.forEach(function(element,index){
		    		element.getTagName().then(function(name){
		    			console.log("index"+ index + ":" + name);
		    		});
			    });
		    });
		  });
	  test.it('find element being visible', function() {
		   waitFor(driver,By.id('categories')).then(function() {
			   console.log("The element is visible: ");
		   });
	     });
	     
	});
	
	 
	

});


