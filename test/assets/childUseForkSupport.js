var Forkable = require('../../lib/Forkable');

var handler = {
    incOnChild: function(num, callback) {
        num++;
        callback(null, num);
    }
};

var connectionToParent = new Forkable({handler: handler});
