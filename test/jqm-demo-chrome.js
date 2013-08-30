var WDROOT = '../node_modules/selenium-webdriver';
var helper = require('./helper.js');

var assert = helper.assert, 
    test = helper.test;

test.describe('JQM Demo Chrome', function() {
	test.before(helper.chromeBefore);
	test.it('should find title', helper.shouldFindTitle);
	test.it('find all the elements below the body', helper.findAllElementsBelowBody);
	test.it('find element being visible', helper.findElementBeingVisible);
	test.after(helper.driverQuit);
});




