var Forkable = require('../../lib/Forkable');

var child = Forkable.extend({
    incOnChild: function(num, callback) {
        num++;
        callback(null, num);
    }
});

var childWithConnectionToParent = new child();