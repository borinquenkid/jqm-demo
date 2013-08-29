var WDROOT = '../node_modules/selenium-webdriver';



var assert = require(WDROOT + '/testing/assert'), 
	test = require(WDROOT+ '/testing'), 
	By = require(WDROOT).By,
	fs = require('fs'),
	webdriver = require(WDROOT), 
    remote = require(WDROOT + '/remote'),
    capabilities = webdriver.Capabilities;

var waitFor = function (driver, locator, timeout) {
    timeout = timeout || 5000;
    var deferred = webdriver.promise.defer();
    driver.wait(function () {
        return driver.isElementPresent(locator);
    }, timeout).then(function () {
        return driver.wait(function () {
            return driver.findElement(locator).isDisplayed();
        });
    }).then(deferred.fulfill);
    return deferred;
};









	test.describe('JQM Demo', function() {
		  var driver;

		  test.before(function() {
				 driver = new webdriver.Builder().
				 withCapabilities(webdriver.Capabilities.iphone()).
		         usingServer('http://localhost:5555/wd/hub').
		         build();
				 driver.get('http://192.168.1.132:9001/backbone-require.html');
			     driver.wait(function () {
			         return driver.executeScript("return !(typeof jQuery == 'undefined') && !($.mobile === undefined) ;");
			     }, 5000);

		  });
		  
		 


	      test.it('should find title', function () {
	          driver.getTitle().then(function (title) {
	              return assert("Categories").equalTo(title);
	          });
	      });
		      test.it('find all the elements below the body',
		          function () {
		              driver.findElement(By.tagName('body')).findElements(By.xpath('.//*')).then(function (elements) {
		                  elements.forEach(function (element, index) {
		                      element.getTagName().then(function (name) {
//		                          console.log("index" + index + ":" + name);
		                      });
		                  });
		              });
		          });
		      test.it('find element being visible', function () {
		          waitFor(driver, By.id('categories')).then(function () {
//		              console.log("The element is visible: ");
		          });
		      });


		  test.after(function() { driver.quit(); });
		});
//});


