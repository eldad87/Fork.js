var Class = require('./Class');
var Exception = require('./Exception');
var _ = require('underscore');
var UUID = require('node-uuid');

var ForkBase = Class.extend({
    _handler: false,
    _requests: {},
    _connection: false,

    init: function(options) {
        if(!_.isObject(options)) {
            options = {};
        };

        this._handler = (options['handler']) || this;

        var self = this;

        this._connection.on('message', function(data) {
            if(_.isObject(data)) {
                if(data['command'] == 'CallBack') {
                    if(self._requests[data['uuid']]) {
                        self._requests[data['uuid']].apply(self, data['args']);
                        self._requests[data['uuid']] = null;
                        delete self._requests[data['uuid']];
                    }
                }

                if(data['command'] == 'Run') {
                    self._runCall(data['method'], data['args'], data['callback']);
                }
            }
        });
    },

    _runCall: function(method, args, callbackUUID) {
        var self = this;
        //Add a callback method
        if(callbackUUID) {
            args.push(function() {
                var arrArgum = [];
                for (var i in arguments) {
                    arrArgum.push(arguments[i]);
                }
                //Send back with the given UUID
                self._connection.send(
                    {
                        command: 'CallBack',
                        uuid: callbackUUID,
                        args: arrArgum
                    }
                );
            });
        }

        if(typeof this._handler[method] != 'function') {
            throw new Exception('Method not exists');
        }

        this._handler[method].apply(this._handler, args);
    },

    callOtherEnd: function(method, args, callback) {
        if(typeof args != 'undefined' && !_.isArray(args)) {
            throw new Exception('Args must be an array');
        }

        var _uuid = false;
        if(typeof callback == 'function') {
            _uuid = UUID.v4();
            this._requests[_uuid] = callback;
        }
        this._connection.send(
            {
                command: 'Run',
                method: method,
                args: args,
                callback: _uuid
            }
        );
    }
});


module.exports = ForkBase;