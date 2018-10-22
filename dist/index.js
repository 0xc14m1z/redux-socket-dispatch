"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var middleware = function middleware(socket) {
  return function (store) {
    return function (next) {
      return function (action) {
        socket.emit(action.type, action);
        return next(action);
      };
    };
  };
};

exports.default = middleware;

module.exports = middleware;