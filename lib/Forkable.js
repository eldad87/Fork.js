var ForkBase = require('./ForkBase');

var Forkable = ForkBase.extend({
    init: function(options) {
        this._connection = process;
        ForkBase.prototype.init.call(this, options);
    }
});

module.exports = Forkable;