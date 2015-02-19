/**
 * Created by Joshua on 2/18/2015.
 */
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['addchild.editchild.js'],
    multiCapabilities: [{
        'browserName': 'safari'
    }, {
        'browserName': 'chrome'
    }]
};