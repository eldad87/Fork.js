var ForkBase = require('./ForkBase');
var childProcess = require('child_process');
var _ = require('underscore');

var Forker = ForkBase.extend({
    init: function(options) {
        options = _.clone(options);
        var handler = options['handler'] || false;
        options['handler'] = false;

        this._connection = childProcess.fork(options['file'], [JSON.stringify(options)]);

        options['handler'] = handler;
        ForkBase.prototype.init.call(this, options);
    }
});

module.exports = Forker;