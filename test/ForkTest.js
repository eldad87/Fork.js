var should = require('should');
var Forker = require('../lib/Forker');

describe(
    'Fork',
    function() {
        it('Check Extended child method+callback execution', function(done) {
            var handler = {
                inc: function(num, callback) {
                    num++;
                    callback(null, num);
                }
            };

            var childExtend = new Forker({file: './test/assets/childExtendForkSupport.js', handler: handler});
            childExtend.callOtherEnd('incOnChild', [10], function(err, res) {
                should(res).eql(11);
                done();
            });
        });

        it('Check Extended child method+callback execution', function(done) {
            var handler = {
                inc: function(num, callback) {
                    num++;
                    callback(null, num);
                }
            };

            var childUse = new Forker({file: './test/assets/childUseForkSupport.js', handler: handler});
            childUse.callOtherEnd('incOnChild', [10], function(err, res) {
                should(res).eql(11);
                done();
            });
        });


        it('Check child run method on parent', function(done) {
            var handler = {
                done: function(data) {
                    done();
                }
            };

            var child = new Forker({file: './test/assets/childExeMethodOnParent.js', handler: handler});
        });
    }
);