Fork.js
=======

An easy way to fork and excute commands between parent-child processes.

### Create a forkable child in one of 2 ways (save as child.js):
#### Extend:

    var Forkable = require('Forkable');
    
    var child = Forkable.extend({
        incOnChild: function(num, callback) {
            num++;
            callback(null, num);
        }
    });
    
    var child = new child();

#### Provide an handler:
    var Forkable = require('Forkable');
    
    var handler = {
        incOnChild: function(num, callback) {
            num++;
            callback(null, num);
        }
    };
    
    var child = new Forkable({handler: handler});


### Run the forkable child from within a parent (parent.js):

    var handler = {
        decOnParent: function(num, callback) {
            num--;
            callback(null, num);
        }
    };

    //Fork the child + call incOnChild method
    var childExtend = new Forker({file: './child.js', handler: handler});
    childExtend.callOtherEnd('incOnChild', [10], function(err, res) {
        console.log('Child increased value is: ', res); //Should be 11.
    });

## Run method from child on parent.
In the above example. the child can run the 'decOnParent' method:

    child.callOtherEnd('decOnParent', [10], function(err, res) {
        console.log('Parent decreased value is: ', res); //Should be 9.
    });

