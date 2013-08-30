var WDROOT = '../node_modules/selenium-webdriver';

var assert = require(WDROOT + '/testing/assert'),
    test = require(WDROOT + '/testing'),
    By = require(WDROOT).By,
    fs = require('fs'),
    webdriver = require(WDROOT),
    remote = require(WDROOT + '/remote'),
    capabilities = webdriver.Capabilities;

exports.assert = assert;
exports.test = test;

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
    elementIsPresent(_driver, _locator, timeout).then(
        elementIsDisplayed(_driver, _locator, timeout)).then(
        deferred.fulfill);
    return deferred;
};
var driver;

exports.driverQuit = function () {
    driver.quit();
};

exports.shouldFindTitle = function () {
    driver.getTitle().then(function (title) {
        return assert("Categories").equalTo(title);
    });
};

exports.findAllElementsBelowBody = function () {
    driver.findElement(By.tagName('body')).findElements(By.xpath('.//*')).then(
        function (elements) {
            elements.forEach(function (element, index) {
                element.getTagName().then(function (name) {
                    // console.log("index" + index + ":" + name);
                });
            });
        });
};

exports.findElementBeingVisible = function () {
    elementIsPresentAndDisplayed(driver, By.id('categories'), 10000).then(
        function () {
            // console.log("The element is visible: ");
        });
};

exports.iphoneBefore = function () {
    driver = new webdriver.Builder().withCapabilities(
        webdriver.Capabilities.iphone()).usingServer(
        'http://localhost:5555/wd/hub').build();
    driver.get('http://192.168.1.132:9001/backbone-require.html');
    driver
        .wait(
            function () {
                return driver
                    .executeScript("return !(typeof jQuery == 'undefined') && !($.mobile === undefined) ;");
            }, 5000);

};

exports.androidBefore = function () {
    driver = new webdriver.Builder().withCapabilities(capabilities['android'])
        .usingServer('http://localhost:8080/wd/hub').build();
    driver.get('http://192.168.1.132:9001/backbone-require.html');
    driver
        .wait(
            function () {
                return driver
                    .executeScript("return !(typeof jQuery == 'undefined') && !($.mobile === undefined) ;");
            }, 5000);

};

exports.chromeBefore = function () {
    driver = new webdriver.Builder().withCapabilities(
        webdriver.Capabilities.chrome().set('chromeOptions', {
            'androidPackage': 'com.android.chrome'
        })).usingServer('http://localhost:9515/wd/hub').build();
    driver.get('http://192.168.1.132:9001/backbone-require.html');
    driver
        .wait(
            function () {
                return driver
                    .executeScript("return !(typeof jQuery == 'undefined') && !($.mobile === undefined) ;");
            }, 5000);

};

