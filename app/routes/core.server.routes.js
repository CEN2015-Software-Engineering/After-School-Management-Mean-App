'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	app.route('/').get(core.index);

    app.route('/modules/core/controllers/passcode.json').post(function(req, res) {

        var newQuote = {
            passcode : req.body.passcode
        };
        var fs = require('fs');
        var file_content = fs.readFileSync('./public/modules/core/controllers/passcode.json');
        var content = JSON.parse(file_content);
        content.passcode = req.body.passcode;
        fs.writeFileSync('./public/modules/core/controllers/passcode.json', JSON.stringify(content));
    });
};