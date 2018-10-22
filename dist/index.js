'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

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

var listenForRemoteActions = function listenForRemoteActions(socket, remoteActionType, store) {
  return socket.on(remoteActionType, store.dispatch);
};

var enhancer = function enhancer(socket, remoteActionType) {
  return function (createStore) {
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var store = createStore.apply(undefined, args.concat([(0, _redux.applyMiddleware)(middleware(socket))]));

      listenForRemoteActions(socket, remoteActionType, store);

      return store;
    };
  };
};

exports.default = enhancer;

module.exports = enhancer;