var WDROOT = '../node_modules/selenium-webdriver';

var assert = require(WDROOT + '/testing/assert'),
    test = require(WDROOT + '/testing'),
    fs = require('fs');

var webdriver = require(WDROOT),
    By = require(WDROOT).By,
    testHarness = require(WDROOT + '/lib/test'),
    remote = require(WDROOT + '/remote');

testHarness.suite(function (env) {

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



    var driver;
    test.beforeEach(function () {
        driver = env.driver;
        driver.get('http://192.168.1.132:9001/backbone-require.html');
        driver.wait(function () {
            return driver.executeScript("return !($.mobile === undefined) ;");
        }, 5000);

    });



    test.describe('JQM Demo', function () {

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
//                            console.log("index" + index + ":" + name);
                        });
                    });
                });
            });
        test.it('find element being visible', function () {
            waitFor(driver, By.id('categories')).then(function () {
//                console.log("The element is visible: ");
            });
        });

    });




});