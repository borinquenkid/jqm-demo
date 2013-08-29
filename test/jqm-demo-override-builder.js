var WDROOT = '../node_modules/selenium-webdriver';



var assert = require(WDROOT + '/testing/assert'),
    test = require(WDROOT + '/testing'),
    By = require(WDROOT).By,
    fs = require('fs'),
    webdriver = require(WDROOT),
    remote = require(WDROOT + '/remote'),
    capabilities = webdriver.Capabilities;

var timeoutFunc = function (callback, timeout) {
    timeout = timeout || 5000;
    var d = webdriver.promise.defer();
    var start = Date.now();
    setTimeout(function () {
        d.fulfill(callback);
    }, timeout);
    return d.promise;
};

var elementIsPresent = function (driver, locator, timeout) {
    return timeoutFunc(function () {
        return driver.isElementPresent(locator);
    }, timeout);
};

var elementIsDisplayed = function (driver, locator, timeout) {
    return timeoutFunc(function () {
        return driver.findElement(locator).isDisplayed();
    }, timeout);
};



var elementIsPresentAndDisplayed = function (driver, locator, timeout) {
    var _driver = driver;
    var _locator = locator;
    timeout = timeout || 5000;
    var deferred = webdriver.promise.defer();
    elementIsPresent(_driver, _locator, timeout)
        .then(elementIsDisplayed(_driver, _locator, timeout)).then(deferred.fulfill);
    return deferred;
};
var driver;

var shouldFindTitle = function () {
    driver.getTitle().then(function (title) {
        return assert("Categories").equalTo(title);
    });
};

var findAllElementsBelowBody = function() {
    driver.findElement(By.tagName('body')).findElements(By.xpath('.//*')).then(function (elements) {
        elements.forEach(function (element, index) {
            element.getTagName().then(function (name) {
                //		                          console.log("index" + index + ":" + name);
            });
        });
    });
};


var findElementBeingVisible = function () {
    elementIsPresentAndDisplayed(driver, By.id('categories'), 10000).then(function () {
        //		              console.log("The element is visible: ");
    });
};

var iphoneBefore = function () {
    driver = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.iphone()).
    usingServer('http://localhost:5555/wd/hub').build();
    driver.get('http://192.168.1.132:9001/backbone-require.html');
    driver.wait(function () {
        return driver.executeScript("return !(typeof jQuery == 'undefined') && !($.mobile === undefined) ;");
    }, 5000);

};

var driverQuit =function () {
    driver.quit();
};



test.describe('JQM Demo Iphone', function () {
    test.before(iphoneBefore);
    test.it('should find title', shouldFindTitle);
    test.it('find all the elements below the body', findAllElementsBelowBody);
    test.it('find element being visible', findElementBeingVisible);
    test.after(driverQuit);
});
