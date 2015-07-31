"use strict";

var Pipe = function (data) {
  this.data = data || {};
};

Pipe.prototype.execute = function (middlewarePipe, next) {
  var data = this.data;

  if (typeof middlewarePipe === 'function') {
    middlewarePipe(data, next);
  } else if (Array.isArray(middlewarePipe)) {
    var next = function () {
      var middleware = middlewarePipe.shift();

      if (typeof middleware === 'function') {
        middleware(data, next);
      } else if (Array.isArray(middleware)) {
        var lock = middleware.length,
            unlock = function () {
              if (!--lock) {
                next();
              }
            };

        middleware.forEach(function (middleware) {
          middleware(data, unlock);
        });
      }
    };

    next();
  } else if (typeof middlewarePipe === 'object') {
    if (middlewarePipe.sync) {

    }
  }
};

module.exports = Pipe;