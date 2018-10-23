"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// take a socket and return a middleware that emits an event
// through the socket of type `action.type` and the entire action as payload
var middleware = function middleware(socket) {
  return function (store) {
    return function (next) {
      return function (_ref) {
        var __remote__ = _ref.__remote__,
            action = _objectWithoutProperties(_ref, ["__remote__"]);

        // avoid emitting actions marked as dispatched from the server
        if (!__remote__) socket.emit(action.type, action);
        return next(action);
      };
    };
  };
}; // add an handler to the socket for the given remote action type and dispatch
// the payload action marking it as remote (in order to avoid re-dispatching)


var listenForRemoteActions = function listenForRemoteActions(socket, remoteActionType, store) {
  socket.on(remoteActionType, function (action) {
    store.dispatch(_objectSpread({}, action, {
      __remote__: true
    }));
  });
}; // take a socket and a remote action type and return a redux store enhancer


var enhancer = function enhancer(socket, remoteActionType) {
  return function (createStore) {
    return function () {
      var socketMiddleware = middleware(socket);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var store = createStore.apply(void 0, args.concat([(0, _redux.applyMiddleware)(socketMiddleware)]));
      listenForRemoteActions(socket, remoteActionType, store);
      return store;
    };
  };
};

var _default = enhancer;
exports.default = _default;
module.exports = enhancer;