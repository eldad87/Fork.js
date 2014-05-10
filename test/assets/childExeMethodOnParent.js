var Forkable = require('../../lib/Forkable');

var child = Forkable.extend({
    init: function(options) {
        Forkable.prototype.init.call(this, options);

        this.callOtherEnd('done');
    }
});

var childWithConnectionToParent = new child();