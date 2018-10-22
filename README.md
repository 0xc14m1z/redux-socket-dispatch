# redux-socket-dispatch

The goal of this package is to:

1. send dispatched actions through a websocket so that they can be handled on a server;
2. locally dispatch remotely emitted actions.

## how to install

```
$ npm install --save redux-socket-dispatch
```

## how to use it

```js
import socketDispatchEnhancer from "redux-socket-dispatch"
// or const socketDispatchEnhancer = require("redux-socket-dispatch")

const store = createStore(
  reducers,
  compose(
    applyMiddleware(...middlewares),
    socketDispatchEnhancer(socket, 'REMOTELY_EMITTED_EVENT')
  )
)

```
